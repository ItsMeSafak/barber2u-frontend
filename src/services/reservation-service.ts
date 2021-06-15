import axios from "axios";
import moment, { Moment } from "moment";

import User from "../models/User";
import Service from "../models/Service";
import MomentRange from "../models/MomentRange";
import Reservation from "../models/Reservation";

import { DATE_FORMAT, TIME_FORMAT } from "../assets/constants";

import IHttpResponse from "./http-response";

const API_URL = "/reservation";

interface IReservationResponse extends IHttpResponse {
    data: Reservation[];
}

interface IAvailabilityResponse extends IHttpResponse {
    data: MomentRange[];
}

interface IWorkDaysResponse extends IHttpResponse {
    data: Moment[];
}

/**
 * This function fetches the reservations.
 *
 * @param {string | null} reservationStatus The status of the reservation.
 * @returns {Promise<IReservationResponse>}
 */
export const getReservations = (
    reservationStatus: string | null
): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios.get(API_URL, { params: { status: reservationStatus } }).then(
            (response) => {
                if (response) resolve(fixUserObject(response.data));
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 *  Get availability of a barber for reservations
 */
export const getBarberAvailability = (
    barberEmail: string,
    duration: number,
    dateString: string
): Promise<IAvailabilityResponse> =>
    new Promise<IAvailabilityResponse>((resolve, reject) => {
        axios
            .get(`${API_URL}/availability`, {
                params: {
                    barberEmail,
                    duration,
                    dateString,
                },
            })
            .then(
                (response) => {
                    if (response) resolve(fixAvailabilityObject(response.data));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * Get barber work days.
 *
 * @param {string} barberEmail The barber email.
 * @param {number} duration The duration.
 * @returns {Promise<IWorkDaysResponse>}
 */
export const getBarberWorkdays = (
    barberEmail: string,
    duration: number
): Promise<IWorkDaysResponse> =>
    new Promise<IWorkDaysResponse>((resolve, reject) => {
        axios
            .get(`${API_URL}/workdays`, {
                params: {
                    barberEmail,
                    duration,
                },
            })
            .then(
                (response) => {
                    if (response)
                        resolve(fixBarberWorkdaysObject(response.data));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * This function updates the reservation status.
 *
 * @returns {Promise<IReservationResponse>}
 */
export const updateReservationStatus = (
    reservationId: string,
    reservationStatus: string
): Promise<IReservationResponse> =>
    new Promise<IReservationResponse>((resolve, reject) => {
        axios
            .put(`${API_URL}/status`, {
                id: reservationId,
                status: reservationStatus,
            })
            .then(
                (response) => {
                    if (response) resolve(response.data);
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * This function creates a reservation.
 *
 * @param {string} barberEmail The barber email.
 * @param {Array<Service>} services The selected services.
 * @param {MomentRange} date The selected date
 * @returns {Promise<IHttpResponse>}
 */
export const createReservation = (
    barberEmail: string,
    services: Service[],
    date: MomentRange
): Promise<IHttpResponse> =>
    new Promise<IHttpResponse>((resolve, reject) => {
        axios
            .post(`${API_URL}/create`, {
                barberMail: barberEmail,
                serviceIds: services.map((service) => service.getId),
                date: date.startTime.format(DATE_FORMAT),
                startTime: date.startTime.format(TIME_FORMAT),
                endTime: date.endTime.format(TIME_FORMAT),
            })
            .then(
                (response) => {
                    if (response) resolve(response.data);
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * This function is used to cast data to the right class.
 *
 * @param {IReservationResponse} response Reservation response
 * @returns {Array}
 */
const fixUserObject = (response: IReservationResponse) => {
    response.data.forEach((value, index) => {
        const reservationValue = Object.setPrototypeOf(
            value,
            Reservation.prototype
        );
        response.data[index].setCustomer = Object.setPrototypeOf(
            reservationValue.getCustomer,
            User.prototype
        );
        response.data[index].setBarber = Object.setPrototypeOf(
            reservationValue.getBarber,
            User.prototype
        );
    });
    return response;
};

/**
 * This function fixes the availability object.
 *
 * @param {IAvailabilityResponse} response The availability response.
 * @returns {Array}
 */
const fixAvailabilityObject = (response: IAvailabilityResponse) => {
    response.data.forEach((value, index) => {
        response.data[index] = new MomentRange(
            moment(response.data[index].startTime),
            moment(response.data[index].endTime)
        );
    });
    return response;
};
/**
 * This function fixes the barber work days object.
 *
 * @param {IWorkDaysResponse} response The work days response.
 * @returns {Array}
 */
const fixBarberWorkdaysObject = (response: IWorkDaysResponse) => {
    response.data &&
        response.data.forEach((value, index) => {
            response.data[index] = moment(
                response.data[index].toString(),
                DATE_FORMAT
            ).startOf("day");
        });
    return response;
};
