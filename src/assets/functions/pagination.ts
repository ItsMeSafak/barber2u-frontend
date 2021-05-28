/**
 * This function handles the pagination of the reservations.
 * The current max amount of reservation cards to be displayed are 6.
 *
 * @param {number} pageNumber The current page number we are on.
 */
export const handlePagination = (
    pageNumber: number,
    setMinIndexValue: (value: number) => void,
    setMaxIndexValue: (value: number) => void,
    maxItemsPerPage: number
): void => {
    setMaxIndexValue(maxItemsPerPage * pageNumber);
    setMinIndexValue(maxItemsPerPage * pageNumber - maxItemsPerPage);
};
