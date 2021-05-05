import axios from "axios";

import IHttpResponse from "./http-response";

import Reservation from "../models/Reservation";
import User from "../models/User";

const API_URL = "/reservation";

interface IReservationResponse extends IHttpResponse {
    data: Reservation[];
}

/**
 * This function fetches the services.
 *
 * @returns {Promise<IReservationResponse>}
 */
export const getReservations = (): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios.get(`${API_URL}/user`).then(
            (response) => {
                resolve(fixUserObject(response.data));
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