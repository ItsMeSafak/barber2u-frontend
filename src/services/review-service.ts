import axios from "axios";

import IHttpResponse from "./http-response";

import Review from "../models/Review";

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
                if (response) resolve(response.data);
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
