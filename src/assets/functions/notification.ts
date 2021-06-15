import { IconType } from "antd/lib/notification";
import { notification } from "antd";

/**
 * This function shows the notification of a given http response.
 *
 * @param {string} description The description of the response.
 * @param {number} httpStatus The Http status code of the response.
 * @param {boolean | undefined} visible Whether the notification should be displayed or not.
 */
export const showHttpResponseNotification = (
    description: string,
    httpStatus: number,
    visible?: boolean
): void => {
    const modifiedType = retrieveTypeFromHttpCode(httpStatus) as IconType;
    const modifiedMessageStatus =
        httpStatus >= 200 && httpStatus < 300 ? "Success" : "Error";
    const modifiedMessage = `[${httpStatus}] - ${modifiedMessageStatus}`;

    const notificationObject = {
        type: modifiedType,
        message: modifiedMessage,
        description,
    };

    // if the "visible" argument is not given, set default value on true.
    const visibility = visible ?? true;

    if (visibility)
        notification.open({ ...notificationObject, placement: "bottomRight" });
};

/**
 * This function retrieves the correct notification type through the given HTTP code.
 *
 * @param {number} httpCode The number of the HTTP code.
 * @returns {string}
 */
const retrieveTypeFromHttpCode = (httpCode: number) => {
    if (httpCode >= 200 && httpCode < 300) return "success";
    if (httpCode >= 300 && httpCode < 400) return "info";
    if (httpCode >= 400 && httpCode < 500) return "warning";
    return "error";
};
