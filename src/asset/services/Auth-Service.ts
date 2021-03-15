import { User } from "../../models/User";

const API_URL = "http://localhost:8080/api/auth/signin";

/**
 * This service file is responsible for every auth related function.
 *
 */

/**
 * This functions does the sign in request to the backend.
 *
 * @param User Object
 * @returns JSON response with JWT, data and response code
 */
export const signIn = async (user: User) => {
    let response: Response | null = null;
    try {
        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.getEmail,
                password: user.getPassword,
            }),
        });
    } catch (error) {
        console.log("LOL");
    }
    return response?.json();
};

/**
 * This function removes the user from the localstorage the moment he logged out
 */
export const logout = () => {
    localStorage.removeItem("user");
};

/**
 * This function is used for authenticating when trying to reach the backend.
 * You might need your jwt token for some functions in the backend.
 */
export const authHeader = () => {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { "x-access-token": user.accessToken };
    }
    return {};
};

/**
 * This function is responsible for retrieving the user from the localstorage.
 */
export const getCurrentUser = () =>
    JSON.parse(<string>localStorage.getItem("user"));
