const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // 暴露所有需要的 IPC 方法
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    // 添加 openFolder 方法
    openFolder: (path) => ipcRenderer.invoke('open-folder', path),
    // 添加获取系统语言的方法
    getSystemLanguage: () => ipcRenderer.invoke('get-system-language'),
    // 添加语言设置相关方法
    setLanguage: (lang) => ipcRenderer.invoke('set-language', lang),
    getLanguage: () => ipcRenderer.invoke('get-language')
});