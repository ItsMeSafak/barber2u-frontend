import moment, { Moment } from "moment";

import User from "./User";

/**
 *
 */
export default class Reservation {
    id: string;
    reviewer: User;
    image: string;
    starAmount: number;
    reviewText: string;
    dateOfReview: Moment;

    // eslint-disable-next-line require-jsdoc
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
}
