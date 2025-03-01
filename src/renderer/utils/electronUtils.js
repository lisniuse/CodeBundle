// 选择目录
export const selectDirectory = async () => {
    const result = await window.electron.invoke('select-directory');
    return result;
};

// 选择保存路径
export const selectSavePath = async (defaultPath) => {
    const result = await window.electron.invoke('select-save-path', {
        defaultPath: defaultPath || 'code_bundle.txt'
    });
    return result;
};

// 读取配置
export const readConfig = async (path) => {
    const config = await window.electron.invoke('read-config', path);
    return config;
};

// 获取扩展名列表
export const getExtensions = async (path) => {
    const extensions = await window.electron.invoke('get-extensions', path);
    return extensions;
};

// 导出文件
export const exportFiles = async (options) => {
    const result = await window.electron.invoke('export-files', options);
    return result;
};