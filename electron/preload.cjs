const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gifDropDesktop', {
  saveGif: (bytes, defaultName) => ipcRenderer.invoke('gifdrop:save-gif', { bytes, defaultName }),
  showInFinder: filePath => ipcRenderer.invoke('gifdrop:show-in-finder', filePath)
});
