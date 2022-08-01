import { clientServices } from "../services/client-services.js";
import { itemServices } from "../services/itemServices.js";
import { adminServices } from "../services/admin-services.js";


const tiposUsados = [];
const itemsButtonsDelete = [];



const createItem = (tipo, img, nombre, precio, id, oferta, descuento) =>{
    /* Mecanismo de detector de tipos*/

    let detectorUsados = false


    if(tiposUsados.includes(tipo)){
        detectorUsados = true;
    }else{
        detectorUsados = false
    }

  
    /*Creando Articulos*/

    const cardContainer = document.querySelector('[data-main]')
    const card = document.createElement('div');
    card.classList.add('swiper-container');
    card.setAttribute('id', tipo)


    const cardUl = `
    <div class="articulos-container">
            <div class="articulos-titulo-container">
            <h2 class="articulos-titulo">${tipo}</h2>
            <a class = "link-ver-todos" href = "./screens/ver-todos.html?tipo=${tipo}">Ver todos ➾</a>
            </div>
        <div class="articulo-card-container swiper mySwiper" data-cardContainer>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
            <ul class="articulo-card ${tipo} swiper-wrapper"></ul><div class="swiper-pagination"></div>
        </div>
    </div>    
    `

    const item = document.createElement('li');
    item.classList.add(`articulo`);
    item.classList.add('swiper-slide')
  

    

    let itemContent = `
                    <div class="img-icon-container esconder" data-permission>
                        <i data-buttonDelete id ="${id}"><img class="img-icon" src="./assets/logos/delete.png" alt=""></i>
                        <a href = "./screens/editar-producto.html?id=${id}" ><img class="img-icon" src="./assets/logos/edit.png" alt=""></a>
                    </div>
                    <div class = "card-articulo-content" id = "${id}"> 
                        <div class="articulo-img-container">
                            <img class="articulo-img" src="${img}" alt="">
                        </div>
                        <div class="articulo-contenido-container">
                            <h2 class="articulo-titulo">${nombre}</h2>
                            <span class="articulo-precio-titulo">Precio:</span>
                            <p class="articulo-precio">$${precio}</p>
                        </div>
                    </div>    

    `;

    item.innerHTML = itemContent;

    card.innerHTML = cardUl
    itemsButtonsDelete.push(item.querySelector("[data-buttonDelete]"));
    let cardItemContent = item.querySelector('.card-articulo-content');
    itemServices.verArticulo(cardItemContent);
    let modificadoresArticulo = item.querySelector('[data-permission]');
    adminServices.botonesEdicion(modificadoresArticulo);



    if(!detectorUsados){
        tiposUsados.push(tipo);
        let ulCardItems = card.querySelector(`ul.${tipo}`);
        ulCardItems.appendChild(item)
        cardContainer.appendChild(card);
        itemServices.swiperInicialitation();

    
    
    }else{
        let ulCardItems = cardContainer.querySelector(`ul.${tipo}`);
        ulCardItems.appendChild(item);
        
    }
    let spanPrecio = item.querySelector('.articulo-precio');
    itemServices.descuentoArticulo(oferta, descuento, spanPrecio, precio)

    /*Eliminando Items */

    itemServices.eliminarItems(itemsButtonsDelete);

    /* Aplicando Descuentos */
    
}


clientServices.listaArticulos().then( data =>{
    data.forEach( datos => {
        createItem(datos.tipo, datos.url, datos.nombre, datos.precio, datos.id, datos.oferta, datos.descuento);
    });
})



/* Buscador de articulos */

itemServices.buscarArticulo()


/* Admin Services */

adminServices.longed()





