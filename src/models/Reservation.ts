import Style  from "./Style";

export default class Reservation {
    id: number;

    style: Style;

    date: string;

    location: string;

    price: number;

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
