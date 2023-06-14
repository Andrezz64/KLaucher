const { app, BrowserWindow, shell, dialog, ipcMain } = require('electron');
const squirrelStartup = require('electron-squirrel-startup');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.

if (squirrelStartup) {
  // Se o aplicativo estiver sendo executado em modo squirrel startup,
  // não execute nada mais no código principal
  app.quit();
}



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    minWidth:800,
    minHeight:600,
    height: 600,
    icon:"src/Logo.ico",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      spellcheck: true,
      nodeIntegration: true, 
    },
  });

  function closeAllWindows() {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      if (window !== mainWindow) {
        window.close();
      }
    });
  }
    
    mainWindow.webContents.session.on('will-download', (event, item) => {
    const downloadFolder = app.getPath('downloads'); // Pasta de downloads padrão
    const name = item.getFilename()
    console.log(name)
    const uniqueFilename = `${uuidv4()}_${name}`; // Gerar um nome único para o arquivo
    
    const filePath = path.join(downloadFolder, uniqueFilename); // Caminho completo com o nome único do arquivo
  
    item.setSavePath(filePath); // Definir o caminho de salvamento do arquivo
  
    // Registrar um manipulador de eventos para o evento 'done'
    async function open(){
    if(name == "Alterdata Remoto.exe"){
      await shell.openPath(filePath).catch((e)=>{console.log(e)})
      setTimeout(()=>{
        shell.trashItem(filePath).catch((e)=>{console.log(e)})
      },10000)
    }
    else{
      dialog.showMessageBox({
        type: 'info',
        title: 'Download Realizado',
        message: `Arquivo ${name} salvo na pasta Downloads`,
        defaultId: 0,
      });
    }

    }
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log("Download realizado com sucesso")
        closeAllWindows()
        open()
        
      } else {
        console.log('Download falhou ou foi cancelado');
      }
    });
  })
  // and load the index.html of the app.
  mainWindow.loadURL("https://atendimento.karoo.com.br/c/0/fila");
  mainWindow.setMenu(null);
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
