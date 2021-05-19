import { Moment } from "moment";

import User from "./User";
import Service from "./Service";

/**
 * The reservation is model that consists of an id, style, date, locationa and a price.
 */
export default class Reservation {
    private id: string;
    private date: Moment;
    private startTime: Moment;
    private endTime: Moment;
    private customer: User;
    private barber: User;
    private status: string;
    private services: Service[];

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

    // eslint-disable-next-line require-jsdoc
    get getId(): string {
        return this.id;
    }

    // eslint-disable-next-line require-jsdoc
    get getDate(): Moment {
        return this.date;
    }

    // eslint-disable-next-line require-jsdoc
    get getStartTime(): Moment {
        return this.startTime;
    }

    // eslint-disable-next-line require-jsdoc
    get getEndTime(): Moment {
        return this.endTime;
    }

    // eslint-disable-next-line require-jsdoc
    get getCustomer(): User {
        return this.customer;
    }

    // eslint-disable-next-line require-jsdoc
    get getBarber(): User {
        return this.barber;
    }

    // eslint-disable-next-line require-jsdoc
    get getStatus(): string {
        return this.status;
    }

    // eslint-disable-next-line require-jsdoc
    get getServices(): Service[] {
        return this.services;
    }

    // eslint-disable-next-line require-jsdoc
    set setBarber(barber: User) {
        this.barber = barber;
    }

    // eslint-disable-next-line require-jsdoc
    set setCustomer(customer: User) {
        this.customer = customer;
    }
}
