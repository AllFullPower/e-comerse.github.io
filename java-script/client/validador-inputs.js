import { itemServices } from "../services/itemServices.js";


let inputs = document.querySelectorAll('[data-input]');

const mensajeError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'Su nombre debe de tener de 2-16 caracteres'
    },
    mensaje: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    password:{
        valueMissing: 'Este campo no puede estar vaicio',
        patternMismatch: 'Se necestia un numero, letra mayuscula y caracter especial, debe de ser de [8-16] caracteres'
    },
    user:{
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'Su nombre debe de tener de 2-16 caracteres'
    }
}

const tiposDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

inputs.forEach(input => {
    itemServices.bordesInput(input, 'bordes')
    input.addEventListener('blur', ()=>{
        validar(input)
    })
})


const mostarMensajeError = (input, tipoDeInput) => {
    let mensaje = ''
    tiposDeError.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajeError[tipoDeInput][error];
        }
    })
    return mensaje
}


const validar = (input) =>{
    const tipoDeInput = input.dataset.input;
    if(input.validity.valid){
        input.parentElement.classList.remove('invalido');
        input.parentElement.querySelector('.mensaje-error').innerHTML = '';


    }else{
        input.parentElement.classList.add('invalido')
        input.parentElement.querySelector('.mensaje-error').innerHTML = mostarMensajeError(input, tipoDeInput);
    }

}

