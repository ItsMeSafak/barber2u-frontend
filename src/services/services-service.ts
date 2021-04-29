import axios from "axios";

import Service from "../models/Service";

import IHttpResponse from "./http-response";

import { RESPONSE_OK } from "../assets/constants";
import { getHttpErrorMessage } from "../assets/functions/error";

const API_URL = "/services";

interface IServiceResponse extends IHttpResponse {
    data: Service[];
}

/**
 * This function fetches the services.
 *
 * @param {string} barber email of the barber.
 * @returns {Promise<IServiceResponse>}
 */
export const getAllServices = (barber?: string): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios
            .post(`${API_URL}/get`, {
                barber,
            })
            .then(
                (response) => {
                    if (response.data.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    getAllServices.name,
                                    response.config.url
                                )
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
 * This function creates a new service for the given barber.
 *
 * @param {string} token token we received when logged in
 * @param {Service} service service created
 * @param {string} barber barber email
 * @returns {Promise<IServiceResponse>}
 */
export const createNewService = (service: Service): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.post(`${API_URL}/create`, service).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                createNewService.name,
                                response.config.url
                            )
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
 * @returns {Promise<IServiceResponse>}
 */
export const deleteService = (id: string): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.delete(`${API_URL}/delete/${id}`).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                deleteService.name,
                                response.config.url
                            )
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
 * @returns {Promise<IServiceResponse>}
 */
export const updateService = (service: Service): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.put(`${API_URL}/update/${service.id}`, service).then(
            (response) => {
                if (response.data.status === RESPONSE_OK) {
                    resolve(response.data);
                } else {
                    reject(
                        new Error(
                            getHttpErrorMessage(
                                updateService.name,
                                response.config.url
                            )
                        )
                    );
                }
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });