import axios from "axios";

import Service2 from "../models/Service2";
import MomentRange from "../models/MomentRange";

import {
    BASE_URL,
    DATE_FORMAT,
    TIME_FORMAT,
    HTTP_STATUS_SUCCESS_CODE,
    CREATE_RESERVATION_ERROR_MESSAGE,
} from "../assets/constants";

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
            .post(`${BASE_URL}/reservation`, {
                barber: barberEmail,
                services: services.map((service) => service.name),
                date: date.startTime.format(DATE_FORMAT),
                startTime: date.startTime.format(TIME_FORMAT),
                endTime: date.endTime.format(TIME_FORMAT),
            })
            .then(
                (response) => {
                    if (response.status === HTTP_STATUS_SUCCESS_CODE) {
                        resolve(response.data);
                    } else reject(new Error(CREATE_RESERVATION_ERROR_MESSAGE));
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });
