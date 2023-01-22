const {ipcRenderer, webContents} = require('electron')

username = document.querySelector("#username");
password = document.querySelector("#password");
btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener('click',(e)=>{
  e.preventDefault()
  
  const obj = {
    username: username.value,
    password: password.value
  }
  console.log(obj)
   ipcRenderer.invoke('login', obj)
}
)
