import Style from "./enums/Style";

/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service {
    id = 0;
    name: string;
    description: string;
    price: number;
    time: number;
    active: boolean;

    // eslint-disable-next-line require-jsdoc
    constructor(
        name: string,
        description: string,
        price: number,
        time: number,
        active: boolean
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.time = time;
        this.active = active;
    }
}
