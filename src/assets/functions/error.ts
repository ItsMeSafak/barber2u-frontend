import { ERROR_STATUSES } from "../constants";

/**
 * This function returns an error status object depending on the given error code.
 *
 * @param {number} errorCode The code of the error to be shown.
 * @returns {Object | undefined}
 */
export const getErrorStatus: (
    errorCode: number
) =>
    | {
          code: number;
          message: string;
          description: string;
          color: string;
          iconPrefix: string;
          iconName: string;
      }
    | undefined = (errorCode: number) =>
    ERROR_STATUSES.find((error) => error.code === errorCode);
