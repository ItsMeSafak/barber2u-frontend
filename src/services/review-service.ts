import axios from "axios";

import moment from "moment";
import IHttpResponse from "./http-response";

import Review from "../models/Review";
import User from "../models/User";

const API_URL = "/review";

/**
 * Interface for the review responses
 */
interface IReviewResponse extends IHttpResponse {
    data: Review[];
}

/**
 * Fetch all the reviews of the user from the server
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
        response.data.forEach((value, index) => {
            response.data[index].dateOfReview = moment(
                response.data[index].dateOfReview
            );
            response.data[index].reviewer = Object.setPrototypeOf(
                response.data[index].reviewer,
                User.prototype
            );
        });
    }
    return response;
};
