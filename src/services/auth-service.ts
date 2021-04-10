import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

interface APIAuthResponse {
    data: {
        email: string;
        id: string;
        roles: Array<string>;
        token: string;
        type: string;
    };
    message: string;
    status: number;
    success: boolean;
}

/**
 * This function handles the login API request.
 * TODO: create Auth-interceptor (Mehmet)
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
            .post(`${API_URL}/signin`, {
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
            .post(`${API_URL}/signup`, {
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
 * This function is used for authenticating when trying to reach the backend.
 * You might need your jwt token for some functions in the backend.
 */
export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { "x-access-token": user.accessToken };
    }
    return {};
};
