import { clientServices } from "../services/client-services.js";
import { itemServices } from "../services/itemServices.js";
import { adminServices } from "../services/admin-services.js";


const url = new URL(window.location);
const tipo =  url.searchParams.get('tipo');

/* Creando el Titulo Correspondiente*/
const articulosMainContainer = document.querySelector('[data-main]')
let articuloContainerSection = document.createElement('div');
articuloContainerSection.classList.add('ver-todos-box');
let titleInfoContainer = `
    <div class="ver-todos-title">
        <h2 class="title">${tipo}</h2>
        <a href = "../index.html" class = "volver">⇐ Volver</a>
    </div>
    <div class="ver-todos-ul-container">
        <ul class="ver-todos-articulos" data-articuloUl></ul>
    </div>    
`
articuloContainerSection.innerHTML = titleInfoContainer;
articulosMainContainer.appendChild(articuloContainerSection);

/*  Agrupando el contenido */
const obteniendoInfoGrupo = () =>{

    clientServices.agruparArticulos(tipo).then( articulos => {
        articulos.forEach( articulo =>{
            agruparPorTipo(articulo.url, articulo.nombre, articulo.precio, articulo.id, articulo.oferta, articulo.descuento);
        })
    });
}

const buttonsDelete = [];
const infoItems = [];


const agruparPorTipo = (url,nombre, precio, id, oferta, descuento) =>{
    let itemContainer = document.querySelector('[data-articuloUl]');
    let item = document.createElement('li');
    item.classList.add('ver-todos-articulo');
    let itemContent = `
    <div class="img-icon-container esconder" data-permission>
    <i data-buttonDelete id = "${id}"><img class="img-icon" src="../assets/logos/delete.png" alt=""></i>
    <a href = "../screens/editar-producto.html?id=${id}" ><img class="img-icon" src="../assets/logos/edit.png" alt=""></a>
    </div>
    <div class = "card-articulo-content" id = "${id}" data-itemContent> 
        <div class="articulo-img-container">
            <img class="articulo-img" src="${url}" alt="${nombre}">
        </div>
        <div class="articulo-contenido-container">
            <h2 class="articulo-titulo">${nombre}</h2>
            <span class="articulo-ver-todos-precio-titulo">Precio:</span>
            <p class="articulo-ver-todos-precio">$${precio}</p>
        </div>
    </div>    
    `
    item.innerHTML = itemContent
    itemContainer.appendChild(item);
    buttonsDelete.push(item.querySelector('[data-buttonDelete]'));
    itemServices.eliminarItems(buttonsDelete);
    infoItems.push(item.querySelector('[data-itemContent]'))
    infoItems.forEach(infoitem => itemServices.verArticulo(infoitem));
    
let modificadoresArticulo = item.querySelector('[data-permission]');
   adminServices.botonesEdicion(modificadoresArticulo)
   let span = item.querySelector('.articulo-ver-todos-precio')
   console.log(oferta, descuento, span)
   itemServices.descuentoArticulo(oferta,descuento,span, precio)
}



obteniendoInfoGrupo();
adminServices.longed()
if(screen.width < 940){
    itemServices.buscadorResponsive()
}else{
    itemServices.buscarArticulo()
}