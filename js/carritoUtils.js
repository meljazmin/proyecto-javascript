/**
 * Funcion para agregar el producto seleccionado al carrito
 * @param {*} evt contexto del evento accionado 
 */
function agregarAlCarrito(evt) {
    const parentElement = evt.target.parentElement.parentElement;
    const idProducto = $(parentElement).data('id');

    const producto = productosObjeto.find(producto => producto.id === idProducto);
    if (producto) {
        agregarItemAlCarrito(producto);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Agregaste 1 ${producto.tipoDeProducto} ${producto.nombre} al carrito de compras!`,
            showConfirmButton: true,
            timer: 4000
        });


    } else {
        bootbox.alert(`Ha ocurrido un error: No se encontro el producto con id ${idProducto}`);
    }
}

function agregarItemAlCarrito(item) {
    carritoManager.agregarItem(item);
    triggerCarritoChanged(item);
}

function eliminarItemCarrito(evt) {
    const itemId = $(evt.target).closest('tr').data('id');
    const item = carritoManager.obtenerItems().find(i => i.id === itemId);
    carritoManager.quitarItem(item);
    triggerCarritoChanged(item);
}

function irAlCarrito() {
    if (!carritoManager) throw Error('No existe carritoManager');
    if (carritoManager.obtenerItems().length === 0) return;

    // bootbox.alert(`Hay ${carritoArr.length} productos en el carrito`);
    location.href = '/pages/carrito';
}

function limpiarCarrito() {
    carritoManager.limpiarCarrito();
    triggerCarritoChanged();
}

function comprar() {
    const items = carritoManager.obtenerItems();
    if (items && items.length > 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            className: "swal-fire",
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 1500
        });
    }
}