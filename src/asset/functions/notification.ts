import { notification } from "antd";
import { IconType } from "antd/lib/notification";

/**
 * This function shows the notification with given properties.
 *
 * @param {string} message The title of the notification.
 * @param {string} description The description of the notification.
 * @param {number | undefined} httpStatus The HTTP status code that has to be shown.
 * @param {string | undefined} notificationType The notification type.
 */
export const showNotification = (
    message: string,
    description: string,
    httpStatus?: number,
    notificationType?: string
): void => {
    const modifiedMessage = httpStatus
        ? `[${httpStatus}] - ${message}`
        : message;
    const modifiedHttpStatusType =
        httpStatus && retrieveTypeFromHttpCode(httpStatus);

    const notificationObject = {
        type:
            modifiedHttpStatusType || (notificationType as IconType) || "info",
        message: modifiedMessage,
        description,
    };

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
