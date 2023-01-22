const { BrowserWindow, ipcMain } = require('electron')
const db = require('./database/database')

const path = require('path'); 

// --Ventanas--

//(1)Ventana principal login
let winLogin;
const createLogin = ()=>{
        winLogin = new BrowserWindow({
        width: 2000,
        height:1000,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation:false,
            preload:path.join(__dirname, 'views/js/Controllers/InputsLogin.js')
            
        }
    })
    winLogin.loadFile('src/views/login.html')
}

//(2)Ventana Menu-dashboard
let winIndex
const createIndex = ()=>{
       winIndex = new BrowserWindow({
        width: 2000,
        height: 1000,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    winIndex.loadFile('src/views/index.html')
}

//(3)Ventana multiStep 
let winHistoryMedica;
const createHistoryMedica = ()=>{
  winHistoryMedica = new BrowserWindow({
    width:2000,
    height:1000,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  winHistoryMedica.loadFile('src/views/historyMedica.html')
}

// ---Middlewares--

// (1)Recibir el objeto de los input login para el query
ipcMain.handle('login', (event, obj) => {
    console.log(obj)
    validatelogin(obj)
  });

ipcMain.handle('clicked', (event,obj)=>{
    console.log(obj)
    VentanaHostoryMedica()
    winHistoryMedica.show()
})  


//-- Funciones --

//(1)Evento de init ventana de historia medica
function VentanaHostoryMedica(){
  createHistoryMedica()
}

// --Consultas mysql--   

// (1)Consulta de inicio de session
  function validatelogin(obj) {
   const { username, password } = obj 
   const sql = "SELECT * FROM medico WHERE username=? AND password=?"
    db.query(sql,[username,password], (error, results, fields) => {
      if(error){ console.log(error);}
  
      if(results.length > 0){
         createIndex()
         winIndex.show()
         winLogin.close()
       }else{
         new Notification({
           title:"login",
           body: 'email o password equivocado'
         }).show()
       }
      
    });
  }




// --Exportaciones--
module.exports = {
    createLogin,createHistoryMedica
}
