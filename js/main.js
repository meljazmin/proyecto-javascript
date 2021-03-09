// Evento personalizado para actualizar pantalla cuando el carrito cambia de estado
onCarritoChanged((evt) => {
    const items = carritoManager.obtenerItems();
    document.getElementById('carritoCountSpan').innerText = items.reduce((acum, item) => {
        acum += item.cantidad;
        return acum;
    }, 0);
});

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
        Swal.fire({
            title: "Información enviada!",
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
        return;
    }
}



// Va por afuera del onload porque sino hace que la página se cargue dos veces
// new WOW().init();
// ACA ARRANCA LA WEBAPP
window.onload = function (event) {
    triggerCarritoChanged();

    cargarPantallaProductos();
    cargarAnimacionOferta();
    cargarPantallaContactos();
    let buttonCarrito = document.getElementById('buttonCarrito');
    buttonCarrito.onclick = () => {
        try {
            irAlCarrito();
        } catch (e) {
            bootbox.alert(`Error inesperado: ${e.toString()}`);
        }
    }
}