import axios from "axios";

import moment from "moment";

import User from "../models/User";
import Barber from "../models/Barber";
import Service2 from "../models/Service2";
import MomentRange from "../models/MomentRange";

/**
 * HTTP status code for success
 */
const HTTP_SUCCESS_CODE = 200;

/**
 * Authentication header for HTTP request
 */
const AUTH_HEADER = "Authorization";

/**
 * API url for fetching Barber related data
 */
const API_URL_BARBER = "http://localhost:8080/api/barbers";

/**
 * API url for fetching reservation data from Barber
 */
const API_URL_RESERVATION = "http://localhost:8080/api/reservation";

/**
 * Error message for failing to get barber listing data
 */
const BARBER_LISTING_ERROR_MESSAGE =
    "Something went wrong with retrieving the barber listing data";

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
        services: Service2[];
    };
    message: string;
    status: number;
    success: boolean;
}

interface APIBarberAvailabilityResponse {
    data: MomentRange[];
    message: string;
    status: number;
    success: boolean;
}

/**
 * Fetch all the Barber data from the API
 * @param token
 */
export const fetchBarbers = (token: string): Promise<APIBarbersResponse> =>
    new Promise<APIBarbersResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios.post(`${API_URL_BARBER}`).then(
            (response) => {
                if (response.status === HTTP_SUCCESS_CODE) {
                    resolve(fixBarberObject(response.data));
                } else reject(new Error(BARBER_LISTING_ERROR_MESSAGE));
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * Fetch all the listing data from a barber from the API
 * @param token
 * @param email email of the barber
 */
export const fetchBarberListing = (
    token: string,
    email: string
): Promise<APIBarberListingResponse> =>
    new Promise<APIBarberListingResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios.post(`${API_URL_BARBER}/${email}/listing`).then(
            (response) => {
                if (response.status === HTTP_SUCCESS_CODE)
                    resolve(fixBarberListingObject(response.data));
                else reject(new Error(BARBER_LISTING_ERROR_MESSAGE));
            },
            (error) => {
                reject(new Error(error.message));
            }
        );
    });

/**
 * Fetch all the Barber availavility data from the API
 * @param token accessToken from user
 * @param email email address from barber
 * @param duration required duration of the availability
 * @param date the date of the availability
 */
export const fetchBarberAvailability = (
    token: string,
    email: string,
    duration: number,
    date: string
): Promise<APIBarberAvailabilityResponse> =>
    new Promise<APIBarberAvailabilityResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .post(`${API_URL_RESERVATION}/availability`, {
                barber: email,
                duration,
                date,
            })
            .then(
                (response) => {
                    if (response.status === HTTP_SUCCESS_CODE) {
                        resolve(fixBarberAvailabilityObject(response.data));
                    } else reject(new Error(BARBER_LISTING_ERROR_MESSAGE));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * Fetch all the Barber availavility data from the API
 * @param token accessToken from user
 * @param email email address from barber
 * @param duration required duration of the availability
 * @param startDate start date of the range of the availabilities
 * @param endDate end date of the range of the availabilities
 */
export const fetchBarberAvailabilityRange = (
    token: string,
    email: string,
    duration: number,
    startDate: string,
    endDate: string
): Promise<APIBarberAvailabilityResponse> =>
    new Promise<APIBarberAvailabilityResponse>((resolve, reject) => {
        axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
        axios
            .post(`${API_URL_RESERVATION}/availability/range`, {
                barber: email,
                duration,
                startDate,
                endDate,
            })
            .then(
                (response) => {
                    if (response.status === HTTP_SUCCESS_CODE) {
                        resolve(fixBarberAvailabilityObject(response.data));
                    } else reject(new Error(BARBER_LISTING_ERROR_MESSAGE));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });

/**
 * Cast the json response object properties to their own classes.
 * @param response response object interface
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
 * @param response response object interface
 */
const fixBarberListingObject = (response: APIBarberListingResponse) => {
    response.data.barber = Barber.fromJSON(response.data.barber);
    response.data.services.forEach((value, index) => {
        response.data.services[index] = Service2.fromJSON(value);
    });
    return response;
};

/**
 * Cast the json response object properties to their own classes.
 * @param response response object interface
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
