import axios from "axios";

import Service2 from "../models/Service2";
import MomentRange from "../models/MomentRange";
import { DATE_FORMAT, TIME_FORMAT } from "../assets/constants";

/**
 * HTTP status code for success
 */
const HTTP_SUCCESS_CODE = 200;

/**
 * API url for fetching reservation data from Barber
 */
const API_URL_RESERVATION = "http://localhost:8080/api/reservation";

/**
 * Error message for failing to get barber listing data
 */
const ERROR_MESSAGE = "Something went wrong with creating your reservation";

/**
 * Response interface for the Barber items
 */
interface APICreateReservationResponse {
    message: string;
    status: number;
    success: boolean;
}

/**
 * Create a reservation
 * @param barberEmail Email from whom you want to make a reservation with
 * @param services List of selected services
 * @param date Date range of the start and end time
 */
export const sendCreateReservation = (
    barberEmail: string,
    services: Service2[],
    date: MomentRange
): Promise<APICreateReservationResponse> =>
    new Promise<APICreateReservationResponse>((resolve, reject) => {
        axios
            .post(`${API_URL_RESERVATION}/create`, {
                barber: barberEmail,
                services: services.map((service) => service.name),
                date: date.startTime.format(DATE_FORMAT),
                startTime: date.startTime.format(TIME_FORMAT),
                endTime: date.endTime.format(TIME_FORMAT),
            })
            .then(
                (response) => {
                    if (response.status === HTTP_SUCCESS_CODE) {
                        resolve(response.data);
                    } else reject(new Error(ERROR_MESSAGE));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });
