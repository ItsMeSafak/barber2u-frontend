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
import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";

import { PLACEHOLDER_IMAGE } from "../../../../assets/constants";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import { getReservations } from "../../../../services/reservation-service";

import SchedulerAppointment from "../../../../models/SchedulerAppointment";

import styles from "./styles.module.scss";
import Reservation from "../../../../models/Reservation";

// eslint-disable-next-line require-jsdoc
const convertAppointmentsToSchedulerAppointments = (
    reservations: Reservation[]
) => {
    const schedulerList: SchedulerAppointment[] = [];
    reservations.forEach((reservation: Reservation) => {
        schedulerList.push(
            new SchedulerAppointment(
                `${reservation.date}T${reservation.startTime}`,
                `${reservation.date}T${reservation.endTime}`,
                reservation.barber.getFullNameWithInitial,
                reservation.id,
                reservation.status
            )
        );
    });
    return schedulerList;
};

// eslint-disable-next-line require-jsdoc
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

// eslint-disable-next-line require-jsdoc,@typescript-eslint/no-redeclare
const AppointmentPanel = (props: AppointmentsBase.AppointmentProps) => (
    <Appointments.Appointment
        {...props}
        className={styles.panel}
        style={{
            backgroundColor: panelColor(props.data.status),
        }}
    >
        {props.data.title}
    </Appointments.Appointment>
);

// eslint-disable-next-line require-jsdoc
const Header = (props: AppointmentTooltipBase.HeaderProps) => (
    <AppointmentTooltip.Header
        {...props}
        style={{
            height: "260px",
            backgroundSize: "cover",
            background: `url(${PLACEHOLDER_IMAGE})`,
        }}
        appointmentData={props.appointmentData}
    >
        <IconButton
            /* eslint-disable-next-line no-alert */
            onClick={() => alert(JSON.stringify(props.appointmentData))}
        >
            <FontAwesomeIcon
                icon={getIconByPrefixName("fas", "check")}
                size="sm"
            />
        </IconButton>
        <IconButton
            /* eslint-disable-next-line no-alert */
            onClick={() => alert(JSON.stringify(props.appointmentData))}
        >
            <FontAwesomeIcon
                icon={getIconByPrefixName("fas", "trash")}
                size="sm"
            />
        </IconButton>
    </AppointmentTooltip.Header>
);

// eslint-disable-next-line require-jsdoc
const Content = (props: AppointmentTooltipBase.ContentProps) => (
    <Col>
        <Row gutter={8} align="middle" className={styles.row}>
            <Col flex="18px">
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", "cut")}
                    size="lg"
                />
            </Col>
            <Col flex="auto">
                <div className={`${styles.label} ${styles.barberLabel}`}>
                    {props.appointmentData?.title}
                </div>
            </Col>
        </Row>
        <Row gutter={8} align="middle" className={styles.row}>
            <Col flex="18px">
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", "calendar-alt")}
                    size="lg"
                />
            </Col>
            <Col flex="auto">
                <div className={styles.label}>
                    {moment(props.appointmentData?.startDate).format(
                        "dddd, MMMM Do YYYY"
                    )}
                </div>
            </Col>
        </Row>
        <Row gutter={8} align="middle" className={styles.row}>
            <Col flex="18px">
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", "clock")}
                    size="lg"
                />
            </Col>
            <Col flex="auto">
                <div className={styles.label}>
                    {moment(props.appointmentData?.startDate).format("HH:mm")}
                    {" - "}
                    {moment(props.appointmentData?.endDate).format("HH:mm")}
                </div>
            </Col>
        </Row>
        <Row gutter={8} align="middle" className={styles.row}>
            <Col flex="18px">
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", "info-circle")}
                    size="lg"
                />
            </Col>
            <Col flex="auto">
                <div className={styles.label}>
                    {props.appointmentData?.status}
                </div>
            </Col>
        </Row>
    </Col>
);

/**
 * Customer statistics page.
 *
 * @returns {React.FC}
 */
const StatisticsPage: React.FC = () => {
    useEffect(() => {
        getReservations().then((response) => {
            setAppointments(
                convertAppointmentsToSchedulerAppointments(response.data)
            );
        });
    }, []);

    const [appointments, setAppointments] = useState<SchedulerAppointment[]>(
        []
    );

    const [currentDate, setCurrentDate] = React.useState(
        moment().format("YYYY-MM-DD")
    );

    return (
        <>
            <Paper>
                <h1 className={styles.h1}>Calendar</h1>
                <Scheduler data={appointments}>
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(date) =>
                            setCurrentDate(moment(date).format("YYYY-MM-DD"))
                        }
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <MonthView />
                    <WeekView startDayHour={8} endDayHour={18} />
                    <DayView startDayHour={8} endDayHour={18} />
                    <Appointments appointmentComponent={AppointmentPanel} />
                    <AppointmentTooltip
                        contentComponent={Content}
                        headerComponent={Header}
                    />
                </Scheduler>
            </Paper>
        </>
    );
};

export default StatisticsPage;
