import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Col, Modal } from "antd";

import moment from "moment";

import Status from "../../models/enums/Status";
import Reservation from "../../models/Reservation";

import { EURO_SYMBOL } from "../../assets/constants";
import { getIconByPrefixName } from "../../assets/functions/icon";


import styles from "./styles.module.scss";

interface ComponentProps {
    reservationDetail: Reservation;
}
/**
 *
 * @param {Object} props
 * @returns {JSX}
 */
const ReservationCard: React.FC<ComponentProps> = (props) => {
    const { reservationDetail } = props;

    /**
     * This function renders the actions a card can have.
     * The actions are:
     * - Deleting the service.
     * - Editing the service.
     *
     * @returns {JSX}
     */
    const actions = () => [
        <FontAwesomeIcon
            key="approve"
            className={styles.editAction}
            icon={getIconByPrefixName("fas", "check")}
            onClick={() => reservationDetail.status === Status.Active ? completeReservation() : acceptReservation()}
        />,
        <FontAwesomeIcon
            key="cancel"
            className={styles.editAction}
            icon={getIconByPrefixName("fas", "times")}
            onClick={() => cancelReservation()}
        />,
    ];

    /**
     * 
     */
    const completeReservation = () => {
        Modal.warning({
            centered: true,
            title: "Complete reservation",
            content: "Are you sure you want to complete this reservation?",
            okCancel: true,
        });
    };

    /**
     * 
     */
    const acceptReservation = () => {
        Modal.warning({
            centered: true,
            title: "Accept reservation",
            content: "Are you sure you want to accept this reservation?",
            okCancel: true,
        });
    };

    /**
     * 
     */
    const cancelReservation = () => {
        Modal.warning({
            centered: true,
            title: "Cancel reservation",
            content: "Are you sure you want to cancel this reservation?",
            okCancel: true,
        });
    };

    /**
     * 
     * @returns {string}
     */
    const switchColorHeader = () => {
        switch (reservationDetail.status) {
            case Status.Pending:
                return styles.pending;
            case Status.Cancelled:
                return styles.cancelled;
            case Status.Active:
                return styles.active;
            default:
                return styles.completed;
        }
    };

    return (
        <Col key={reservationDetail.id} xs={24} sm={12} lg={8}>
            <Card className={styles.card} actions={reservationDetail.status === Status.Completed || reservationDetail.status === Status.Cancelled ? [] : actions()}>
                <h2 className={`${styles.header} ${switchColorHeader()}`}>
                    {reservationDetail.status}
                </h2>

                <p><FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "cut")}
                    size="lg"
                /> {reservationDetail.customer.getFullNameWithInitial}</p>

                <p><FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "map-marker-alt")}
                    size="lg"
                /> {`${reservationDetail.customer.getAddress}, ${reservationDetail.customer.getZipcode}`}</p>

                <p><FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "calendar-alt")}
                    size="lg"
                /> {reservationDetail.date}</p>

                <p><FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "clock")}
                    size="lg"
                /> {`${reservationDetail.startTime}, ${reservationDetail.endTime}`}</p>

                <span className={styles.price}>
                    {/* {EURO_SYMBOL} {reservationDetail.services.map((item) => item.price)
                        .reduce((servicePrice, currentValue) => currentValue + servicePrice).toFixed(2)} */}
                    {`${EURO_SYMBOL} 0`}
                </span>
            </Card>
        </Col>
    );
};

export default ReservationCard;
