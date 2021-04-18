export default class APIResponse {
    data: object;
    message: string;
    status: number;
    success: boolean;

    constructor(
        data: object,
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
