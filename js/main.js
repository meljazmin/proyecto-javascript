class Producto {
    constructor(id, tipoDeProducto, nombre, precio, stock, imagen) {
        this.id = id;
        this.tipoDeProducto = tipoDeProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}


let productosObjeto = [];

function aplicarDescuento() {
    let codDescuento = document.getElementById('descuento').value;
    let precioProducto;
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
    productosObjeto.push(new Producto(1, "Moño", "Rojo", 150, 100, 'imagenes/moño-rojo.jpg'));
    productosObjeto.push(new Producto(2, "Moño", "Rosa", 150, 100, 'imagenes/moño-rosa.jpg'));
    productosObjeto.push(new Producto(3, "Moño", "Dorado", 250, 80, 'imagenes/moño-dorado.jpg'));
    productosObjeto.push(new Producto(4, "Collar", "Moon", 450, 80, 'imagenes/collar-moon.webp'));
    productosObjeto.push(new Producto(5, "Collar", "Místico", 500, 70, 'imagenes/collar-mistico.jpg'));
    productosObjeto.push(new Producto(6, "Collar", "Víbora", 700, 60, 'imagenes/snake-necklace.jpg'));
    productosObjeto.push(new Producto(7, "Mochila", "Rosa", 2300, 50, 'imagenes/mochila-rosa.jpg'));
    productosObjeto.push(new Producto(8, "Mochila", "Conejito", 2400, 40, 'imagenes/mochila-conejito.jpg'));
    productosObjeto.push(new Producto(9, "Anillo", "Diamantes", 1000, 90, 'imagenes/anillo-diamante.jpg'));
    productosObjeto.push(new Producto(10, "Anillo", "Oro", 6000, 40, 'imagenes/anillo-oro.jpg'));
    productosObjeto.push(new Producto(11, "Anillo", "Plata", 3000, 30, 'imagenes/anillo-plata.jpg'));
    productosObjeto.push(new Producto(12, "Anillo", "Amatista", 3000, 30, 'imagenes/anillo-amatista.jpg'));
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
         <div data-id="${producto.id}" class="card m-1" style="width: 18rem;">
             <img class="card-img-top producto-img" src="${producto.imagen}" alt="${producto.tipoDeProducto} ${producto.nombre}" title="${producto.nombre}" />
             <div class="card-body">
                <h2 class="card-title">${producto.tipoDeProducto} ${producto.nombre}</h2>
                <p class="card-text">ARS$${producto.precio}</p>
                <p class="card-text">Disponible: ${producto.stock}</p>
                <button class="btn btn-block buttonAgregarCarrito" onClick="agregarAlCarrito(event)"><i class="fas fa-plus"></i></button>
             </div>
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
    var color = "#bd819c";
    function parpadear() {
        let blink = document.getElementById("blink");
        color = (color == "#ffffff") ? "#bd819c" : "#ffffff";
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

function agregarAlCarrito(evt) {
    const parentElement = evt.target.parentElement.parentElement;
    const idProducto = $(parentElement).data('id');

    // alert(`Producto ${idProducto}`);
    const productoAAgregar = productosObjeto.find(producto => producto.id === idProducto);
    if (productoAAgregar) {
        let carrito = getCarritoFromStorage();
        const indexItem = carrito.findIndex(item => productoAAgregar.id === item.id)
        if (indexItem > -1) {
            carrito[indexItem].cantidad++;
        } else {
            productoAAgregar.cantidad = 1;
            carrito.push(productoAAgregar);
        }
        saveCarritoInStorage(carrito);
        bootbox.alert(`Se agregó ${productoAAgregar.tipoDeProducto} ${productoAAgregar.nombre} al carrito`);
    } else {
        bootbox.alert(`Ha ocurrido un error: No se encontro el producto con id ${idProducto}`);
    }
}

function limpiarCarrito() {
    saveCarritoInStorage();
}

function getCarritoFromStorage() {
    let carrito = localStorage.getItem('carrito');
    if (carrito) {
        carrito = JSON.parse(carrito);
    } else {
        carrito = [];
    }
    return carrito;
}

function saveCarritoInStorage(carrito = []) {
    window.dispatchEvent(carritoChangedEvent);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const carritoChangedEvent = new CustomEvent('carritoChanged');
window.addEventListener('carritoChanged', (evt) => {
    const carrito = getCarritoFromStorage();
    document.getElementById('carritoCountSpan').innerText = carrito.reduce((acum, item) =>{
        acum += item.cantidad;
        return acum;
    }, 0);
});

// Va por afuera del onload porque sino hace que la página se cargue dos veces
// new WOW().init();
window.onload = function (event) {
    // event.preventDefault();
    bootbox.alert({
        message: '¡Suscribite a nuestro newsletter!',
        className: 'rubberBand animated'
    });

    window.dispatchEvent(carritoChangedEvent);

    cargarPantallaProductos();
    cargarAnimacionOferta();
    cargarPantallaContactos();
    let buttonCarrito = document.getElementById('buttonCarrito');
    buttonCarrito.onclick = () => {
        const carritoStr = localStorage.getItem('carrito');
        if (!carritoStr || carritoStr.length === 0) return;
        const carritoArr = JSON.parse(carritoStr);
        if (carritoArr.length === 0) return;

        // bootbox.alert(`Hay ${carritoArr.length} productos en el carrito`);

        fetch('/templates/carrito.ejs').then((res) => {
            if (res.ok) {
                return res.text();
            }
        }).then((carritoHTML) => {
            const html = ejs.render(carritoHTML, { carrito: carritoArr });
            var dialog = bootbox.dialog({
                // title: 'Mis compras',
                message: html,
                size: 'xl',
                buttons: {
                    ok: {
                        label: "Comprar",
                        className: 'buttonAgregarCarrito',
                        callback: function () {
                            // console.log('Custom OK clicked');
                            bootbox.alert('Se ha comprado los productos');
                        }
                    },
                    limpiarCarrito: {
                        label: 'Limpiar carrito',
                        className: 'buttonLimpiarCarrito',
                        callback: function () {
                            bootbox.confirm('¿De verdad desea borrar todos los items del carrito?', () => {
                                limpiarCarrito();
                            });
                        }
                    }
                }
            });
        });
    }
}