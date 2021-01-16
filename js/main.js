function aplicarDescuento() {
    let codDescuento = document.getElementById('descuento').value;
    let precioProducto = 50;
    let precioFinal;
    let descuento = 0;

    if (!codDescuento || codDescuento.length === 0) {
        document.getElementById('mensajeError').innerHTML = "Campo vacío, ingrese un valor";
        return;
    }

    if (codDescuento == "Summer2021") {
        descuento = 30;
        precioFinal = precioProducto - descuento;
        document.getElementById('precioFinal').innerHTML = "El descuento ha sido aplicado, el precio final es de " + "$" + precioFinal;
    } else {
        document.getElementById('mensajeError').innerHTML = 'El código de descuento ingresado es incorrecto';

    }
}

function cargarProductos() {
    let productos = ["Moño", "Collares", "Mochilas", "Anillos"];
    let monios = ["Rojo", "Rosa", "Dorado"];
    let collares = ["Moon", "Místico", "Dije con víbora"];
    let mochilas = ["Rosa", "Conejito"];
    let anillos = ["Metal", "Oro", "Plata"];

    function mostrarListaProducto(event) {
        event.preventDefault();
        let listadoDeProductos = document.getElementById('listaProducto');
        listadoDeProductos.innerHTML = "";
        let listaProducto;
        switch (event.target.innerText) {
            case "Moño":
                listaProducto = monios;
                break;
            case "Collares":
                listaProducto = collares;
                break;
            case "Mochilas":
                listaProducto = mochilas;
                break;
            case "Anillos":
                listaProducto = anillos;
                break;
        }
        let listaProductoElem = document.createElement('ul');
        for (let j = 0; j < listaProducto.length; j++) {
            let liElement = document.createElement('li');
            liElement.innerText = listaProducto[j];
            listaProductoElem.appendChild(liElement);
        }

        listadoDeProductos.appendChild(listaProductoElem);


    }

    //Recorriendo lista de productos
    let listaTipoProductoElem = document.createElement('ul');

    for (let i = 0; i < productos.length; i++) {
        let productoLi = document.createElement('li');
        // productoLi.innerText = productos[i];
        let link = document.createElement('a');
        link.innerText = productos[i];
        link.href = "";
        link.onclick = mostrarListaProducto;
        productoLi.appendChild(link);
        listaTipoProductoElem.appendChild(productoLi);
    }

    document.getElementById("listado").appendChild(listaTipoProductoElem);
}

function cargarAnimacionOferta() {
    //Texto que parpadea
    var color = "#7b38d8";
    function parpadear() {
        let blink = document.getElementById("blink");
        color = (color == "#ffffff") ? "#7b38d8" : "#ffffff";
        blink.style.color = color;
        blink.style.fontSize = '36px';
    }
    window.setInterval(parpadear, 500);
}

function cargarPantallaContactos() {
    //Alerta al enviar formulario
    var contactoForm = document.getElementById("contactoForm");
    contactoForm.onsubmit = function (evt) {
        evt.preventDefault();
        alert("Se ha enviado la información");
        return;
    }
}

// Va por afuera del onload porque sino hace que la página se cargue dos veces
// new WOW().init();
window.onload = function (event) {
    // event.preventDefault();

    alert("¡Suscribite a nuestro newsletter!");

    cargarProductos();
    cargarAnimacionOferta();
    cargarPantallaContactos();
}