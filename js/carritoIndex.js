/**
 * Funcion para aplicar el descuento al hacer el checkout del carrito
 */
function aplicarDescuento() {
    let codDescuento = document.getElementById('descuento').value;
    let descuento = 0;

    if (!codDescuento || codDescuento.length === 0) {
        Swal.fire({
            title: 'Ingrese un código de descuento',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
        return;
    }

    if (codDescuento == "Summer2021") {
        descuento = 30;
        carritoManager.setDescuento(descuento);
        triggerCarritoChanged();
        Swal.fire({
            title: `El descuento ha sido aplicado, el precio final es de ${formateadorMoneda.format(carritoManager.obtenerTotal())}`,
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    } else {
        Swal.fire({
            title: 'El código de descuento ingresado es incorrecto',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    }
}

const mostrarTotalesEnPantalla = () => {
    $("#subtotal-span").empty().append(formateadorMoneda.format(carritoManager.obtenerSubtotal()));
    $("#total-span").empty().append(formateadorMoneda.format(carritoManager.obtenerTotal()));
}

const calcularSubTotalItem = (item) => {
    let total = item.cantidad * item.precio;
    if (item.descuentoPorcentaje) total = total - total * item.descuentoPorcentaje / 100;
    return total;
}

const dibujarItemsEnPantalla = () => {
    const itemContainer = $("#item-container");
    itemContainer.empty();

    carritoManager.obtenerItems().forEach(item => {
        itemContainer.append(`
        <tr data-id="${item.id}">
            <td><img src="/${item.imagen}" alt="{item.nombre}" style="width: 50px; height: 50px;" /></td>
            <td>
                ${item.tipoDeProducto} ${item.nombre}
            </td>
            <td>
                ${formateadorMoneda.format(item.precio)}
            </td>
            <td>
                ${item.cantidad}
            </td>
            <td>
                ${item.descuentoPorcentaje ? item.descuentoPorcentaje : 0}%
            </td>
            <td>
                ${formateadorMoneda.format(calcularSubTotalItem(item))}
            </td>
            <td>
                <button onClick="eliminarItemCarrito(event)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `)
    });
}

$(document).ready(() => {
    dibujarItemsEnPantalla();

    mostrarTotalesEnPantalla();

    $(".buttonAgregarCarrito").click(() => {
        comprar();
    });

    $(".buttonLimpiarCarrito").click(() => {
        limpiarCarrito();
    });

    // Evento personalizado para actualizar pantalla cuando el carrito cambia de estado
    onCarritoChanged((evt) => {
        const item = evt.detail;
        const items = carritoManager.obtenerItems();

        if (item && item.id) {
            $('#carrito-container tbody').find(`tr[data-id="${item.id}"]`).remove();
        }

        if (items && items.length === 0) {
            $('#carrito-container tbody').find('tr').remove();
            bootbox.alert('No hay mas elementos. Sera redireccionado a la pagina principal', () => {
                location.href = '/';
            })
        }

        dibujarItemsEnPantalla();
        mostrarTotalesEnPantalla();
    });

    $(window).on("keydown", (evt) => {
        if (evt.keyCode === 13) {
            $(".buttonAgregarCarrito").click();
        }
    });
});