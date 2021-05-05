import { Moment } from "moment";

import User from "./User";

/**
 * The reservation is model that consists of an id, style, date, locationa and a price.
 */
export default class Reservation {
    id: string;
    date: Moment;
    startTime: Moment;
    endTime: Moment;
    customer: User;
    barber: User;
    status: string;

    // eslint-disable-next-line require-jsdoc
    constructor(
        id: string,
        date: Moment,
        startTime: Moment,
        endTime: Moment,
        customer: User,
        barber: User,
        status: string
    ) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.customer = customer;
        this.barber = barber;
        this.status = status;
    }
}
