/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service2 {
    id: number;
    name: string;
    description: string;
    price: number;
    time: number;
    active: boolean;

    // eslint-disable-next-line require-jsdoc
    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        time: number,
        active: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.time = time;
        this.active = active;
    }

    // eslint-disable-next-line require-jsdoc
    static fromJSON(json: Service2 | null): Service2 {
        return Object.assign(Object.create(Service2.prototype), json);
    }
}
