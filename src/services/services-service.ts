import axios from "axios";

import Service from "../models/Service";
import APIResponse from "../models/APIResponse";

const AUTH_HEADER = "Authorization";
const API_URL = "http://localhost:8080/api/services";

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
    service?: Service
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

/**
* This function deletes a service based on the id given.
* @param {string} token token we received when logged in 
* @param {string} id service id
* @returns {Promise<APIResponse>}
*/
export const deleteService = (
    token: string | null,
    id?: string
): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .delete(`${API_URL}/delete/${id}`)
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while deleting a service..."
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
* This function updates a service.
* @param {string} token token we received when logged in 
* @param {Service} service given service to be updated
* @returns {Promise<APIResponse>}
*/
export const updateService = (
    token: string | null,
    service?: Service
): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .post(`${API_URL}/update`, service
            )
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                "Something went wrong while updating a service..."
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

