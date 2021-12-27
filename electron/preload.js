const { contextBridge, ipcRenderer } = require('electron')
// --------- Expose some API to Renderer process. ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    ...ipcRenderer,
    on(...args) {
        return ipcRenderer.on(...args)
    }
})