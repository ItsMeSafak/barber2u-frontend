import Style from "./enums/Style";

/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service {
    id: number;
    style: string;
    description: string;
    price: number;
    timeEstimation: number;
    isEnabled: boolean;

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, style: string, description: string, price: number, timeEstimation: number, isEnabled: boolean) {
        this.id = id;
        this.style = style;
        this.description = description;
        this.price = price;
        this.timeEstimation = timeEstimation;
        this.isEnabled = isEnabled;
    }
}
