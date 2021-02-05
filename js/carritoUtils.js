// Evento personalizado para actualizar pantalla cuando el carrito cambia de estado
onCarritoChanged((evt) => {
    const item = evt.detail;
    const items = carritoManager.obtenerItems();
    document.getElementById('carritoCountSpan').innerText = items.reduce((acum, item) => {
        acum += item.cantidad;
        return acum;
    }, 0);

    if (item && item.id) {
        $('#carrito-container').find(`tr[data-id="${item.id}"`).remove();
    }

    if (items.length === 0 && carritoDialog) {
        carritoDialog.modal('hide');
    }
});

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
        // bootbox.alert(`Se agregó ${producto.tipoDeProducto} ${producto.nombre} al carrito`);
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

function limpiarCarrito() {
    carritoManager.limpiarCarrito();
    triggerCarritoChanged();
}