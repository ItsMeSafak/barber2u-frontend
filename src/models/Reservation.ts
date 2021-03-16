import Style from "./Style";

/**
 * The reservation is model that consists of an id, style, date, locationa and a price.
 */
export default class Reservation {
    id: number;
    style: Style;
    date: string;
    location: string;
    price: number;

    // eslint-disable-next-line require-jsdoc
    constructor(
        id: number,
        style: Style,
        date: string,
        location: string,
        price: number
    ) {
        this.id = id;
        this.style = style;
        this.date = date;
        this.location = location;
        this.price = price;
    }
}
