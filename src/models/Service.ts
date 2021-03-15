import Style from "./Style";

/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service {
    id: number;
    style: Style;
    description: string;
    price: number;

    /**
     *
     * @param {number} id Id of the service.
     * @param {Style} style Style of the service.
     * @param {string} description Description of the service.
     * @param {number} price Price of the service.
     */
    constructor(id: number, style: Style, description: string, price: number) {
        this.id = id;
        this.style = style;
        this.description = description;
        this.price = price;
    }
}
