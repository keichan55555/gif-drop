const { app, BrowserWindow, Menu, dialog, ipcMain, net, protocol, shell } = require('electron');
const fs = require('fs/promises');
const path = require('path');
const { pathToFileURL } = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'gifdrop', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 820,
    minHeight: 620,
    backgroundColor: '#090c11',
    title: 'GIF DROP',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 18, y: 18 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadURL('gifdrop://app/index.html');
}

app.whenReady().then(() => {
  const root = path.resolve(__dirname, '..', 'dist');
  protocol.handle('gifdrop', request => {
    const url = new URL(request.url);
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    const target = path.resolve(root, relativePath);
    if (target !== root && !target.startsWith(root + path.sep)) {
      return new Response('Not found', { status: 404 });
    }
    return net.fetch(pathToFileURL(target).toString());
  });

  ipcMain.handle('gifdrop:save-gif', async (_event, { bytes, defaultName }) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: defaultName,
      filters: [{ name: 'GIF image', extensions: ['gif'] }]
    });
    if (canceled || !filePath) return null;
    await fs.writeFile(filePath, Buffer.from(bytes));
    return filePath;
  });
  ipcMain.handle('gifdrop:show-in-finder', (_event, filePath) => {
    if (typeof filePath === 'string' && filePath) shell.showItemInFolder(filePath);
  });

  const ja = app.getLocale().toLowerCase().startsWith('ja');
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: app.name, submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit', label: ja ? 'GIF DROPを終了' : 'Quit GIF DROP' }] },
    { label: ja ? '編集' : 'Edit', submenu: [{ role: 'undo', label: ja ? '取り消す' : 'Undo' }, { role: 'redo', label: ja ? 'やり直す' : 'Redo' }, { type: 'separator' }, { role: 'cut', label: ja ? 'カット' : 'Cut' }, { role: 'copy', label: ja ? 'コピー' : 'Copy' }, { role: 'paste', label: ja ? 'ペースト' : 'Paste' }, { role: 'selectAll', label: ja ? 'すべて選択' : 'Select All' }] },
    { label: ja ? '表示' : 'View', submenu: [{ role: 'reload', label: ja ? '再読み込み' : 'Reload' }, { role: 'togglefullscreen', label: ja ? 'フルスクリーン' : 'Toggle Full Screen' }] },
    { label: ja ? 'ウインドウ' : 'Window', submenu: [{ role: 'minimize', label: ja ? 'しまう' : 'Minimize' }, { role: 'zoom', label: ja ? '拡大／縮小' : 'Zoom' }, { role: 'front', label: ja ? 'すべてを手前に移動' : 'Bring All to Front' }] }
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
