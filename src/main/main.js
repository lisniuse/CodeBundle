const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { enable } = require('@electron/remote/main');
const parseGitignore = require('parse-gitignore');
let store;
(async () => {
    const { default: Store } = await import('electron-store');
    store = new Store();
})();

// 只在开发环境中加载 electron-reload
if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../../node_modules', 'electron')
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemote: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false  // 开发模式下禁用 webSecurity
        }
    });

    // 只在生产环境启用 CSP
    if (process.env.NODE_ENV !== 'development') {
        win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                    'Content-Security-Policy': [
                        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:;" +
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
                        "font-src 'self' data: https://fonts.gstatic.com;" +
                        "img-src 'self' data: https:;"
                    ]
                }
            });
        });
    }

    win.removeMenu();
    enable(win.webContents);
    
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:3000/');
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../../build/index.html'));
    }
}

app.whenReady().then(createWindow);

// 添加新的 IPC 处理函数
// 修改语言相关的 IPC 处理器
ipcMain.handle('set-language', async (event, lang) => {
    if (!store) {
        throw new Error('Store not initialized');
    }
    store.set('language', lang);
    return true;
});

ipcMain.handle('open-folder', async (event, filePath) => {
    try {
        await shell.showItemInFolder(filePath);
        return true;
    } catch (error) {
        console.error('Error opening folder:', error);
        return false;
    }
});

// 修改获取扩展名的错误处理
ipcMain.handle('get-extensions', async (event, folderPath) => {
    try {
        await fs.access(folderPath);
        
        const extensions = new Set();
        let gitignorePatterns = [];
        
        // 检查 .gitignore 是否存在
        const gitignorePath = path.join(folderPath, '.gitignore');
        if (await fs.access(gitignorePath).then(() => true).catch(() => false)) {
            const gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
            gitignorePatterns = gitignoreContent
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'));
        }
        
        async function scanDir(dir) {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(folderPath, fullPath);
                const normalizedPath = relativePath.replace(/\\/g, '/');

                // 检查是否被 .gitignore 忽略
                const isIgnored = gitignorePatterns.some(pattern => {
                    // 处理目录情况
                    if (!pattern.includes('*') && !pattern.includes('.')) {
                        if (entry.isDirectory()) {
                            return normalizedPath === pattern || 
                                   normalizedPath.startsWith(pattern + '/');
                        }
                        return false;
                    }
                    
                    // 处理文件情况
                    const regexPattern = pattern
                        .replace(/\./g, '\\.')
                        .replace(/\*\*/g, '[^/]*(?:/[^/]*)*')  // **/ 匹配任意层级目录
                        .replace(/\*/g, '[^/]*')  // * 匹配单层目录/文件名
                        .replace(/\?/g, '[^/]');  // ? 匹配单个字符
                    
                    const regex = new RegExp(`^${regexPattern}$`);
                    return regex.test(normalizedPath);
                });

                if (isIgnored) {
                    continue;
                }
                
                if (entry.isDirectory()) {
                    await scanDir(fullPath);
                } else {
                    const ext = path.extname(entry.name);
                    if (ext) extensions.add(ext);
                }
            }
        }
        
        await scanDir(folderPath);
        return Array.from(extensions);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Directory does not exist');
        }
        throw error;
    }
});

// 添加选择保存路径的处理器
ipcMain.handle('select-save-path', async (event, { defaultPath }) => {
    const result = await dialog.showSaveDialog({
        defaultPath: defaultPath || 'code_bundle.txt',
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['createDirectory']
    });
    
    return {
        canceled: result.canceled,
        filePath: result.filePath
    };
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
  });
  return {
      canceled: result.canceled,
      filePath: result.filePaths[0]
  };
});

// 导出文件
// 添加新的 IPC 处理器用于读取配置
ipcMain.handle('read-config', async (event, folderPath) => {
    try {
        const configPath = path.join(folderPath, '.codebundle');
        const config = await fs.readFile(configPath, 'utf-8');
        return JSON.parse(config);
    } catch (error) {
        return null;
    }
});

// 修改导出文件处理器
ipcMain.handle('export-files', async (event, {
    folderPath,
    selectedExtensions,
    ignoreList,
    useGitignore,
    outputPath
}) => {
    const output = [];
    
    // 保存配置
    try {
        const config = {
            selectedExtensions,
            ignoreList,
            useGitignore,
            outputPath
        };
        await fs.writeFile(
            path.join(folderPath, '.codebundle'),
            JSON.stringify(config, null, 2)
        );
    } catch (error) {
        console.error('Error saving configuration:', error);
    }
    
    let gitignorePatterns = [];
    if (useGitignore) {
        try {
            const gitignorePath = path.join(folderPath, '.gitignore');
            const gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
            gitignorePatterns = gitignoreContent
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'));
        } catch (err) {
            console.log('No .gitignore file found');
        }
    }
    
    async function processDir(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.relative(folderPath, fullPath);

            if (ignoreList.some(pattern => relativePath.includes(pattern))) {
                continue;
            }

            if (useGitignore && gitignorePatterns.some(pattern => {
                // 简单的通配符匹配
                const regexPattern = pattern
                    .replace(/\./g, '\\.')
                    .replace(/\*/g, '.*')
                    .replace(/\?/g, '.');
                return new RegExp(regexPattern).test(relativePath);
            })) {
                continue;
            }

            if (entry.isDirectory()) {
                await processDir(fullPath);
            } else {
                const ext = path.extname(entry.name);
                if (selectedExtensions.includes(ext)) {
                    const content = await fs.readFile(fullPath, 'utf-8');
                    output.push(`\n${'='.repeat(80)}\nFile: ${relativePath}\n${'='.repeat(80)}\n${content}`);
                }
            }
        }
    }

    await processDir(folderPath);
    await fs.writeFile(outputPath, output.join('\n'));
    return outputPath;
});

// 添加获取系统语言的处理器
ipcMain.handle('get-system-language', () => {
    const locale = app.getLocale();
    return locale.startsWith('zh') ? 'zh' : 'en';
});

ipcMain.handle('get-language', async () => {
    if (!store) {
        const locale = app.getLocale().toLowerCase();
        return locale.startsWith('zh') ? 'zh' : 'en';
    }
    const savedLang = store.get('language');
    if (!savedLang) {
        const locale = app.getLocale().toLowerCase();
        return locale.startsWith('zh') ? 'zh' : 'en';
    }
    return savedLang;
});
