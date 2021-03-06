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
            let precio = item.descuentoPorcentaje ? item.precio - item.precio * item.descuentoPorcentaje / 100 : item.precio;
            acum += precio * item.cantidad;
            return acum;
        }, 0);
    }

    obtenerTotal() {
        let total = this.obtenerSubtotal();
        return total;
    }

    setDescuento(descuento){
        const items = this.obtenerItems()
        items.forEach(item => {
            item.descuentoPorcentaje += descuento;
        });
        this._guardarItems(items);
    }
}