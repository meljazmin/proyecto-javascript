let productosObjeto = [];

function aplicarDescuento() {
    let codDescuento = document.getElementById('descuento').value;
    let precioProducto = producto.precio;
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
    productosObjeto = [];
    productosObjeto.push(new Producto("Moño", "Rojo", 150, 100, 'imagenes/moño-rojo.jpg'));
    productosObjeto.push(new Producto("Moño", "Rosa", 150, 100, 'imagenes/moño-rosa.jpg'));
    productosObjeto.push(new Producto("Moño", "Dorado", 250, 80, 'imagenes/moño-dorado.jpg'));
    productosObjeto.push(new Producto("Collar", "Moon", 450, 80, 'imagenes/collar-moon.webp'));
    productosObjeto.push(new Producto("Collar", "Místico", 500, 70, 'imagenes/collar-mistico.jpg'));
    productosObjeto.push(new Producto("Collar", "Víbora", 700, 60, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Mochila", "Rosa", 2300, 50, 'imagenes/mochila-rosa.jpg'));
    productosObjeto.push(new Producto("Mochila", "Conejito", 2400, 40, 'imagenes/mochila-conejito.jpg'));
    productosObjeto.push(new Producto("Anillo", "Diamantes", 1000, 90, 'imagenes/anillo-diamante.jpg'));
    productosObjeto.push(new Producto("Anillo", "Oro", 6000, 40, 'imagenes/anillo-oro.jpg'));
    productosObjeto.push(new Producto("Anillo", "Plata", 3000, 30, 'imagenes/anillo-plata.jpg'));
    productosObjeto.push(new Producto("Anillo", "Amatista", 3000, 30, 'imagenes/anillo-amatista.jpg'));
}

function mostrarProductos(filtro) {
    let listaProductos;

    if (filtro) {
        listaProductos = productosObjeto.filter((producto) => {
            let datosComparar = `${producto.tipoDeProducto} ${producto.nombre} ${producto.precio}`;
            return datosComparar.toLowerCase().includes(filtro.toLowerCase());
        });
    } else {
        listaProductos = productosObjeto;
    }

    //Recorriendo lista de productos
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";
    for (let i = 0; i < listaProductos.length; i++) {
        let producto = listaProductos[i];
        carritoDiv.innerHTML += `
         <div class="col-md-3 text-center" style="margin-top: 20px">
             <img src="${producto.imagen}" alt="${producto.tipoDeProducto} ${producto.nombre}" title="${producto.nombre}" width="60%" height="60%" />
             <h2>${producto.tipoDeProducto} ${producto.nombre}</h2>
             <p>ARS$${producto.precio}</p>
             <p>Disponible: ${producto.stock}</p>
         </div>
         `;
    }
}

function cargarPantallaProductos() {
    cargarProductos();

    document.getElementById("botonBusquedaProducto").onclick = () => {
        let filtro = document.getElementById("inputBusquedaProducto").value;
        mostrarProductos(filtro);
    }

    mostrarProductos();
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
    bootbox.alert({
        message: '¡Suscribite a nuestro newsletter!',
      className: 'rubberBand animated'
    });

    cargarPantallaProductos();
    cargarAnimacionOferta();
    cargarPantallaContactos();
}


class Producto {
    constructor(tipoDeProducto, nombre, precio, stock, imagen) {

        this.tipoDeProducto = tipoDeProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}





