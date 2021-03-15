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

    /**
     *
     * @param {number} id Id of the reservation.
     * @param {Style} style Style of the reservation.
     * @param {string} date Date of the reservation placed.
     * @param {string} location Location of the reservation.
     * @param {number} price Price of the reservation.
     */
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
