import axios from "axios";

import moment from "moment";
import IHttpResponse from "./http-response";

import Review from "../models/Review";
import User from "../models/User";

const API_URL = "/review";

interface IReviewResponse extends IHttpResponse {
    data: Review[];
}

// TODO write JsDoc

/**
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
 * This function updates the reservation status.
 *
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

// eslint-disable-next-line require-jsdoc
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
