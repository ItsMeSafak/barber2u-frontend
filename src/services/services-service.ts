import axios from "axios";

import APIResponse from "../models/APIResponse";
import Service from "../models/Service";

const API_URL = "http://localhost:8080/api/services";

const AUTH_HEADER = "Authorization";

/**
 * This function fetches the services.
 *
 * @param {string} barber email of the barber.
 * @returns {Promise<APIResponse>}
 */
export const getAllServices = (
    token: string | null,
    barber?: string
): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .post(`${API_URL}/getAll`, {
                barber,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while fetching the services..."
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
 * This function creates a new service for the given barber/
 * @param {string} token token we received when logged in 
 * @param {Service} service service created
 * @param {string} barber barber email 
 * @returns {Promise<APIResponse>}
 */
export const createNewService = (
    token: string | null,
    service?: Service,
    barber?: string
): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .post(`${API_URL}/create`, service)
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while creating a service..."
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });
