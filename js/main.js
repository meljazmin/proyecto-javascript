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

    let productosObjeto = [];
    productosObjeto.push(new Producto("Moño", "Rojo", 150, 100, 'imagenes/moño.jpg'));
    productosObjeto.push(new Producto("Moño", "Rosa", 150, 100, 'imagenes/moño2.jpg'));
    productosObjeto.push(new Producto("Moño", "Dorado", 250, 80, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Collar", "Moon", 450, 80, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Collar", "Místico", 500, 70, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Collar", "Dije de víbora", 700, 60, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Mochila", "Rosa", 2300, 50, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Moño", "Conejito", 2400, 40, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Anillo", "Metal", 1000, 90, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Anillo", "Oro", 6000, 40, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Anillo", "Plata", 3000, 30, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto("Anillo", "Amatista", 3000, 30, 'imagenes/snake-necklace.jpg'));

    //Recorriendo lista de productos
    const carritoDiv = document.getElementById("carrito");

    for (let i = 0; i < productosObjeto.length; i++) {
        let producto = productosObjeto[i];
        carritoDiv.innerHTML += `
        <div class="col-md-3 text-center">
            <img src="${producto.imagen}" alt="${producto.tipoDeProducto} ${producto.nombre}" title="${producto.nombre}" width="50%" height="50%" />
            <h2>${producto.tipoDeProducto} ${producto.nombre}</h2>
            <p>Precio: $${producto.precio}</p>
            <p>Disponible: ${producto.stock}</p>
        </div>
        `;
    }
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


function Producto(tipoDeProducto, nombre, precio, stock, imagen) {
    this.tipoDeProducto = tipoDeProducto;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
}





