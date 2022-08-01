import { clientServices } from "../services/client-services.js";
import { adminServices } from "../services/admin-services.js"
import { itemServices } from "../services/itemServices.js";

const obtenerInfoArticulo = () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    clientServices.editarArticulo(id).then(respuesta => {
        armarInfoArticulo(respuesta.url, respuesta.nombre, respuesta.precio, respuesta.descripcion, respuesta.descuento, respuesta.oferta);
    })

}

obtenerInfoArticulo()


const armarInfoArticulo = (url, nombre, precio, descripcion, descuento, oferta) =>{
    const mainContainer = document.querySelector('[data-container]');
    let articuloContainer = document.createElement('div');
    articuloContainer.classList.add("descripcion-container")
    const articuloInfo = `
        <div class="descripcion-articulo">
            <div class="descipcion-articulo-articulo-container">
                <img src="${url}" class="descripcion-articulo-img">
                <div class="descripcion-articulo-precio">
                    <span class="descipcion-articulo-precio-precio">$${precio}</span>
                </div>
            </div>
        </div>
        <div class="descricion-articulo-info">
            <h1 class="descripcion-articulo-titulo">${nombre}</h1>
            <div class="descripcion-articulo-info-box">
                <p class="descripcion-articulo-descripcion">${descripcion}</p>
                <button class="descripcion-articulo-button">Agregar al carrito</button>
            </div>
        </div>
    `
    articuloContainer.innerHTML = articuloInfo;
    mainContainer.appendChild(articuloContainer);
    let span = document.querySelector('.descipcion-articulo-precio-precio');
    itemServices.descuentoArticulo(oferta, descuento,span,precio )

    /* Aplicando Ocacion Especial de Ofertas */
    let box = articuloContainer.querySelector('.descripcion-articulo');
    let articulo = articuloContainer.querySelector('.descipcion-articulo-articulo-container');
    let titulo = articuloContainer.querySelector('.descripcion-articulo-titulo')
    if(oferta == true){
        box.classList.add('descripcion-articulo--oferta');
        articulo.classList.add('descipcion-articulo-articulo-container--oferta');  
        titulo.classList.add('descripcion-articulo-titulo--oferta')   
    }else{ 
        box.classList.remove('descripcion-articulo--oferta');        
        articulo.classList.remove('descipcion-articulo-articulo-container--oferta');
        titulo.classList.remove('descripcion-articulo-titulo--oferta')        
    }
}

adminServices.longed();
itemServices.buscarArticulo();0
