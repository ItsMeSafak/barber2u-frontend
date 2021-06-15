import React, { ReactNode, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Input, Modal, Rate, Tooltip } from "antd";

import Role from "../../models/enums/Role";
import Status from "../../models/enums/Status";
import Service from "../../models/Service";
import Reservation from "../../models/Reservation";

import { getIconByPrefixName } from "../../assets/functions/icon";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { EURO_SYMBOL, GOOGLE_MAPS_BASE_URL } from "../../assets/constants";

import { createReview } from "../../services/review-service";
import { updateReservationStatus } from "../../services/reservation-service";

import { BarberContext } from "../../contexts/barber-context";
import { ScreenContext } from "../../contexts/screen-context";
import { AuthenticationContext } from "../../contexts/authentication-context";

import styles from "./styles.module.scss";

/**
 * Interface for the component properties
 */
interface ComponentProps {
    reservationDetail: Reservation;
}

/**
 * Interface for the review modal form values
 */
interface ReviewFormValues {
    reviewText: string;
    starAmount: number;
}

/**
 * This component renders the reservation card on the reservations page.
 * The card is currently mainly focussed on the Barber role.
 *
 * @param {ComponentProps} props The properties of the component
 * @returns {JSX}
 */
const ReservationCard: React.FC<ComponentProps> = (props) => {
    const { reservationDetail } = props;
    const { setIsUpdated } = useContext(BarberContext);
    const { isMobileOrTablet } = useContext(ScreenContext);
    const { user } = useContext(AuthenticationContext);
    const [reviewFormVisible, setReviewFormVisible] = useState(false);

    /**
     * This function passes a PUT request to the backend and updates the status fo the current reservation.
     *
     * @param {string} reservationStatus status that should be applied to the reservation.
     */
    const updateStatus = async (reservationStatus: string) => {
        const response = await updateReservationStatus(
            reservationDetail.getId,
            reservationStatus
        );

        const { status, message } = response;
        showHttpResponseNotification(message, status);
        setIsUpdated(true);
    };

    /**
     * Render the card action for completing the reservation
     *
     * @returns {JSX}
     */
    const renderCompleteCardAction = () => (
        <Tooltip title="Complete">
            <FontAwesomeIcon
                key="complete"
                className={styles.editAction}
                icon={getIconByPrefixName("fas", "check")}
                onClick={() => completeReservation()}
            />
        </Tooltip>
    );

    /**
     * Render the card action for cancelling the reservation
     *
     * @returns {JSX}
     */
    const renderCancelCardAction = () => (
        <Tooltip title="Cancel">
            <FontAwesomeIcon
                key="cancel"
                className={styles.editAction}
                icon={getIconByPrefixName("fas", "times")}
                onClick={() => cancelReservation()}
            />
        </Tooltip>
    );

    /**
     * Render the card action for reviewing the reservation
     *
     * @returns {JSX}
     */
    const renderReviewCardAction = () => (
        <Tooltip title="Review">
            <FontAwesomeIcon
                key="review"
                className={styles.editAction}
                icon={getIconByPrefixName("fas", "comment")}
                onClick={() => setReviewFormVisible(true)}
            />
        </Tooltip>
    );

    /**
     * Render the card action for accepting the reservation
     *
     * @returns {JSX}
     */
    const renderAcceptCardAction = () => (
        <Tooltip title="Accept">
            <FontAwesomeIcon
                key="accept"
                className={styles.editAction}
                icon={getIconByPrefixName("fas", "thumbs-up")}
                onClick={() => acceptReservation()}
            />
        </Tooltip>
    );

    /**
     * Render the card action for denying the reservation
     *
     * @returns {JSX}
     */
    const renderDenyCardAction = () => (
        <Tooltip title="Deny">
            <FontAwesomeIcon
                key="deny"
                className={styles.editAction}
                icon={getIconByPrefixName("fas", "thumbs-down")}
                onClick={() => cancelReservation()}
            />
        </Tooltip>
    );

    /**
     * This function renders the actions a card can have based on the user role
     * , reservation status and reservation user review status
     * The actions are:
     * - Canceling the reservation,
     * - Accepting the reservation,
     * - Denying the reservation,
     * - Completing the reservation,
     * - Reviewing the reservation.
     *
     * @returns {JSX}
     */
    const actions = () => {
        const actionList: Array<ReactNode> = [];
        switch (reservationDetail.getStatus) {
            case Status.Pending:
                if (user?.hasRole(Role.Customer)) {
                    actionList.push(renderCancelCardAction());
                } else if (user?.hasRole(Role.Barber)) {
                    actionList.push(renderAcceptCardAction());
                    actionList.push(renderDenyCardAction());
                }
                break;
            case Status.Active:
                actionList.push(renderCompleteCardAction());
                actionList.push(renderCancelCardAction());
                break;
            case Status.Completed:
                if (
                    (user?.hasRole(Role.Customer) &&
                        !reservationDetail.getReviewedByCustomer) ||
                    (user?.hasRole(Role.Barber) &&
                        !reservationDetail.getReviewedByBarber)
                ) {
                    actionList.push(renderReviewCardAction());
                }
                break;
        }
        return actionList;
    };

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
     * This function render a Modal asking for confirmation for cancellation of the reservation.
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
     * @returns {string} reservation status style class
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

    /**
     * This function returns a modal with a form inside and has the purpose
     * to be used when an user would like to write a review on the reservation.
     *
     * @returns {JSX}
     */
    const ReviewForm = () => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={reviewFormVisible}
                title={`Write a review to: ${
                    reservationDetail.getTargetUser(user).getFullNameWithInitial
                }`}
                okText="Create"
                cancelText="Cancel"
                onCancel={() => setReviewFormVisible(false)}
                onOk={() => {
                    form.validateFields().then((values: ReviewFormValues) => {
                        form.resetFields();
                        onCreate(values);
                    });
                }}
            >
                <Form form={form} layout="vertical" name="review_form_modal">
                    <Form.Item
                        name="reviewText"
                        label="Message"
                        rules={[
                            {
                                required: true,
                                message: "Please write down your review!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="starAmount"
                        label="Rating"
                        rules={[
                            {
                                required: true,
                                message: "Please give a rating!",
                            },
                        ]}
                    >
                        <Rate />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    /**
     * This functions sends a server request to create a review
     *
     * @param {ReviewFormValues} values The values received from the review form
     */
    const onCreate = (values: ReviewFormValues) => {
        createReview(
            reservationDetail.getId,
            values.reviewText,
            values.starAmount
        ).then((response) => {
            const { status, message } = response;

            setReviewFormVisible(false);
            showHttpResponseNotification(message, status);
            setIsUpdated(true);
        });
    };

    return (
        <Card className={styles.card} actions={actions()}>
            <h2 className={`${styles.header} ${switchColorHeader()}`}>
                {reservationDetail.getStatus}
            </h2>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "user")}
                    size="lg"
                />{" "}
                {user?.hasRole(Role.Customer) &&
                    reservationDetail.getBarber.getFullNameWithInitial}
                {user?.hasRole(Role.Barber) &&
                    reservationDetail.getCustomer.getFullNameWithInitial}
            </p>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "map-marker-alt")}
                    size="lg"
                />{" "}
                {`${reservationDetail.getCustomer.getAddress}, ${reservationDetail.getCustomer.getZipCode}`}
                <a
                    target="_blank"
                    href={`${GOOGLE_MAPS_BASE_URL}${reservationDetail.getCustomer.getAddress}%20${reservationDetail.getCustomer.getZipCode}`}
                    rel="noreferrer"
                >
                    <FontAwesomeIcon
                        className={`${styles.icon} ${
                            isMobileOrTablet
                                ? styles.mobileLink
                                : styles.externalLink
                        }`}
                        icon={getIconByPrefixName("fas", "external-link-alt")}
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
                    )}
            </span>

            <ReviewForm />
        </Card>
    );
};

export default ReservationCard;
