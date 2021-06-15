import axios from "axios";

import User from "../models/User";
import Reservation from "../models/Reservation";
import IHttpResponse from "./http-response";

const BASE_URL = "/admin";

interface ICustomersResponse extends IHttpResponse {
    data: Array<User>;
}

interface IBarbersResponse extends IHttpResponse {
    data: Array<{
        id: string;
        companyName: string;
        kvkNumber: string;
        roles: Array<string>;
        btwVatNumber: string;
        workRadius: number;
        user: User;
    }>;
}

interface IReservationsResponse extends IHttpResponse {
    data: Array<Reservation>;
}

/**
 * This function retrieves all customers.
 *
 * @returns {Promise<ICustomersResponse>}
 */
export const getCustomers = (): Promise<ICustomersResponse> =>
    new Promise<ICustomersResponse>((resolve, reject) =>
        axios.get(`${BASE_URL}/customers`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function retrieves all barbers.
 *
 * @returns {Promise<IBarbersResponse>}
 */
export const getBarbers = (): Promise<IBarbersResponse> =>
    new Promise<IBarbersResponse>((resolve, reject) =>
        axios.get(`${BASE_URL}/barbers`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function retrieves all reservations.
 *
 * @returns {Promise<IReservationsResponse>}
 */
export const getReservations = (): Promise<IReservationsResponse> =>
    new Promise<IReservationsResponse>((resolve, reject) =>
        axios.get(`${BASE_URL}/reservations`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function enables the user.
 *
 * @param {string} userId The id of the user.
 * @returns {Promise<IHttpResponse>}
 */
export const enableUser = (userId: string): Promise<IHttpResponse> =>
    new Promise<IReservationsResponse>((resolve, reject) =>
        axios.put(`${BASE_URL}/users/${userId}/enable`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function disables the user.
 *
 * @param {string} userId The id of the user.
 * @returns {Promise<IHttpResponse>}
 */
export const disableUser = (userId: string): Promise<IHttpResponse> =>
    new Promise<IReservationsResponse>((resolve, reject) =>
        axios.put(`${BASE_URL}/users/${userId}/disable`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );
