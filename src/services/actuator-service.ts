import axios from "axios";

const BASE_URL = "/actuator";

interface ComponentDetails {
    status: string;
    details?: Record<string, number>;
}

interface IActuatorResponse {
    status: string;
    components: {
        diskSpace: ComponentDetails;
        mail: ComponentDetails;
        mongo: ComponentDetails;
        ping: ComponentDetails;
    };
}

/**
 * This function retrieves the API statuses.
 *
 * @returns {Promise<IActuatorResponse>}
 */
export const getHealthStatus = (): Promise<IActuatorResponse> =>
    new Promise<IActuatorResponse>((resolve, reject) =>
        axios.get(`${BASE_URL}/health`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );

/**
 * This function shutdowns the API.
 *
 * @returns {Promise<IActuatorResponse>}
 */
export const shutdownAPIServer = (): Promise<{ message: string }> =>
    new Promise<{ message: string }>((resolve, reject) =>
        axios.post(`${BASE_URL}/shutdown`).then(
            (response) => {
                if (response) resolve(response.data);
            },
            (error) => {
                reject(new Error(error.message));
            }
        )
    );
