import axios from "axios";

import User from "../models/User";
import Reservation from "../models/Reservation";
import IHttpResponse from "./http-response";

const API_URL = "/reservation";

interface IReservationResponse extends IHttpResponse {
    data: Reservation[];
}

/**
 * This function fetches the reservations.
 *
 * @param {string | null} reservationStatus The status of the reservation.
 * @returns {Promise<IReservationResponse>}
 */
/**
 *
 * @param reservationStatus
 * @returns
 */
export const getReservations = (
    reservationStatus: string | null
): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios.get(API_URL, { params: { status: reservationStatus } }).then(
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

/**
 * This function is used to cast data to the right class.
 *
 * @param {IReservationResponse} response Reservation response
 * @returns {Array}
 */
const fixUserObject = (response: IReservationResponse) => {
    response.data.forEach((value, index) => {
        const reservationValue = Object.setPrototypeOf(
            value,
            Reservation.prototype
        );
        response.data[index].setCustomer = Object.setPrototypeOf(
            reservationValue.getCustomer,
            User.prototype
        );
        response.data[index].setBarber = Object.setPrototypeOf(
            reservationValue.getBarber,
            User.prototype
        );
    });
    return response;
};
