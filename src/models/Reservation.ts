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

    get getId(): string {
        return this.id;
    }

    get getDate(): Moment {
        return this.date;
    }

    get getStartTime(): Moment {
        return this.startTime;
    }

    get getEndTime(): Moment {
        return this.endTime;
    }

    get getCustomer(): User {
        return this.customer;
    }

    get getBarber(): User {
        return this.barber;
    }

    get getStatus(): string {
        return this.status;
    }

    get getServices(): Service[] {
        return this.services;
    }

    set setBarber(barber: User) {
        this.barber = barber;
    }

    set setCustomer(customer: User) {
        this.customer = customer;
    }
}
