import axios from "axios";

import IHttpResponse from "./http-response";

import User from "../models/User";
import UserProfile from "../models/UserProfile";

const API_URL = "/auth/profile";

interface IUserResponse extends IHttpResponse {
    data: User;
}

/**
 * This function updates the user profile
 *
 * @param user {User}   The updated user object
 */
export const updateUserProfile = (user: UserProfile): Promise<IUserResponse> =>
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
