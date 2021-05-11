import axios from "axios";

import IHttpResponse from "./http-response";

import Reservation from "../models/Reservation";
import User from "../models/User";

const API_URL = "/reservation";

interface IReservationResponse extends IHttpResponse {
    data: Reservation[];
}

/**
 * This function fetches the reservations.
 *
 * @returns {Promise<IReservationResponse>}
 */
export const getReservations = (reservationStatus: string | null): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios.get(`${API_URL}`, { params: { status: reservationStatus } }).then(
            (response) => {
                if (response) resolve(fixUserObject(response.data));
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function updates the reservation status.
 *
 * @returns {Promise<IReservationResponse>}
 */
export const updateReservationStatus = (
    reservationId: string,
    reservationStatus: string
): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios
            .put(`${API_URL}/status`, {
                id: reservationId,
                status: reservationStatus,
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
const fixUserObject = (response: IReservationResponse) => {
    response.data.forEach((value, index) => {
        response.data[index].customer = Object.setPrototypeOf(
            value.customer,
            User.prototype
        );
        response.data[index].barber = Object.setPrototypeOf(
            value.barber,
            User.prototype
        );
    });
    return response;
};
