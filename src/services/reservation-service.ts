import axios from "axios";

import IHttpResponse from "./http-response";

import { RESPONSE_OK } from "../assets/constants";
import { getHttpErrorMessage } from "../assets/functions/error";

import Appointment from "../models/Appointment";
import User from "../models/User";

const API_URL = "/reservation";

interface IReservationResponse extends IHttpResponse {
    data: Appointment[];
}

/**
 * This function fetches the services.
 *
 * @returns {Promise<IReservationResponse>}
 */
export const getCustomerReservations = (): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios.get(`${API_URL}/user`).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(fixUserObject(response.data));
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                response.data.name,
                                response.config.url
                            )
                        )
                    );
                }
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

// eslint-disable-next-line require-jsdoc
const fixUserObject = (response: IReservationResponse) => {
    response.data.forEach((value, index) => {
        response.data[index].customer = User.fromJSON(value.customer);
        response.data[index].barber = User.fromJSON(value.barber);
    });
    return response;
};
