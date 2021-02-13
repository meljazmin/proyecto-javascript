var formateadorMoneda = new Intl.NumberFormat("es-AR", {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'code',
    maximumFractionDigits: 2
});

var carritoDialog;

var carritoManager = new Carrito();

var CARRITO_CHANGED_EVENT_NAME = 'carritoChanged';
//Función que dispara un evento
function triggerCustomEvent(eventName, data = null) {
    var customEvent = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(customEvent);
}

function triggerCarritoChanged(data = null) {
    triggerCustomEvent(CARRITO_CHANGED_EVENT_NAME, data);
}

function onCarritoChanged(callback) {
    // window.addEventListener(CARRITO_CHANGED_EVENT_NAME, (evt) => {
    //     callback(evt);
    // });
    $(window).on(CARRITO_CHANGED_EVENT_NAME, (evt) => {
        callback(evt);
    });
}
