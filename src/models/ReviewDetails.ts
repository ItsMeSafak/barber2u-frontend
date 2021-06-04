import Review from "./Review";

/**
 * The review details model is a model that consists of data regarding
 * reviews received from- and written to the current user
 */
export default class ReviewDetails {
    private received: Review[];
    private written: Review[];

    constructor(received: Review[], written: Review[]) {
        this.received = received;
        this.written = written;
    }

    get getReceivedReviews(): Review[] {
        return this.received;
    }

    get getWrittenReviews(): Review[] {
        return this.written;
    }

    set setReceivedReviews(reviews: Review[]) {
        this.received = reviews;
    }

    set setWrittenReviews(reviews: Review[]) {
        this.written = reviews;
    }
}
