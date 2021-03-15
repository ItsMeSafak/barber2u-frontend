import Style from "./Style";

/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service {
    id: number;

    style: Style;

    description: string;

    price: number;

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, style: Style, description: string, price: number) {
        this.id = id;
        this.style = style;
        this.description = description;
        this.price = price;
    }
}
