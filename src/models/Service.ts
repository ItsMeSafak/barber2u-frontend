import Style from "./Style";

/* eslint-disable */
export default class Service {
    id: number;
    style: Style;
    description: string;
    price: number;

    constructor(id: number, style: Style, description: string, price: number) {
        this.id = id;
        this.style = style;
        this.description = description;
        this.price = price;
    }
}
