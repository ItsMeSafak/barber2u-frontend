import { Moment } from "moment";

import User from "./User";
import Service from "./Service";

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
    services: Service[];

    // eslint-disable-next-line require-jsdoc
    constructor(
        id: string,
        date: Moment,
        startTime: Moment,
        endTime: Moment,
        customer: User,
        barber: User,
        status: string,
        services: Service[]
    ) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.customer = customer;
        this.barber = barber;
        this.status = status;
        this.services = services;
    }
}
