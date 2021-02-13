class Carrito {
    _storageKey = 'carrito_items';

    /**
     * Funcion que devuelve los items del carrito desde el localStorage como un objeto
     */
    obtenerItems() {
        let items = localStorage.getItem(this._storageKey);
        if (items) {
            items = JSON.parse(items);
        } else {
            items = [];
        }
        return items;
    }

    agregarItem(item) {
        const items = this.obtenerItems();
        const indexItem = items.findIndex(i => item.id === i.id);
        if (indexItem > -1) {
            items[indexItem].cantidad++;
        } else {
            item.cantidad = 1;
            items.push(item);
        }
        this._guardarItems(items);
    }

    quitarItem(item) {
        const items = this.obtenerItems();
        const indexItem = items.findIndex(i => item.id === i.id)
        if (indexItem > -1) {
            items.splice(indexItem, 1);
        }
        this._guardarItems(items);
    }

    limpiarCarrito() {
        this._guardarItems();
    }

    _guardarItems(items = []) {
        localStorage.setItem(this._storageKey, JSON.stringify(items));
    }

    obtenerSubtotal() {
        return this.obtenerItems().reduce((acum, item) => {
            acum += item.precio * item.cantidad;
            if (item.porcentajeDescuento) {
                acum = acum - acum * item.descuentoPorcentaje / 100;
            }
            return acum;
        }, 0);
    }

    obtenerTotal() {
        let total = this.obtenerSubtotal();
        if (this.descuento > 0)
            total = total - (total * this.descuento / 100)
        return total;
    }

    setDescuento(){

    }
}