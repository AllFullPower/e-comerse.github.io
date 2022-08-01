let inicioSession = JSON.parse(localStorage.getItem('session')) || [];
let nav = document.querySelector('header .header-nav-buttons');
let adminButton = document.querySelector('header .nav-admin');



const crearBotonUser = () =>{
    let usuarioButton = document.createElement('a');
    usuarioButton.innerHTML = `${inicioSession[0].user}👤`;
    usuarioButton.classList.add('nav-user');
    nav.appendChild(usuarioButton);
}

const longed  = () =>{
    if(inicioSession.length == 1){
        let inicioSessionButton = document.querySelector('header .nav-login');
        inicioSessionButton.classList.add('esconder');
        crearBotonUser();
        if(inicioSession[0].poolBridgue == true){
            adminButton.classList.remove('esconder');
        }else{
            adminButton.classList.add('esconder');
        }  
    }if(inicioSession.length == 0){
        console.log('ad')
    }




}

const botonesEdicion = (botonesContainer) => 
{
    if(inicioSession.length == 1){
        if(inicioSession[0].poolBridgue){
            botonesContainer.classList.remove('esconder');
        }else{
            botonesContainer.classList.add('esconder');
        }
    }if(inicioSession.length == 0){
        return
    }


}


export const adminServices ={
    longed,
    botonesEdicion
}