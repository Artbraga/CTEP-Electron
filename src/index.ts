import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { enableLiveReload } from "electron-compile";
import * as fs from "fs";

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

    mainWindow.on("closed", () => {
        mainWindow = null;
        if (secondWindow != null) {
            secondWindow.close();
        }
    });

    mainWindow.on("close", function (e) {
        const choice = dialog.showMessageBoxSync(this, {
            type: "question",
            buttons: ["Sim", "Não"],
            title: "Confirmação",
            message: "Deseja sair da aplicação?",
        });
        if (choice == 1) {
            e.preventDefault();
        }
    });

    secondWindow = new BrowserWindow({
        show: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    secondWindow.on("closed", () => {
        secondWindow = null;
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("print", (event, message) => {
    var options = {
        silent: false,
        printBackground: true,
        color: false,
        margin: {
            marginType: 'printableArea'
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: 'Header of the Page',
        footer: 'Footer of the Page'
    }


    // fs.writeFileSync(`${__dirname}/../aux/print.html`, message, 'utf-8');
    // secondWindow.loadURL(`file://${__dirname}/../aux/print.html`);
    // secondWindow.loadURL(`data:text/html;charset=utf-8,${message}`);
    secondWindow.loadURL(`data:text/html;charset=utf-8,<html></html>`);

    secondWindow.webContents.on('did-finish-load', () => {
        secondWindow.webContents.executeJavaScript(`document.getElementsByTagName("html").innerHtml=${message}`)
        secondWindow.webContents.reload();
        secondWindow.webContents.print(options, (success, failureReason) => {
            if (success) {
                event.sender.send("print", true);
            }
            // fs.unlinkSync(`${__dirname}/../aux/print.html`);
        });
    });
});
