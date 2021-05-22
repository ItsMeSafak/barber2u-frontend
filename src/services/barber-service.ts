import axios from "axios";

import User from "../models/User";

import IHttpResponse from "./http-response";

const BASE_URL = "/barbers";

interface IUserResponse extends IHttpResponse {
    data: User;
}

/**
 * This function fetches the barber profile
 *
 * @param {string} barberEmail the email of the barber to be fetched.
 */
export const getBarber = (barberEmail?: string): Promise<IUserResponse> =>
    new Promise<IUserResponse>((resolve, reject) => {
        axios.get(`${BASE_URL}/${barberEmail}`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

