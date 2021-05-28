import moment, { Moment } from "moment";
import User from "./User";

/**
 * The review model is a model that consists of data regarding reviewing a barber or a customer.
 */
export default class Review {
    private id: string;
    private reviewer: User;
    private image: string;
    private starAmount: number;
    private reviewText: string;
    private dateOfReview: Moment;

    constructor(
        id: string,
        reviewer: User,
        image: string,
        starAmount: number,
        reviewText: string,
        dateOfReview: moment.Moment
    ) {
        this.id = id;
        this.reviewer = reviewer;
        this.image = image;
        this.starAmount = starAmount;
        this.reviewText = reviewText;
        this.dateOfReview = dateOfReview;
    }

    get getId(): string {
        return this.id;
    }

    get getReviewer(): User {
        return this.reviewer;
    }

    set setReviewer(reviewer: User) {
        this.reviewer = reviewer;
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
