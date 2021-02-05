/**
 * Clase producto para manejar el modelo de productos
 */
class Producto {
    constructor(id, tipoDeProducto, nombre, precio, stock, imagen, descuentoPorcentaje) {
        this.id = id;
        this.tipoDeProducto = tipoDeProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.descuentoPorcentaje = descuentoPorcentaje;
    }
}