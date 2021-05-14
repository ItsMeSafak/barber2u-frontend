import React, { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import {
    Appointments as AppointmentsBase,
    AppointmentTooltip as AppointmentTooltipBase,
    ViewState,
} from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    MonthView,
    WeekView,
    DayView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentTooltip,
    ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";

import { DATE_FORMAT } from "../../../../assets/constants";

import { getReservations } from "../../../../services/reservation-service";

import ReservationCard from "../../../../components/card-reservation";

import Reservation from "../../../../models/Reservation";
import SchedulerReservation from "../../../../models/SchedulerReservation";

import styles from "./styles.module.scss";

// Start and end of the day for the scheduler day and week view
const SCHEDULER_START_DAY_HOUR = 8;
const SCHEDULER_END_DAY_HOUR = 18;

/**
 * Convert Reservation object to the DevExpress Calendar Object
 *
 * @param reservations {Reservation[]}  List of reservations
 */
const convertReservationToSchedulerReservation = (
    reservations: Reservation[]
) => {
    const schedulerList: SchedulerReservation[] = [];
    reservations.forEach((reservation: Reservation) => {
        schedulerList.push(
            new SchedulerReservation(
                `${reservation.date}T${reservation.startTime}`,
                `${reservation.date}T${reservation.endTime}`,
                reservation.barber.getFullNameWithInitial,
                reservation.id,
                reservation
            )
        );
    });
    return schedulerList;
};

/**
 * This switch function will select the color for the Reservation panel
 * based on the reservation status code
 *
 * @param status {string}   String of a reservation status code
 */
const panelColor = (status: string) => {
    switch (status) {
        case "PENDING":
            return "#ffc107";
        case "ACTIVE":
            return "#64b5f6";
        case "COMPLETED":
            return "#6ad45e";
        case "CANCELLED":
            return "#f66464";
        default:
            return "#808080";
    }
};

/**
 * This component will render the panel for each reservation inside the DevExpress calendar
 *
 * @param props {AppointmentsBase.AppointmentProps}     The default appointment properties from DevExpress
 */
const ReservationPanel = (props: AppointmentsBase.AppointmentProps) => (
    <Appointments.Appointment
        {...props}
        className={styles.panel}
        style={{
            backgroundColor: panelColor(props.data.reservation.status),
        }}
    >
        {props.data.title}
    </Appointments.Appointment>
);

/**
 * This component will render the empty header for the reservation modal
 */
const Header = () => <div style={{ display: "none" }} />;

/**
 * This component will render the panel the content for the reservation modal.
 * It makes use of the reservation card component.
 *
 * @param props {AppointmentTooltipBase.ContentProps}   The default appointment content properties from DevExpress
 */
const Content = (props: AppointmentTooltipBase.ContentProps) => (
    <ReservationCard reservationDetail={props.appointmentData?.reservation} />
);

/**
 * Customer statistics page.
 *
 * @returns {React.FC}
 */
const CalendarPage: React.FC = () => {
    useEffect(() => {
        getReservations(null).then((response) => {
            setAppointments(
                convertReservationToSchedulerReservation(response.data)
            );
        });
        return () => setAppointments([]);
    }, []);

    const [appointments, setAppointments] = useState<SchedulerReservation[]>(
        []
    );

    const [currentDate, setCurrentDate] = React.useState(
        moment().format(DATE_FORMAT)
    );

    return (
        <>
            <Paper>
                <h1 className={styles.h1}>Calendar</h1>
                <Scheduler data={appointments}>
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(date) =>
                            setCurrentDate(moment(date).format(DATE_FORMAT))
                        }
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <MonthView />
                    <WeekView
                        startDayHour={SCHEDULER_START_DAY_HOUR}
                        endDayHour={SCHEDULER_END_DAY_HOUR}
                    />
                    <DayView
                        startDayHour={SCHEDULER_START_DAY_HOUR}
                        endDayHour={SCHEDULER_END_DAY_HOUR}
                    />
                    <Appointments appointmentComponent={ReservationPanel} />
                    <AppointmentTooltip
                        contentComponent={Content}
                        headerComponent={Header}
                    />
                </Scheduler>
            </Paper>
        </>
    );
};

export default CalendarPage;
