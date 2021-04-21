import axios from "axios";

import Service from "../models/Service";
import APIResponse from "../models/APIResponse";

const API_URL = "/services";

/**
 * This function fetches the services.
 *
 * @param {string} barber email of the barber.
 * @returns {Promise<APIResponse>}
 */
export const getAllServices = (barber?: string): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
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
export const createNewService = (service?: Service): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.post(`${API_URL}/create`, service).then(
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
export const deleteService = (id?: string): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.delete(`${API_URL}/delete/${id}`).then(
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
export const updateService = (service?: Service): Promise<APIResponse> =>
    new Promise<APIResponse>((resolve, reject) => {
        axios.post(`${API_URL}/update`, service).then(
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
