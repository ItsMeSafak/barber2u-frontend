import axios from "axios";

import { RESPONSE_OK } from "../assets/constants";
import { getHttpErrorMessage } from "../assets/functions/error";

const BASE_URL = "/actuator";

interface ComponentDetails {
    status: string;
    details?: Record<string, number>;
}

interface IActuatorResponse {
    status: string;
    components: {
        diskSpace: ComponentDetails,
        mail: ComponentDetails,
        mongo: ComponentDetails,
        ping: ComponentDetails
    };
}

/**
 * TODO...
 * @returns {Promise<IActuatorResponse>}
 */
export const getHealthStatus = (): Promise<IActuatorResponse> =>
    new Promise<IActuatorResponse>((resolve, reject) =>
        axios
            .get(`${BASE_URL}/health`)
            .then(
                (response) => {
                    if (response.request.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    getHealthStatus.name,
                                    response.config.url
                                )
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            )
    );

/**
 * TODO...
 * @returns {Promise<IActuatorResponse>}
 */
export const shutdownAPIServer = (): Promise<{ message: string }> =>
    new Promise<{ message: string }>((resolve, reject) =>
        axios
            .post(`${BASE_URL}/shutdown`)
            .then(
                (response) => {
                    if (response.request.status === RESPONSE_OK) {
                        resolve(response.data);
                    } else {
                        reject(
                            new Error(
                                getHttpErrorMessage(
                                    getHealthStatus.name,
                                    response.config.url
                                )
                            )
                        );
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                }
            )
    );