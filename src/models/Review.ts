import moment, { Moment } from "moment";
import User from "./User";
import Reservation from "./Reservation";
import Role from "./enums/Role";

/**
 * The review model is a model that consists of data regarding reviewing a barber or a customer.
 */
export default class Review {
    private id: string;
    private targetUser: User;
    private reviewer: User;
    private reservation: Reservation;
    private image: string;
    private starAmount: number;
    private reviewText: string;
    private dateOfReview: Moment;

    constructor(
        id: string,
        targetUser: User,
        reviewer: User,
        reservation: Reservation,
        image: string,
        starAmount: number,
        reviewText: string,
        dateOfReview: moment.Moment
    ) {
        this.id = id;
        this.targetUser = reviewer;
        this.reviewer = reviewer;
        this.reservation = reservation;
        this.image = image;
        this.starAmount = starAmount;
        this.reviewText = reviewText;
        this.dateOfReview = dateOfReview;
    }

    get getId(): string {
        return this.id;
    }

    get getTargetUser(): User {
        return this.targetUser;
    }

    set setTargetUser(targetUser: User) {
        this.targetUser = targetUser;
    }

    get getReviewer(): User {
        return this.reviewer;
    }

    set setReviewer(reviewer: User) {
        this.reviewer = reviewer;
    }

    get getReservation(): Reservation {
        return this.reservation;
    }

    set setReservation(reservation: Reservation) {
        this.reservation = reservation;
    }

    get getImage(): string {
        return this.image;
    }

    get getStarAmount(): number {
        return this.starAmount;
    }

    get getReviewText(): string {
        return this.reviewText;
    }

    get getDateOfReview(): Moment {
        return this.dateOfReview;
    }

    set setDateOfReview(dateOfReview: Moment) {
        this.dateOfReview = dateOfReview;
    }
}
