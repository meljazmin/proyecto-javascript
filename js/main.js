/**
 * Funcion para aplicar el descuento al hacer el checkout del carrito
 */
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

/**
 * Procedimiento para animar anuncio de ofertas
 */
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

/**
 * Procedimiento para mostrar seccion de contacto 
 */
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
// ACA ARRANCA LA WEBAPP
window.onload = function (event) {
    // event.preventDefault();
    bootbox.alert({
        message: '¡Suscribite a nuestro newsletter!',
        className: 'rubberBand animated'
    });

    triggerCarritoChanged();

    cargarPantallaProductos();
    cargarAnimacionOferta();
    cargarPantallaContactos();
    let buttonCarrito = document.getElementById('buttonCarrito');
    buttonCarrito.onclick = () => {
        try {
            if (!carritoManager) throw Error('No existe carritoManager');
            if (carritoManager.obtenerItems().length === 0) return;

            // bootbox.alert(`Hay ${carritoArr.length} productos en el carrito`);

            fetch('/templates/carrito.ejs').then((res) => {
                if (res.ok) {
                    return res.text();
                }
            }).then((carritoHTML) => {
                const html = ejs.render(carritoHTML, { carrito: carritoManager });
                carritoDialog = bootbox.dialog({
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
                                    carritoManager.limpiarCarrito();
                                });
                            }
                        }
                    }
                });
            });
        } catch (e) {
            bootbox.alert(`Error inesperado: ${e.toString()}`);
        }
    }
}