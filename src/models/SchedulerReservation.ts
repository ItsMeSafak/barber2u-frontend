import {
    AppointmentModel,
    SchedulerDateTime,
} from "@devexpress/dx-react-scheduler";
import Reservation from "./Reservation";

/**
 * The reservation is model that consists of an id, style, date, location and a price.
 */
export default class SchedulerReservation implements AppointmentModel {
    startDate: SchedulerDateTime;
    endDate: SchedulerDateTime;
    title: string;
    id: string;
    reservation: Reservation;

    // eslint-disable-next-line require-jsdoc
    constructor(
        startDate: SchedulerDateTime,
        endDate: SchedulerDateTime,
        title: string,
        id: string,
        reservation: Reservation
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.title = title;
        this.id = id;
        this.reservation = reservation;
    }
}