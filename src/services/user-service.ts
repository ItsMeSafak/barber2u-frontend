import axios from "axios";

import User from "../models/User";
import IHttpResponse from "./http-response";

const API_URL = "/auth/profile";

interface IUserResponse extends IHttpResponse {
    data: User;
}

/**
 * This function updates the user profile
 *
 * @param {User} user The updated user object.
 * @returns {Promise<IUserResponse>}
 */
export const updateUserProfile = (user: User): Promise<IUserResponse> =>
    new Promise<IUserResponse>((resolve, reject) => {
        axios.put(`${API_URL}`, user).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });
