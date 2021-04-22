import Service from "./Service";

/**
 * This class represents a generic API response consisting of data, a message, response status and if it was a success.
 * TODO: Make use of a generic object data type.
 */
export default class APIServiceResponse {
    data: Service[];
    message: string;
    status: number;
    success: boolean;

    // eslint-disable-next-line require-jsdoc
    constructor(
        data: Service[],
        message: string,
        status: number,
        success: boolean
    ) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.success = success;
    }
}
