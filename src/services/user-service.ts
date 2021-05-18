import axios from "axios";

import IHttpResponse from "./http-response";

import User from "../models/User";

const API_URL = "/auth/profile";
const BARBER_API_URL = "/barbers";

interface IUserResponse extends IHttpResponse {
    data: User;
}

/**
 * This function fetches the barber profile
 *
 */
export const getBarber = (barberEmail?: string): Promise<IUserResponse> =>
    new Promise<IUserResponse>((resolve, reject) => {
        axios.get(`${BARBER_API_URL}/${barberEmail}`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function updates the user profile
 *
 * @param user {User}   The updated user object
 */
export const updateUserProfile = (user: User): Promise<IUserResponse> =>
    new Promise<IUserResponse>((resolve, reject) => {
        console.log(user);
        axios.put(`${API_URL}`, user).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });
