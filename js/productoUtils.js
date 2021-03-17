/**
 * Variable global que contiene la lista de productos a mostrar
 */
let productosObjeto = [];

/**
 * Procedimiento para cargar la lista de productos a mostrar
 */
function cargarProductos() {
    return new Promise((resolve, reject) => {
        productosObjeto = [];

        // mostrar componente loading
        LoadingService.showLoading();
        // llamada a servicio
        $.ajax({
            url: "/api/productos.json",
            contentType: "application/json"
        }).done(function (data) {
            // si está OK
            productosObjeto = data;
            resolve();
        }).fail(function (xhr, err, error) {
            // si no está OK
            alert(`Ha ocurrido un error ${err}`);
            reject();
        }).always(function () {
            // esto se ejecuta siempre
            LoadingService.hideLoading();
        });

    });
}



/**
 * Procedimiento para cargar los productos en pantalla
 * @param {*} filtro valor para filtrar los productos por nombre, tipo y precio
 */
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
    const $carritoDiv = $("#carrito");
    $carritoDiv.empty();
    for (let i = 0; i < listaProductos.length; i++) {
        let producto = listaProductos[i];
        $carritoDiv.append(`
         <div data-id="${producto.id}" class="producto-card card m-1" style="width: 18rem;">
             <img class="card-img-top producto-img w3-hover-opacity" src="${producto.imagen}" alt="${producto.tipoDeProducto} ${producto.nombre}" title=" ${producto.tipoDeProducto} ${producto.nombre}" />
             <div class="card-body">
                <p class="card-title producto-card-title">${producto.tipoDeProducto} ${producto.nombre}</p>
                <label class="card-text" style="${producto.descuentoPorcentaje > 0 ? "text-decoration:line-through;" : ""}">${formateadorMoneda.format(producto.precio)}</label>
                <label class="card-text" style="${producto.descuentoPorcentaje > 0 ? "display: inline-block;" : "display: none;"}">${formateadorMoneda.format(producto.precio - (producto.precio * producto.descuentoPorcentaje / 100))}</label>
                <button class="btn btn-block buttonAgregarCarrito" onClick="agregarAlCarrito(event)"><i class="fas fa-plus"></i></button>
             </div>
         </div>
         `);
    }

    scrollReveal.reveal('.producto-card', { reset: true, delay: 100 });
}

/**
 * Procedimiento para cargar los productos en memoria y mostrarlos en pantalla
 */
function cargarPantallaProductos() {
    $("#botonBusquedaProducto").click(() => {
        let filtro = document.getElementById("inputBusquedaProducto").value;
        mostrarProductos(filtro);
    });

    cargarProductos().then(() => {
        mostrarProductos();
    });
}


