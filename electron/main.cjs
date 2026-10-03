const { app, BrowserWindow, Menu, net, protocol, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'gifdrop', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 760,
    minHeight: 620,
    backgroundColor: '#080b12',
    title: 'GIF DROP',
    webPreferences: {
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

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: app.name, submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit', label: 'GIF DROPを終了' }] },
    { label: '編集', submenu: [{ role: 'undo', label: '取り消す' }, { role: 'redo', label: 'やり直す' }, { type: 'separator' }, { role: 'cut', label: 'カット' }, { role: 'copy', label: 'コピー' }, { role: 'paste', label: 'ペースト' }, { role: 'selectAll', label: 'すべて選択' }] },
    { label: '表示', submenu: [{ role: 'reload', label: '再読み込み' }, { role: 'togglefullscreen', label: 'フルスクリーン' }] },
    { label: 'ウインドウ', submenu: [{ role: 'minimize', label: 'しまう' }, { role: 'zoom', label: '拡大／縮小' }, { role: 'front', label: 'すべてを手前に移動' }] }
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
