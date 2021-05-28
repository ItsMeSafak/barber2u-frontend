import axios from "axios";
import moment from "moment";

import User from "../models/User";
import Review from "../models/Review";
import IHttpResponse from "./http-response";

const API_URL = "/review";

/**
 * Interface for the review responses
 */
interface IReviewResponse extends IHttpResponse {
    data: Review[];
}

/**
 * Fetch all the reviews of the user from the server
 *
 * @returns {Promise<IReviewResponse>}
 */
export const fetchReviews = (): Promise<IReviewResponse> =>
    new Promise<IReviewResponse>((resolve, reject) => {
        axios.get(API_URL).then(
            (response) => {
                if (response) resolve(fixReviewObject(response.data));
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * Create/write a new review for the target user.
 *
 * @param {string} reservationId The id of the reservation of the review
 * @param {string} reviewText The review message
 * @param {number} starAmount The number value of the rating
 * @returns {Promise<IReviewResponse>}
 */
export const createReview = (
    reservationId: string,
    reviewText: string,
    starAmount: number
): Promise<IReviewResponse> =>
    new Promise<IReviewResponse>((resolve, reject) => {
        axios
            .post(`${API_URL}/write`, {
                reservationId,
                reviewText,
                starAmount,
            })
            .then(
                (response) => {
                    if (response) resolve(response.data);
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * Cast the server response attributes to their assigned models
 *
 * @param {IReviewResponse} response The response object received from the server
 * @return {IReviewResponse} The updated response object with the attributes assigned to their model
 */
const fixReviewObject = (response: IReviewResponse) => {
    if (response.data) {
        response.data.map((item, index) => {
            const reviewPrototype = Object.setPrototypeOf(
                item,
                Review.prototype
            );
            response.data[index].setDateOfReview = moment(
                reviewPrototype.getDateOfReview
            );
            response.data[index].setReviewer = Object.setPrototypeOf(
                reviewPrototype.getReviewer,
                User.prototype
            );
            return response.data[index];
        });
    }
    return response;
};
