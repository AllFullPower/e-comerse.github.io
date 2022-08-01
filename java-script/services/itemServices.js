import { clientServices } from "./client-services.js";
import { adminServices } from "./admin-services.js";


/* Inicializador del Wiper*/
const swiperInicialitation = () =>{
    var swiper = new Swiper(".mySwiper", {
        loop: false,
        loopFillGroupWithBlank: false,

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
        breakpoints:{
            620:{
                slidesPerView:1,
                spaceBetween:20,
            },
            680:{
                slidesPerView:2,
                spaceBetween:40,
            },
            920:{
                slidesPerView:3,
                spaceBetween:40,
            },
            1240:{
                slidesPerView:5,
                slidesPerGroup: 3,
                spaceBetween:30,
            },
        
          }
      });
}

const eliminarItems = (button) =>{
    button.forEach( buttonsDelete => {
        buttonsDelete.addEventListener("click", ()=>{
            const itemId = buttonsDelete.id
            clientServices.eliminarArticulo(itemId).then(respuesta =>{
                return respuesta
            }).catch( error => console.log(error)); 
        })
    });
}

const verArticulo = (articulo) =>{
    let url = new URL(window.location)
    if(url.pathname == '/index.html'){
        articulo.addEventListener('click', (articulo)=>{
            let id = articulo.path[2].id;
                clientServices.editarArticulo(id).then(respuesta => window.location.href = `./screens/descripcion-producto.html?id=${respuesta.id}`);
        })
    }else if (url.pathname == '/screens/ver-todos.html') {
        articulo.addEventListener('click', (articulo)=>{
            let id = articulo.path[2].id;
            clientServices.editarArticulo(id).then(respuesta => window.location.href = `./descripcion-producto.html?id=${respuesta.id}`);
        })      
    }
}

const buscarArticulo = () =>{
    let buscador = document.querySelector('#buscador');
    let ul = document.querySelector('.buscador-ul');
    clientServices.listaArticulos().then(articulos => {
        articulos.forEach(articulo => {
            let item = document.createElement('li');
            if(screen.width < 920){
                item.classList.remove('swiper-slide')
            }else{
                item.classList.add('swiper-slide')
            }   
            item.classList.add('buscador-item');
            item.setAttribute('id', `${articulo.id}`)
            let imgDelete = ''
            let imgEdit = ''
            let linkEditar = ''
            if(window.location.pathname == './index.html'){
                imgDelete = './assets/logos/delete.png';
                imgEdit = './assets/logos/edit.png';
                linkEditar = `./screens/editar-producto.html?id=${articulo.id}`
            }else{
                imgDelete = '../assets/logos/delete.png';
                imgEdit = '../assets/logos/edit.png';
                linkEditar = `./editar-producto.html?id=${articulo.id}`
            }
            let itemContent = `
            <div class="buscador-contenido-container">
            <div class="buscador-botones esconder">
                <i class="buscador-botones-img botonBorrar" id="${articulo.id}"><img src="${imgDelete}" alt=""></i>
                <a class="buscador-botones-img" href="${linkEditar}"><img src="${imgEdit}" alt=""></a>
            </div>
            <div class = 'buscador-img-content'>
                <div class="buscador-contenido-img">
                    <img class="buscador-img" src="${articulo.url}" alt="">
                </div>
                <div class="buscador-contenido">
                    <span class="buscador-titulo">${articulo.nombre}</span>
                    <span class="buscador-titulo-precio">precio:</span>
                    <span class="buscador-precio">$${articulo.precio}</span>
                </div>
            </div>    
            `
            item.innerHTML = itemContent;
            item.classList.add()
            ul.appendChild(item);
            let buscadorBotones = ul.querySelectorAll('.buscador-botones');
            let inicioSession = JSON.parse(localStorage.getItem('session')) || [];
            buscadorBotones.forEach(botones => {
                if(inicioSession.length == 1 ){
                    if(!inicioSession[0].poolBridgue){
                        botones.classList.add('esconder')
                    }else{
                        botones.classList.remove('esconder');
                    }
                }else{
                    return
                }
            });
            var swiper2 = new Swiper(".mySwiper2", {
                loop: false,
                loopFillGroupWithBlank: false,
        
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                  },
                breakpoints:{
                    620:{
                        slidesPerView:1,
                        slidesPerGroup: 1,

                        spaceBetween:20,
                    },
                    680:{
                        slidesPerView:1,
                        slidesPerGroup: 1,

                        spaceBetween:40,
                    },
                    920:{
                        slidesPerView:1,
                        slidesPerGroup: 1,

                        spaceBetween:40,
                    },
                    1240:{
                        slidesPerView:4,
                        slidesPerGroup: 1,
                        spaceBetween:30,
                    },
                
                  }
              });
              let span = item.querySelector('.buscador-precio')
              itemServices.descuentoArticulo(articulo.oferta, articulo.descuento,span, articulo.precio)
    

        })
    });
     
    bordesInput(buscador, "bordes");

    buscador.addEventListener("input",function(){
        let main = document.querySelector("[data-principal]");
        let reguex = new RegExp(this.value, 'i');
        let nombreItems = main.querySelectorAll('.buscador-titulo');
        let imagenesItems = main.querySelectorAll('.buscador-img-content');
        let deleteButtons = main.querySelectorAll('.botonBorrar');

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', () =>{
                let id = deleteButton.id;
                clientServices.eliminarArticulo(id);
            });
        });

        imagenesItems.forEach(imagenItem =>{
            imagenItem.addEventListener('click', (articulo)=>{
                let id = articulo.path[4].id;
                let link = `./screens/descripcion-producto.html?id=`;
                if(window.location.pathname == '/index.html'){
                    link = `./screens/descripcion-producto.html?id=`;
                }else{
                    link = `./descripcion-producto.html?id=`;
                }
                clientServices.editarArticulo(id).then(respuesta => window.location.href = `${link + respuesta.id}`);
            });
        });
        
        if(this.value.length >= 1){
            main.classList.remove('esconder');
            nombreItems.forEach(nombreItem =>{
                if(!reguex.test(nombreItem.innerHTML)){
                    nombreItem.parentElement.parentElement.parentElement.parentElement.classList.add('esconder');
                    
                }else{
                    nombreItem.parentElement.parentElement.parentElement.parentElement.classList.remove('esconder');
                };
            });
        }else{
            main.classList.add('esconder');
        };
    });
  
};

const bordesInput = (input, clase) =>{
    input.addEventListener('focus', ()=>{
        input.parentElement.classList.add(clase);
    });
    input.addEventListener('blur', ()=>{
        input.parentElement.classList.remove(clase);
    })
}

const descuentoArticulo = (oferta, descuento, span, precio) =>{
    if(oferta == true){
        if(window.location.pathname == '/screens/descripcion-producto.html'){
            let total = `$${(precio - (precio * `0.${descuento}`)).toFixed(2)}`
            span.classList.add('oferta')
            span.innerHTML = `$${precio}/${total} -${descuento}%`
            console.log('hola');
        }else{
            let total = `$${(precio - (precio * `0.${descuento}`)).toFixed(2)}`
            span.parentElement.parentElement.parentElement.classList.add('oferta-box');
            span.classList.add('oferta')
            span.innerHTML = `$${precio}/${total} -${descuento}%`
        }
    }else{
        span.parentElement.parentElement.parentElement.classList.remove('oferta-box')
        span.classList.remove('oferta')
        
    }
}

const buscadorResponsive = () =>{
    let buscador = document.querySelector('.nav-buscador');
    let containerPrincipalResponsive = document.querySelector('.ul-buscador-responsive')
    clientServices.listaArticulos().then(articulos =>{
        articulos.forEach(articulo =>{
            let li = document.createElement('li')
            li.setAttribute('id', articulo.id)
            li.classList.add('item-nombre--reponsive');
            let content = `<span class="nombre-responsive" id="${articulo.id}">${articulo.nombre}</span>`
            li.innerHTML = content;
            containerPrincipalResponsive.appendChild(li)
            li.addEventListener('click', (item)=>{
                let id = item.target.id
                let link = `./screens/descripcion-producto.html?id=`;
                if(window.location.pathname == '/index.html'){
                    link = `./screens/descripcion-producto.html?id=`;
                }else{
                    link = `./descripcion-producto.html?id=`;
                }
                clientServices.editarArticulo(id).then(respuesta => window.location.href = `${link + respuesta.id}`);
            })
        })
    })

    buscador.addEventListener('input', function(){
        if(this.value.length >= 1){
            containerPrincipalResponsive.classList.remove('esconder')

            let reguex = new RegExp(this.value, 'i');
            let nombres = containerPrincipalResponsive.querySelectorAll('span');
            nombres.forEach(nombre => {
                if(!reguex.test(nombre.innerHTML)){
                    nombre.parentElement.classList.add('esconder');
                }else{
                    nombre.parentElement.classList.remove('esconder');
        
                }
            })

        }else{
            containerPrincipalResponsive.classList.add('esconder')
        }


    })

}



export const itemServices ={
    swiperInicialitation,
    eliminarItems,
    verArticulo,
    buscarArticulo,
    bordesInput,
    descuentoArticulo,
    buscadorResponsive
}