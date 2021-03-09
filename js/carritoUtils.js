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
            iconColor: "#bd819c",
            title: `Agregaste 1 ${producto.tipoDeProducto} ${producto.nombre} al carrito de compras!`,
            fontSize: "10px",
            width: "400px",
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            confirmButtonPositon: 'right',
            background: '#e9c3da'
        });
    


    } else {
        bootbox.alert(`Ha ocurrido un error: no se encontró el producto con id ${idProducto}`);
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
    if (!carritoManager) throw Error('Carrito es undefined');
    if (carritoManager.obtenerItems().length === 0) {
        Swal.fire({
            title: 'No tiene artículos en su carrito de compra',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c"

        });
        $(".swal2-modal").css('background-color', '#e9c3da');
        $(".swal2-container.in").css('background-color', 'rgba(43, 165, 137, 0.45)');

        return;
    }

    location.href = '/pages/carrito';
}

function limpiarCarrito() {
    carritoManager.limpiarCarrito();
    triggerCarritoChanged();
}

function comprar() {
    const items = carritoManager.obtenerItems();
    if (items && items.length > 0) {
        location.href = "/pages/order";
    }
}


