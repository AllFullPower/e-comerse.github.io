const listaArticulos = () => fetch("http://localhost:3000/articulo").then(respuesta => respuesta.json());

const crearArticulo = (url, tipo, nombre, precio, descripcion) =>{
    fetch("http://localhost:3000/articulo", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({url, tipo, nombre, precio, descripcion, id: uuid.v4(), oferta: false})
    }).then(window.location = '../index.html').catch(err => err = window.location.href = './error.html');
}

const eliminarArticulo = (id) =>{
    fetch(`http://localhost:3000/articulo/${id}`, {
        method: "DELETE",
    })
}

const editarArticulo  = (id) => {
    return  fetch(`http://localhost:3000/articulo/${id}`).then(respuesta => respuesta.json());
}

const altualizarArticulo = (url, tipo, nombre, precio, descripcion, id, oferta, descuento) =>{
    return fetch(`http://localhost:3000/articulo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({url, tipo, nombre, precio, descripcion, id, oferta, descuento})
    }).then(respuesta => respuesta);
}

const agruparArticulos = (tipo) =>{
    return fetch(`http://localhost:3000/articulo?tipo=${tipo}`).then(respuesta => respuesta.json());
}

const buscarArticuloReguex = (nombre) =>{
    return fetch (`http://localhost:3000/articulo?nombre=${nombre}`).then(respuesta => respuesta.json())
}

export const clientServices ={
    listaArticulos,
    crearArticulo,
    eliminarArticulo,
    editarArticulo,
    altualizarArticulo,
    agruparArticulos,
    buscarArticuloReguex,
}