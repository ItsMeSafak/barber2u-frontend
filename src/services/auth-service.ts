import axios from "axios";

import { RESPONSE_OK } from "../assets/constants";

interface APIAuthResponse {
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
    message: string;
    status: number;
    success: boolean;
}

/**
 * This function handles the login API request.
 *
 * @param {string} email The user email input.
 * @param {string} password The user password input.
 * @returns {Promise<APIAuthResponse>}
 */
export const signIn = (
    email: string,
    password: string
): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) =>
        axios
            .post("auth/signin", {
                email,
                password,
            })
            .then(
                (response) => {
                    if (response.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while trying to call 'signIn'..."
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
 * @returns {Promise<APIAuthResponse>}
 */
export const signUp = (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    zipCode: string;
    address: string;
    phoneNumber: string;
}): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) =>
        axios
            .post("auth/signup/customer", {
                ...formValues,
            })
            .then(
                (response) => {
                    if (response.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while trying to call 'signUp'..."
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
 * @returns {Promise<APIAuthResponse>}
 */
export const signUpBarber = (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    zipCode: string;
    address: string;
    phoneNumber: string;
    kvk: string;
    btwNumber: string;
    style: string;
    description: string;
    price: number;
    time: string;
}): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) =>
        axios
            .post("auth/signup/barber", {
                ...formValues,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while trying to call 'signUp'..."
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
 * @returns { Promise<APIAuthResponse>}
 */
export const fetchProfile = (): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) =>
        axios.get("/auth/profile").then(
            (response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            "Something went wrong while trying to call 'fetchProfile'..."
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
 * @returns { Promise<APIAuthResponse>}
 */
export const resetPasswordMail = (email: string): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) => {
        axios.post("/auth/reset/password/mail", email).then(
            (response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            "Something went wrong while trying to call 'resetPasswordMail'..."
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
 */
export const resetPassword = (
    password: string,
    token: string
): Promise<APIAuthResponse> =>
    new Promise<APIAuthResponse>((resolve, reject) => {
        axios.put("/auth/reset/password",{
            password,
            token
        }).then(
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
