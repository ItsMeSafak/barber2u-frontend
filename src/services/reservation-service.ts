import axios from "axios";

import Service from "../models/Service";
import MomentRange from "../models/MomentRange";

import { DATE_FORMAT, TIME_FORMAT } from "../assets/constants";

/**
 * Response interface for the Barber items
 */
interface APICreateReservationResponse {
    message: string;
    status: number;
    success: boolean;
}

/**
 * This function sends a request to the servers, creating a new reservation
 * based token from the user, the email from the barber, a list of services
 * and the timeslot of the reservation.
 *
 * @param barberEmail Email from whom you want to make a reservation with
 * @param services List of selected services
 * @param date Date range of the start and end time
 * @return {APICreateReservationResponse | Error} the response object or an error message
 */
export const sendCreateReservation = (
    barberEmail: string,
    services: Service[],
    date: MomentRange
): Promise<APICreateReservationResponse> =>
    new Promise<APICreateReservationResponse>((resolve, reject) => {
        axios
            .post("/reservation/create", {
                barber: barberEmail,
                services: services.map((service) => service.id),
                date: date.startTime.format(DATE_FORMAT),
                startTime: date.startTime.format(TIME_FORMAT),
                endTime: date.endTime.format(TIME_FORMAT),
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else
                        reject(
                            new Error(
                                "Something went wrong with creating your reservation"
                            )
                        );
                },
                (error) => {
                    reject(new Error(error.message));
                }
            );
    });
