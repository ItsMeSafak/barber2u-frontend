import moment, { Moment } from "moment";

import User from "./User";
import Service from "./Service";
import Role from "./enums/Role";

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
    private reviewedByCustomer: boolean;
    private reviewedByBarber: boolean;
    private reviewable: boolean;

    constructor(
        id: string,
        date: moment.Moment,
        startTime: moment.Moment,
        endTime: moment.Moment,
        customer: User,
        barber: User,
        status: string,
        services: Service[],
        reviewedByCustomer: boolean,
        reviewedByBarber: boolean,
        reviewable: boolean
    ) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.customer = customer;
        this.barber = barber;
        this.status = status;
        this.services = services;
        this.reviewedByCustomer = reviewedByCustomer;
        this.reviewedByBarber = reviewedByBarber;
        this.reviewable = reviewable;
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

    get getReviewedByCustomer(): boolean {
        return this.reviewedByCustomer;
    }

    get getReviewedByBarber(): boolean {
        return this.reviewedByBarber;
    }

    get getReviewable(): boolean {
        return this.reviewable;
    }

    set setBarber(barber: User) {
        this.barber = barber;
    }

    set setCustomer(customer: User) {
        this.customer = customer;
    }

    getTargetUser(user: User | null): User {
        if (user?.hasRole(Role.Customer)) return this.barber;
        return this.customer;
    }
}
