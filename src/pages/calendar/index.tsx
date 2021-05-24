import React, { useContext, useEffect, useState } from "react";

import { Card } from "antd";
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

import {
    DATE_FORMAT,
    SCHEDULER_START_DAY_HOUR,
    SCHEDULER_END_DAY_HOUR,
} from "../../assets/constants";

import { getReservations } from "../../services/reservation-service";

import ReservationCard from "../../components/card-reservation";

import Role from "../../models/enums/Role";
import Reservation from "../../models/Reservation";
import SchedulerReservation from "../../models/SchedulerReservation";

import { ScreenContext } from "../../contexts/screen-context";
import { AuthenticationContext } from "../../contexts/authentication-context";

import styles from "./styles.module.scss";

/**
 * Calendar page for the reservations.
 *
 * @returns {React.FC}
 */
const CalendarPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);
    const { isTablet, isDesktop } = useContext(ScreenContext);

    useEffect(() => {
        getReservations(null).then((response) => {
            setAppointments(
                convertReservationToSchedulerReservation(response.data)
            );
        });
        return () => setAppointments([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [appointments, setAppointments] = useState<SchedulerReservation[]>(
        []
    );

    const [currentDate, setCurrentDate] = React.useState(
        moment().format(DATE_FORMAT)
    );

    /**
     * This component will render the panel for each reservation inside the DevExpress calendar
     *
     * @param {AppointmentsBase.AppointmentProps} props The default appointment properties from DevExpress
     */
    const ReservationPanel = (props: AppointmentsBase.AppointmentProps) => (
        <Appointments.Appointment
            {...props}
            className={`${styles.panel} ${panelColor(
                props.data.reservation.status
            )}`}
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
     * @param {AppointmentTooltipBase.ContentProps} props The default appointment content properties from DevExpress
     */
    const Content = (props: AppointmentTooltipBase.ContentProps) => (
        <ReservationCard
            reservationDetail={props.appointmentData?.reservation}
        />
    );

    /**
     * Return the Scheduler default viewstate keyword based on the user screen
     */
    const getDefaultCalendarView = () => {
        if (isDesktop) return "Month";
        if (isTablet) return "Week";
        return "Day";
    };

    /**
     * Convert Reservation object to the DevExpress Calendar Object
     *
     * @param {Reservation[]} reservations List of reservations
     */
    const convertReservationToSchedulerReservation = (
        reservations: Reservation[]
    ) => {
        const schedulerList: SchedulerReservation[] = [];
        if (user) {
            reservations.forEach((reservation: Reservation) => {
                let targetName = "";
                if (user.hasRole(Role.Customer))
                    targetName = reservation.getBarber.getFullNameWithInitial;
                else if (user.hasRole(Role.Barber))
                    targetName = reservation.getCustomer.getFullNameWithInitial;
                schedulerList.push(
                    new SchedulerReservation(
                        `${reservation.getDate}T${reservation.getStartTime}`,
                        `${reservation.getDate}T${reservation.getEndTime}`,
                        targetName,
                        reservation.getId,
                        reservation
                    )
                );
            });
        }
        return schedulerList;
    };

    /**
     * This switch function will select the color for the Reservation panel
     * based on the reservation status code.
     *
     * @param {string} status String of a reservation status code
     */
    const panelColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return styles.pending;
            case "ACTIVE":
                return styles.active;
            case "COMPLETED":
                return styles.completed;
            case "CANCELLED":
                return styles.cancelled;
            default:
                return styles.default;
        }
    };

    return (
        <Card className={styles.card}>
            <h1 className={styles.h1}>Calendar</h1>
            <Scheduler data={appointments}>
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={(date) =>
                        setCurrentDate(moment(date).format(DATE_FORMAT))
                    }
                    defaultCurrentViewName={getDefaultCalendarView()}
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
        </Card>
    );
};

export default CalendarPage;
