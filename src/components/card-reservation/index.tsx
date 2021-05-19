import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Col, Modal } from "antd";

import Status from "../../models/enums/Status";
import Service from "../../models/Service";
import Reservation from "../../models/Reservation";

import { getIconByPrefixName } from "../../assets/functions/icon";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { EURO_SYMBOL, GOOGLE_MAPS_BASE_URL } from "../../assets/constants";

import { updateReservationStatus } from "../../services/reservation-service";

import { BarberContext } from "../../contexts/barber-context";
import { ScreenContext } from "../../contexts/screen-context";

import styles from "./styles.module.scss";

interface ComponentProps {
    reservationDetail: Reservation;
}

/**
 * This component renders the reservation card on the reservations page.
 * The card is currently mainly focussed on the Barber role.
 *
 * @param props
 * @returns {JSX}
 */
const ReservationCard: React.FC<ComponentProps> = (props) => {
    const { reservationDetail } = props;
    const { setIsUpdated } = useContext(BarberContext);
    const { isMobileOrTablet } = useContext(ScreenContext);

    /**
     * This function passes a PUT request to the backend and updates the status fo the current reservation.
     *
     * @param reservationStatus status that should be applied to the reservation.
     */
    const updateStatus = async (reservationStatus: string) => {
        const response = await updateReservationStatus(
            reservationDetail.getId,
            reservationStatus
        );

        const { status, message } = response;
        showHttpResponseNotification(message, status, false);
        setIsUpdated(true);
    };

    /**
     * This function renders the actions a card can have.
     * The actions are:
     * - Approving the reservation,
     * - Canceling the reservation.
     *
     * @returns {JSX}
     */
    const actions = () => [
        <FontAwesomeIcon
            key="approve"
            className={styles.editAction}
            icon={getIconByPrefixName("fas", "check")}
            onClick={() =>
                reservationDetail.getStatus === Status.Active
                    ? completeReservation()
                    : acceptReservation()
            }
        />,
        <FontAwesomeIcon
            key="cancel"
            className={styles.editAction}
            icon={getIconByPrefixName("fas", "times")}
            onClick={() => cancelReservation()}
        />,
    ];

    /**
     * This function render a Modal asking for confirmation for completion of the reservation.
     */
    const completeReservation = () => {
        Modal.warning({
            centered: true,
            title: "Complete reservation",
            content: "Are you sure you want to complete this reservation?",
            okCancel: true,
            onOk: () => updateStatus(Status.Completed),
        });
    };

    /**
     * This function render a Modal asking for confirmation for acceptance of the reservation.
     */
    const acceptReservation = () => {
        Modal.warning({
            centered: true,
            title: "Accept reservation",
            content: "Are you sure you want to accept this reservation?",
            okCancel: true,
            onOk: () => updateStatus(Status.Active),
        });
    };

    /**
     * This function render a Modal asking for confirmation for cancelation of the reservation.
     */
    const cancelReservation = () => {
        Modal.warning({
            centered: true,
            title: "Cancel reservation",
            content: "Are you sure you want to cancel this reservation?",
            okCancel: true,
            onOk: () => updateStatus(Status.Cancelled),
        });
    };

    /**
     * This function returns the required style class based on the status.
     *
     * @returns {string}
     */
    const switchColorHeader = () => {
        switch (reservationDetail.getStatus) {
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
        <Col key={reservationDetail.getId} xs={24} sm={12} lg={8}>
            <Card
                className={styles.card}
                actions={
                    reservationDetail.getStatus === Status.Completed ||
                        reservationDetail.getStatus === Status.Cancelled
                        ? []
                        : actions()
                }
            >
                <h2 className={`${styles.header} ${switchColorHeader()}`}>
                    {reservationDetail.getStatus}
                </h2>

                <p>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={getIconByPrefixName("fas", "user")}
                        size="lg"
                    />{" "}
                    {reservationDetail.getCustomer.getFullNameWithInitial}
                </p>

                <p>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={getIconByPrefixName("fas", "map-marker-alt")}
                        size="lg"
                    />{" "}
                    {`${reservationDetail.getCustomer.getAddress}, ${reservationDetail.getCustomer.getZipcode}`}
                    <a
                        target="_blank"
                        href={`${GOOGLE_MAPS_BASE_URL}${reservationDetail.getCustomer.getZipcode}`}
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon
                            className={`${styles.icon} ${isMobileOrTablet
                                    ? styles.mobileLink
                                    : styles.externalLink
                                }`}
                            icon={getIconByPrefixName(
                                "fas",
                                "external-link-alt"
                            )}
                            size="lg"
                        />
                    </a>
                </p>

                <p>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={getIconByPrefixName("fas", "calendar-alt")}
                        size="lg"
                    />{" "}
                    {reservationDetail.getDate}
                </p>

                <p>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={getIconByPrefixName("fas", "clock")}
                        size="lg"
                    />{" "}
                    {`${reservationDetail.getStartTime} - ${reservationDetail.getEndTime}`}
                </p>

                <p>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={getIconByPrefixName("fas", "cut")}
                        size="lg"
                    />{" "}
                    {reservationDetail.getServices.map(({ getName }, index) =>
                        index !== 0 ? `, ${getName}` : `${getName}`
                    )}
                </p>

                <span className={styles.price}>
                    {EURO_SYMBOL}{" "}
                    {reservationDetail.getServices
                        .map(
                            (item) =>
                                Object.setPrototypeOf(item, Service.prototype)
                                    .getPrice
                        )
                        .reduce(
                            (servicePrice, currentValue) =>
                                currentValue + servicePrice
                        )
                        .toFixed(2)}
                </span>
            </Card>
        </Col>
    );
};

export default ReservationCard;
