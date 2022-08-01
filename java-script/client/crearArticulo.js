import { clientServices } from "../services/client-services.js";
import { adminServices } from "../services/admin-services.js";
import { itemServices } from "../services/itemServices.js";

const newArticuloForm = document.querySelector("[data-nuevoArticulo]");

newArticuloForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const tipo = document.querySelector("[data-tipo]").value;
    const url = document.querySelector("[data-url]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    clientServices.crearArticulo(url, tipo, nombre, precio, descripcion);
})

itemServices.buscarArticulo()
adminServices.longed()