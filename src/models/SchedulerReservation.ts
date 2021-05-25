import {
    AppointmentModel,
    SchedulerDateTime,
} from "@devexpress/dx-react-scheduler";
import Reservation from "./Reservation";

/**
 * The reservation is model that consists of an id, style, date, location and a price.
 *
 * The attributes should stay public in order to stay compatible with the AppointmentModel.
 * This compatibility is needed in order to use the DevExpress Scheduler component.
 */
export default class SchedulerReservation implements AppointmentModel {
    startDate: SchedulerDateTime;
    endDate: SchedulerDateTime;
    title: string;
    id: string;
    reservation: Reservation;

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
