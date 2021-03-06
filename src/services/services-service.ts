import axios from "axios";

import Service from "../models/Service";
import IHttpResponse from "./http-response";

const API_URL = "/services";

interface IServiceResponse extends IHttpResponse {
    data: Service[];
}

/**
 * This function fetches the services.
 *
 * @param {string} barber Email of the barber.
 * @returns {Promise<IServiceResponse>}
 */
export const getAllServices = (
    currentFilter: string | null
): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.get(API_URL, { params: { isActive: currentFilter } }).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function creates a new service for the given barber.
 *
 * @param {string} token Token we received when logged in.
 * @param {Service} service Service created.
 * @param {string} barber Barber email.
 * @returns {Promise<IServiceResponse>}
 */
export const createNewService = (service: Service): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.post(`${API_URL}/create`, service).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function deletes a service based on the id given.
 *
 * @param {string} token Token we received when logged in.
 * @param {string} id Service id.
 * @returns {Promise<IServiceResponse>}
 */
export const deleteService = (id: string): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.delete(`${API_URL}/delete/${id}`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function updates a service.
 *
 * @param {string} token Token we received when logged in.
 * @param {Service} service Given service to be updated.
 * @returns {Promise<IServiceResponse>}
 */
export const updateService = (service: Service): Promise<IServiceResponse> =>
    new Promise<IServiceResponse>((resolve, reject) => {
        axios.put(`${API_URL}/update/${service.getId}`, service).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });
