/**
 * This interface is used to keep the API response as generic as possible.
 * To pass your own structure, pass the "data" key to the created interface and extend this interface.
 *
 * @example auth-service.ts
 * @see IAuthResponse
 */
export default interface IHttpResponse {
    message: string;
    status: number;
    success: boolean;
}
