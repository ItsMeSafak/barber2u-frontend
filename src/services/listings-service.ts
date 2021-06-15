import axios from "axios";
import Barber from "../models/Barber";

import User from "../models/User";
import IHttpResponse from "./http-response";

interface IBarberResponse extends IHttpResponse {
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

interface IBarberServicesResponse extends IHttpResponse {
    data: {
        barber: Barber;
        services: Array<{
            id: string;
            name: string;
            description: string;
            price: number;
            time: number;
            active?: boolean;
        }>;
    };
}

/**
 * This function is used to retrieve the barbers.
 *
 * @returns {Promise<IBarberResponse>}
 */
export const getBarbers = (): Promise<IBarberResponse> =>
    new Promise<IBarberResponse>((resolve, reject) => {
        axios.get("/barbers/listings").then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.messsage));
            }
        );
    });

/**
 * This function is used to retrieve the barber services.
 *
 * @returns {Promise<IBarberServicesResponse>}
 */
export const getBarberServices = (
    email: string
): Promise<IBarberServicesResponse> =>
    new Promise<IBarberServicesResponse>((resolve, reject) => {
        axios.get(`/barbers/${email}/listing`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.messsage));
            }
        );
    });
