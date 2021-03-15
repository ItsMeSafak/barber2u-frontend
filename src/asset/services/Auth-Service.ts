import { User } from "../../models/User";

const API_URL = "http://localhost:8080/api/auth/signin";

// The sign in function created in Auth-Service.ts
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

export const logout = () => {
    localStorage.removeItem("user");
};

export const authHeader = () => {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { "x-access-token": user.accessToken };
    }
    return {};
};

export const getCurrentUser = () =>
    JSON.parse(<string>localStorage.getItem("user"));
