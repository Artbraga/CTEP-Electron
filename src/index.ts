import { app, BrowserWindow, dialog, globalShortcut, remote, ipcRenderer } from 'electron';
import { enableLiveReload } from 'electron-compile';

let mainWindow: BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) { enableLiveReload(); }

const createWindow = async () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.maximize();
    mainWindow.menuBarVisible = false;

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../dist/index.html`);
    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('close', function(e) {
        const choice = dialog.showMessageBoxSync(this,
            {
                type: 'question',
                buttons: ['Sim', 'Não'],
                title: 'Confirmação',
                message: 'Deseja sair da aplicação?'
            });
        if (choice == 1) {
            e.preventDefault();
        }
    });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

globalShortcut.register('CommandOrControl+F', () => {
    console.log("ctr F");
});

// const findInPage = new FindInPage(remote.getCurrentWebContents());

// ipcRenderer.on('on-find', (e, args) => {
//   findInPage.openFindWindow();
// });
