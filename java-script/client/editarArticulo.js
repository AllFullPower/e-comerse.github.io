import { clientServices } from "../services/client-services.js";
import { itemServices } from "../services/itemServices.js";

const sentForm = document.querySelector("[data-editarArticulo]");

const obtenerInfo = () => {
    const url =  new URL(window.location);
    const id = url.searchParams.get("id");
    if(id == null){
        alert("error al encontrar el id")
    }

    const urlImg = document.querySelector("[data-url]");
    let tipo = document.querySelector("[data-tipo]");
    let nombre = document.querySelector("[data-nombre]");
    let precio = document.querySelector("[data-precio]");
    let descripcion = document.querySelector("[data-descripcion]")
    let oferta = document.querySelector('.input-check');
    let descuentoBaul = document.querySelector('.descuento-datos');
    let contadorDinero = document.querySelector('.cantidad-dinero');
    let descuento = document.querySelector('.input-decuento');


    clientServices.editarArticulo(id).then( articulo => {
        if(articulo.oferta == true){
            descuentoBaul.classList.remove('esconder');
        }else{
            descuentoBaul.classList.add('esconder');
        }
        
        

        urlImg.value = articulo.url
        tipo.value = articulo.tipo;
        nombre.value = articulo.nombre;
        precio.value = articulo.precio;
        descripcion.value = articulo.descripcion;
        oferta.checked = articulo.oferta  
        descuento.value = articulo.descuento
        
        let descuentoArticulo = (articulo.precio - (articulo.precio * `0.${articulo.descuento}`)).toFixed(2);
        contadorDinero.innerHTML = descuentoArticulo

    });
}

obtenerInfo();

sentForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const url =  new URL(window.location);
    const id = url.searchParams.get("id");

    let urlImg = document.querySelector("[data-url]").value;
    let tipo = document.querySelector("[data-tipo]").value;
    let nombre = document.querySelector("[data-nombre]").value;
    let precio = document.querySelector("[data-precio]").value;
    let descripcion = document.querySelector("[data-descripcion]").value;
    let oferta = document.querySelector('.input-check').checked;
    let descuento = document.querySelector('.input-decuento').value;

    clientServices.altualizarArticulo(urlImg, tipo, nombre, precio, descripcion, id, oferta, descuento).then(window.location = "./editado-exitosamente.html");
})

const sitemaDescuento = ()=>{
    let oferta = document.querySelector('.input-check');
    let descuentoBaul = document.querySelector('.descuento-datos');
    oferta.addEventListener('click',()=>{
        if(oferta.checked == true){
            descuentoBaul.classList.remove('esconder');
        }else{
            descuentoBaul.classList.add('esconder');
        }

    })
    let cantidadDinero = document.getElementById("Precio");
    let inputDescuento = document.querySelector('.input-decuento');
    inputDescuento.addEventListener('input',function(){
        let contadorDinero = document.querySelector('.cantidad-dinero')
        let dinero = cantidadDinero.value
        let descuento = (dinero * `0.${this.value}`)
        let total = ((dinero - descuento).toFixed(2))
        contadorDinero.innerHTML = `${total}`
    })


}

sitemaDescuento()

