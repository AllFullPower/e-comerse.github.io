
    
const iniciarSesion = () =>{
    const form = document.querySelector('[data-inicioSession]')
    const almacenamientoSession = JSON.parse(localStorage.getItem('session')) || [];
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault;
        let poolBridgue = false;
        let yaRegistrado = false
        let user = document.getElementById('usuario').value;
        let password = document.getElementById('contrasena').value
        console.log(user, password);


    
        if(user == '{%app.json+}:2.4' && password == "58A+l:{%*(())}"){
            poolBridgue = true;
        }else{
            poolBridgue = false;
        }
    
        almacenamientoSession.forEach(users => {
            if(users.user === user || users.password === password){
                yaRegistrado = true
            }else{
                yaRegistrado = false
            }
        });
        const  datosInincioSession ={
            user,
            password,
            poolBridgue
        }

        if(!yaRegistrado){
            almacenamientoSession.push(datosInincioSession)
        }else{
            return
        }
        localStorage.setItem('session' , JSON.stringify(almacenamientoSession));
    })
       
    if(almacenamientoSession.length == 1){
        return window.location = './iniciado-exitosamente.html'
    }if(almacenamientoSession.length == 0){
        return
    }
}   


iniciarSesion();



