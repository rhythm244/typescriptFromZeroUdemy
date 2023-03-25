export class Product {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
    getInfomation() {
        return [this.title, `$${this.price}`];
    }
}
//# sourceMappingURL=product.js.map