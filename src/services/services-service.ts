import axios from "axios";

import { RESPONSE_OK } from "../assets/constants";

import Service from "../models/Service";

const API_URL = "/services";

interface APIServiceResponse {
    data: Service[];
    message: string;
    status: number;
    success: boolean;
}

/**
 * This function fetches the services.
 *
 * @param {string} barber email of the barber.
 * @returns {Promise<APIServiceResponse>}
 */
export const getAllServices = (barber?: string): Promise<APIServiceResponse> =>
    new Promise<APIServiceResponse>((resolve, reject) => {
        axios
            .post(`${API_URL}/get`, {
                barber
            })
            .then(
                (response) => {
                    if (response.status === RESPONSE_OK) {
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
 * @returns {Promise<APIServiceResponse>}
 */
export const createNewService = (service: Service): Promise<APIServiceResponse> =>
    new Promise<APIServiceResponse>((resolve, reject) => {
        axios.post(`${API_URL}/create`, service).then(
            (response) => {
                if (response.status === RESPONSE_OK) {
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
 * @returns {Promise<APIServiceResponse>}
 */
export const deleteService = (id: string): Promise<APIServiceResponse> =>
    new Promise<APIServiceResponse>((resolve, reject) => {
        axios.delete(`${API_URL}/delete/${id}`).then(
            (response) => {
                if (response.status === RESPONSE_OK) {
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
 * @returns {Promise<APIServiceResponse>}
 */
export const updateService = (service: Service): Promise<APIServiceResponse> =>
    new Promise<APIServiceResponse>((resolve, reject) => {
        axios.put(`${API_URL}/update/${service.id}`, service).then(
            (response) => {
                if (response.status === RESPONSE_OK) {
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
