import axios from "axios";

import User from "../models/User";
import IHttpResponse from "./http-response";

const BASE_URL = "/auth";

interface IAuthResponse extends IHttpResponse {
    data: {
        roles: Array<string>;
        token: string;
        refreshToken: string;
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
                    if (response) resolve(response.data);
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
                    if (response) resolve(response.data);
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
    companyName: string;
    zipCode: string;
    address: string;
    phoneNumber: string;
    kvkNumber: string;
    btwVatNumber: string;
}): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) =>
        axios
            .post(`${BASE_URL}/signup/barber`, {
                ...formValues,
            })
            .then(
                (response) => {
                    if (response) resolve(response.data);
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
                if (response) resolve(response.data);
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
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function sends a put request to the backend, to verify tge account.
 *
 * @param {string | null} userId userid from the url
 * @returns {Promise<IAuthResponse>}
 */
export const verifyEmail = (userId: string | null): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios.put(`${BASE_URL}/verify/email/${userId}`).then(
            (response) => {
                if (response) resolve(response.data);
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
            .put(`${BASE_URL}/reset/password`, {
                password,
                token,
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
 * This function re-sends an email to the user to verify their email address.
 *
 * @returns {Promise<IAuthResponse>}
 */
export const resendVerificationEmail = (): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios.get(`${BASE_URL}/verify/getemail`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function retrieves a new access token with a given valid refresh token and a valid or invalid access token which actually belongs to the user.
 * If these tokens do not belong to the user, the token will not be generated.
 *
 * @param {string} refreshToken The refresh token of the user.
 * @returns {Promise<IAuthResponse>}
 */
export const getNewAccessToken = (
    refreshToken: string
): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios.post(`${BASE_URL}/refreshtoken`, { refreshToken }).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function updates the user profile.
 *
 * @param {User} user user to be updated.
 * @returns {Promise<IAuthResponse>}
 */
export const updateUserProfile = (user: User): Promise<IAuthResponse> =>
    new Promise<IAuthResponse>((resolve, reject) => {
        axios.put(`${BASE_URL}/profile`, user).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });
