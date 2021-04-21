import axios from "axios";

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
                    if (response.status === 200) {
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
 * TODO...
 * @returns
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
