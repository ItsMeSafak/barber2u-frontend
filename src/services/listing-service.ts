import axios from "axios";

import moment, { Moment } from "moment";

import User from "../models/User";
import Barber from "../models/Barber";
import Service from "../models/Service";
import MomentRange from "../models/MomentRange";

import { DATE_FORMAT, RESPONSE_OK } from "../assets/constants";

/**
 * Response interface for the Barber items
 */
interface APIBarbersResponse {
    data: Barber[];
    message: string;
    status: number;
    success: boolean;
}

/**
 * Response interface for the Barber listings
 */
interface APIBarberListingResponse {
    data: {
        barber: Barber;
        services: Service[];
    };
    message: string;
    status: number;
    success: boolean;
}

/**
 * Response interface for the Barber availability
 */
interface APIBarberAvailabilityResponse {
    data: MomentRange[];
    message: string;
    status: number;
    success: boolean;
}

/**
 * Response interface for the Barber workdays
 */
interface APIBarberWorkdaysResponse {
    data: Moment[];
    message: string;
    status: number;
    success: boolean;
}

/**
 * This function sends a request to the servers, requesting the
 * user data of the barber.
 *
 * @return {APIBarbersResponse | Error} the response object or an error message
 */
export const fetchBarbers = (): Promise<APIBarbersResponse> =>
    new Promise<APIBarbersResponse>((resolve, reject) => {
        axios.post("/barbers").then(
            (response) => {
                if (response.status === RESPONSE_OK) {
                    resolve(fixBarberObject(response.data));
                } else
                    reject(
                        new Error(
                            "Something went wrong with retrieving the barber data"
                        )
                    );
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function sends a request to the server, requesting the
 * listing data of a single barber, based on the provided email.
 *
 * @param email {string} email of the barber
 * @return {APIBarberListingResponse | Error} the response object or an error message
 */
export const fetchBarberListing = (
    email: string
): Promise<APIBarberListingResponse> =>
    new Promise<APIBarberListingResponse>((resolve, reject) => {
        axios.post(`/barbers/${email}/listing`).then(
            (response) => {
                if (response.status === RESPONSE_OK)
                    resolve(fixBarberListingObject(response.data));
                else
                    reject(
                        new Error(
                            "Something went wrong with retrieving the barber listing data"
                        )
                    );
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * This function sends a request to the server, requesting the
 * availability of a single barber, based on their email. The
 * timeslots of the availability is based on the duration of a
 * single timeslot and the date that the barber is available.
 *
 * @param email {string} email address from barber
 * @param duration {number} required duration of the availability
 * @param date {string} the date of the availability format(YYYY-MM-DD)
 * @return {APIBarberAvailabilityResponse | Error} the response object or an error message
 */
export const fetchBarberAvailability = (
    email: string,
    duration: number,
    date: string
): Promise<APIBarberAvailabilityResponse> =>
    new Promise<APIBarberAvailabilityResponse>((resolve, reject) => {
        axios
            .get(
                `/reservation/availability?barberEmail=${email}&duration=${duration}&dateString=${date}`
            )
            .then(
                (response) => {
                    if (response.status === RESPONSE_OK) {
                        resolve(fixBarberAvailabilityObject(response.data));
                    } else
                        reject(
                            new Error(
                                "Something went wrong with retrieving the barber availability data"
                            )
                        );
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * This function sends a request to the server, requesting the
 * available workdays of a single barber, based on their email. The
 * workdays of the availability is based on the duration of a
 * single timeslot, range of the timeslot in days and the date
 * that the barber is available.
 *
 * @param email {string} email address from barber
 * @param duration {number} required duration of the availability
 * @return {APIBarberAvailabilityResponse | Error} the response object or an error message
 */
export const fetchBarberWorkdays = (
    email: string,
    duration: number
): Promise<APIBarberWorkdaysResponse> =>
    new Promise<APIBarberWorkdaysResponse>((resolve, reject) => {
        axios
            .get(
                `/reservation/workdays?barberEmail=${email}&duration=${duration}`
            )
            .then(
                (response) => {
                    if (response.status === RESPONSE_OK) {
                        resolve(fixBarberWorkdaysObject(response.data));
                    } else
                        reject(
                            new Error(
                                "Something went wrong with retrieving the barber workdays data"
                            )
                        );
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * Cast the json response object properties to their own classes.
 *
 * @param response {APIBarbersResponse} response object interface
 * @return {APIBarbersResponse} casted object interface
 */
const fixBarberObject = (response: APIBarbersResponse) => {
    response.data.forEach((value, index) => {
        const barber: Barber = Barber.fromJSON(value);
        response.data[index] = barber;
        response.data[index].setUser = User.fromJSON(barber.getUser);
    });
    return response;
};

/**
 * Cast the json response object properties to their own classes.
 *
 * @param response response object interface
 * @return {APIBarbersResponse} casted object interface
 */
const fixBarberListingObject = (response: APIBarberListingResponse) => {
    response.data.barber = Barber.fromJSON(response.data.barber);
    response.data.services.forEach((value, index) => {
        response.data.services[index] = Object.setPrototypeOf(
            value,
            Service.prototype
        );
    });
    return response;
};

/**
 * Cast the json response object properties to their own classes.
 *
 * @param response response object interface
 * @return {APIBarbersResponse} casted object interface
 */
const fixBarberAvailabilityObject = (
    response: APIBarberAvailabilityResponse
) => {
    response.data.forEach((value, index) => {
        response.data[index] = new MomentRange(
            moment(response.data[index].startTime),
            moment(response.data[index].endTime)
        );
    });
    return response;
};

/**
 * Cast the json response object properties to their own classes.
 *
 * @param response response object interface
 * @return {APIBarbersResponse} casted object interface
 */
const fixBarberWorkdaysObject = (response: APIBarberWorkdaysResponse) => {
    response.data.forEach((value, index) => {
        response.data[index] = moment(
            response.data[index].toString(),
            DATE_FORMAT
        ).startOf("day");
    });
    return response;
};
