import React, { useContext, useEffect, useState, useCallback } from "react";

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

import Spinner from "../../components/spinner";
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

    const [appointments, setAppointments] = useState<SchedulerReservation[]>(
        []
    );
    const [currentDate, setCurrentDate] = useState(
        moment().format(DATE_FORMAT)
    );
    const [isLoading, setIsLoading] = useState(false);
    const [viewName, setViewName] = useState("");

    /**
     * Convert Reservation object to the DevExpress Calendar Object
     *
     * @param {Reservation[]} reservations List of reservations
     */
    const convertReservationToSchedulerReservation = useCallback(
        (reservations: Reservation[]) => {
            const schedulerList: SchedulerReservation[] = [];
            if (user) {
                reservations.forEach((reservation: Reservation) => {
                    let targetName = "";
                    if (user.hasRole(Role.Customer))
                        targetName = reservation.barber.getFullNameWithInitial;
                    else if (user.hasRole(Role.Barber))
                        targetName =
                            reservation.customer.getFullNameWithInitial;
                    schedulerList.push(
                        new SchedulerReservation(
                            `${reservation.date}T${reservation.startTime}`,
                            `${reservation.date}T${reservation.endTime}`,
                            targetName,
                            reservation.id,
                            reservation
                        )
                    );
                });
            }
            return schedulerList;
        },
        [user]
    );

    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
        const response = await getReservations(null);
        if (!response) return;

        const { data } = response;

        setAppointments(convertReservationToSchedulerReservation(data));

        setIsLoading(false);
    }, [convertReservationToSchedulerReservation]);

    /**
     * Return the Scheduler default viewstate keyword based on the user screen
     */
    const getDefaultCalendarView = useCallback(() => {
        if (isDesktop) setViewName("Month");
        else if (isTablet) setViewName("Week");
        else setViewName("Day");
    }, [isDesktop, isTablet, setViewName]);

    useEffect(() => {
        fetchReservations();
        getDefaultCalendarView();
        return () => {
            setAppointments([]);
        };
    }, [user, isTablet, isDesktop, fetchReservations, getDefaultCalendarView]);

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
        <Spinner spinning={isLoading}>
            <Card className={styles.card}>
                <Scheduler data={appointments}>
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(date) =>
                            setCurrentDate(moment(date).format(DATE_FORMAT))
                        }
                        currentViewName={viewName}
                        onCurrentViewNameChange={setViewName}
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
        </Spinner>
    );
};

export default CalendarPage;
