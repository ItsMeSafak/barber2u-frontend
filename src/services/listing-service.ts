import axios from "axios";

import moment from "moment";

import User from "../models/User";
import Barber from "../models/Barber";
import Service2 from "../models/Service2";
import MomentRange from "../models/MomentRange";

import {
    API_URL_BARBER,
    API_URL_RESERVATION_AVAILABILITY,
    API_URL_RESERVATION_AVAILABILITY_RANGE,
    BARBER_LISTING_ERROR_MESSAGE,
    HTTP_STATUS_SUCCESS_CODE,
} from "../assets/constants";

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
 */
export const fetchBarbers = (): Promise<APIBarbersResponse> =>
    new Promise<APIBarbersResponse>((resolve, reject) => {
        axios.post(`${API_URL_BARBER}`).then(
            (response) => {
                if (response.status === HTTP_STATUS_SUCCESS_CODE) {
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
 * @param email email of the barber
 */
export const fetchBarberListing = (
    email: string
): Promise<APIBarberListingResponse> =>
    new Promise<APIBarberListingResponse>((resolve, reject) => {
        axios.post(`${API_URL_BARBER}/${email}/listing`).then(
            (response) => {
                if (response.status === HTTP_STATUS_SUCCESS_CODE)
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
 * @param email email address from barber
 * @param duration required duration of the availability
 * @param date the date of the availability
 */
export const fetchBarberAvailability = (
    email: string,
    duration: number,
    date: string
): Promise<APIBarberAvailabilityResponse> =>
    new Promise<APIBarberAvailabilityResponse>((resolve, reject) => {
        axios
            .post(`${API_URL_RESERVATION_AVAILABILITY}`, {
                barber: email,
                duration,
                date,
            })
            .then(
                (response) => {
                    if (response.status === HTTP_STATUS_SUCCESS_CODE) {
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
 * @param email email address from barber
 * @param duration required duration of the availability
 * @param startDate start date of the range of the availabilities
 * @param endDate end date of the range of the availabilities
 */
export const fetchBarberAvailabilityRange = (
    email: string,
    duration: number,
    startDate: string,
    endDate: string
): Promise<APIBarberAvailabilityResponse> =>
    new Promise<APIBarberAvailabilityResponse>((resolve, reject) => {
        axios
            .post(`${API_URL_RESERVATION_AVAILABILITY_RANGE}`, {
                barber: email,
                duration,
                startDate,
                endDate,
            })
            .then(
                (response) => {
                    if (response.status === HTTP_STATUS_SUCCESS_CODE) {
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
