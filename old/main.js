const { app, BrowserWindow } = require('electron')
var path = require('path')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        backgroundColor: '#ffffff',
        icon: path.join(__dirname, 'src/assets/images/logo.png'),
    })

    setTimeout(() => {
        win.loadURL(`file:///${__dirname}/dist/CTEP-electron/index.html`);
    }, 2000);
    win.maximize();
    win.setMenu(null);

    //// uncomment below to open the DevTools.
    win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    });

    win.on('close', function(e){
        var choice = require('electron').dialog.showMessageBox(this,
            {
              type: 'question',
              buttons: ['Yes', 'No'],
              title: 'Confirmar ação',
              message: 'Você deseja sair do programa?'
           });
        if(choice == 1){
            e.preventDefault();
        }
    });
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
process.env['ELECTRON_ENABLE_STACK_DUMPING']=true;

process.on('uncaughtException', function (err) {
    console.log(err);
})