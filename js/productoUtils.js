/**
 * Variable global que contiene la lista de productos a mostrar
 */
let productosObjeto = [];

/**
 * Procedimiento para cargar la lista de productos a mostrar
 */
function cargarProductos() {
    productosObjeto = [];
    productosObjeto.push(new Producto(1, "Moño", "Rojo", 150, 100, 'imagenes/moño-rojo.jpg', 50));
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
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";
    for (let i = 0; i < listaProductos.length; i++) {
        let producto = listaProductos[i];
        carritoDiv.innerHTML += `
         <div data-id="${producto.id}" class="card m-1" style="width: 18rem;">
             <img class="card-img-top producto-img" src="${producto.imagen}" alt="${producto.tipoDeProducto} ${producto.nombre}" title="${producto.nombre}" />
             <div class="card-body">
                <h2 class="card-title">${producto.tipoDeProducto} ${producto.nombre}</h2>
                <p class="card-text">${formateadorMoneda.format(producto.precio)}</p>
                <p class="card-text">Disponible: ${producto.stock}</p>
                <button class="btn btn-block buttonAgregarCarrito" onClick="agregarAlCarrito(event)"><i class="fas fa-plus"></i></button>
             </div>
         </div>
         `;
    }
}

/**
 * Procedimiento para cargar los productos en memoria y mostrarlos en pantalla
 */
function cargarPantallaProductos() {
    cargarProductos();

    document.getElementById("botonBusquedaProducto").onclick = () => {
        let filtro = document.getElementById("inputBusquedaProducto").value;
        mostrarProductos(filtro);
    }

    mostrarProductos();
}