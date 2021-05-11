import { MAX_ITEMS_PER_PAGE } from "../constants/index";

/**
* This function handles the pagination of the reservations.
* The current max amount of reservation cards to be displayed are 6.
*
* @param pageNumber the current page number we are on.
*/
export const handlePagination = (
    pageNumber: number,
    setMinIndexValue: (value: number) => void,
    setMaxIndexValue: (value: number) => void) => {

    setMaxIndexValue(MAX_ITEMS_PER_PAGE * pageNumber);
    setMinIndexValue(MAX_ITEMS_PER_PAGE * pageNumber - MAX_ITEMS_PER_PAGE);
};