import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { enableLiveReload } from 'electron-compile';
import * as fs from 'fs';
import * as path from 'path';

let mainWindow: BrowserWindow | null;
let secondWindow: BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
    enableLiveReload();
}

const createWindow = async () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.maximize();
    mainWindow.removeMenu();

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../dist/index.html`);
    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (secondWindow != null) {
            secondWindow.close();
        }
    });

    mainWindow.on('close', function(e) {
        const choice = dialog.showMessageBoxSync(this, {
            type: 'question',
            buttons: ['Sim', 'Não'],
            title: 'Confirmação',
            message: 'Deseja sair da aplicação?',
        });
        if (choice == 1) {
            e.preventDefault();
        }
    });

    secondWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    secondWindow.on('closed', () => {
        secondWindow = null;
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

ipcMain.on('print', (event, message) => {
    const options = {
        silent: false,
        printBackground: true,
        color: false,
        margin: {
            marginType: 'printableArea'
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1
    };

    const tmpfolder = `${app.getPath('userData')}/printfolder`;
    const distFolder = `${__dirname}/../dist`;
    if (!fs.existsSync(tmpfolder)) {
        fs.mkdirSync(tmpfolder);
    }
    let files = fs.readdirSync(tmpfolder);
    for (const file of files) {
        try{
            fs.unlinkSync(path.join(tmpfolder, file));
        }
        catch{}
    }
    files = fs.readdirSync(distFolder);
    const styleFile = files.find(x => x.startsWith('styles'));
    console.log(styleFile);
    fs.copyFileSync(path.join(distFolder, styleFile), path.join(tmpfolder, styleFile));

    const filename = `print${newGuid()}.html`;

    fs.writeFileSync(`${tmpfolder}/${filename}`, message, 'utf-8');
    secondWindow.loadURL(`${tmpfolder}/${filename}`);

    secondWindow.webContents.on('did-finish-load', () => {
        secondWindow.webContents.print(options, (success, failureReason) => {
            if (success) {
                event.sender.send('print', true);
                try{
                    fs.unlinkSync(path.join(tmpfolder, filename));
                }
                catch{}
                }
        });
    });
});

const newGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
