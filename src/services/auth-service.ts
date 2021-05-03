import axios from "axios";

import IHttpResponse from "./http-response";

import { RESPONSE_OK } from "../assets/constants";
import { getHttpErrorMessage } from "../assets/functions/error";

const BASE_URL = "/auth";

interface IAuthResponse extends IHttpResponse {
    data: {
        roles: Array<string>;
        token: string;
        type: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            address: string;
            zipCode: string;
            roles: Array<{ id: string; name: string }>;
            isActive: boolean;
            isVerified: boolean;
        };
    };
}

/**
 * This function handles the login API request.
 *
 * @param {string} email The user email input.
 * @param {string} password The user password input.
 * @returns {Promise<IAuthResponse>}
 */
export const signIn = (
    email: string,
    password: string
): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) =>
        axios
            .post(`${BASE_URL}/signin`, {
                email,
                password,
            })
            .then(
                (response) => {
                    if (response.data.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    signIn.name,
                                    response.config.url
                                )
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            )
    );

/**
 * This function handles the register API request.
 *
 * @param {Object} formValues The register form values.
 * @returns {Promise<IAuthResponse>}
 */
export const signUp = (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    zipCode: string;
    address: string;
    phoneNumber: string;
}): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) =>
        axios
            .post(`${BASE_URL}/signup/customer`, {
                ...formValues,
            })
            .then(
                (response) => {
                    if (response.data.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    signUp.name,
                                    response.config.url
                                )
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            )
    );

/**
 * This function handles the barber register API request
 *
 * @param {Object} formValues The register form values.
 * @returns {Promise<IAuthResponse>}
 */
export const signUpBarber = (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    zipCode: string;
    address: string;
    phoneNumber: string;
    kvkNumber: string;
    btwVatNumber: string;
    radius: string;
    time: string;
}): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) =>
        axios
            .post(`${BASE_URL}/signup/barber`, {
                ...formValues,
            })
            .then(
                (response) => {
                    if (response.data.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    signUpBarber.name,
                                    response.config.url
                                )
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            )
    );

/**
 * This function retrieves the current logged in user profile details.
 *
 * @returns {Promise<IAuthResponse>}
 */
export const fetchProfile = (): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) =>
        axios.get(`${BASE_URL}/profile`).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                fetchProfile.name,
                                response.config.url
                            )
                        )
                    );
                }
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function sends a request to the backend, that sends a mail to the given mail of this function, containing a token regarding resetting the password.
 *
 * @param {string} email given email of the user input
 * @returns {Promise<IAuthResponse>}
 */
export const resetPasswordMail = (email: string): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios.post(`${BASE_URL}/reset/password/mail`, email).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                resetPasswordMail.name,
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

/**
 * This functions sends put request to the backend, to reset the user password
 *
 * @param {string} password the user password
 * @param {string} token the token that belongs to the user
 * @returns {Promise<IAuthResponse>}
 */
export const resetPassword = (
    password: string,
    token: string
): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios
            .put("/auth/reset/password", {
                password,
                token,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while trying to call 'resetPassword'..."
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });
