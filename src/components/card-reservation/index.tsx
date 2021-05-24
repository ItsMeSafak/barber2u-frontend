import React, { ReactNode, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Form, Input, Modal, Rate, Tooltip } from "antd";

import Role from "../../models/enums/Role";
import Status from "../../models/enums/Status";
import Reservation from "../../models/Reservation";

import { getIconByPrefixName } from "../../assets/functions/icon";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { EURO_SYMBOL, GOOGLE_MAPS_BASE_URL } from "../../assets/constants";

import { updateReservationStatus } from "../../services/reservation-service";

import { BarberContext } from "../../contexts/barber-context";
import { ScreenContext } from "../../contexts/screen-context";
import { AuthenticationContext } from "../../contexts/authentication-context";

import styles from "./styles.module.scss";

interface ComponentProps {
    reservationDetail: Reservation;
}

interface FormValues {
    reviewText: string;
    starAmount: number;
}

interface ReviewFormProps {
    visible: boolean;
    onCreate: (values: FormValues) => void;
    onCancel: () => void;
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
    const { user } = useContext(AuthenticationContext);
    const [reviewFormVisible, setReviewFormVisible] = useState(false);

    /**
     * This function passes a PUT request to the backend and updates the status fo the current reservation.
     *
     * @param reservationStatus status that should be applied to the reservation.
     */
    const updateStatus = async (reservationStatus: string) => {
        const response = await updateReservationStatus(
            reservationDetail.id,
            reservationStatus
        );

        const { status, message } = response;
        showHttpResponseNotification(message, status, false);
        setIsUpdated(true);
    };

    /**
     *
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
     *
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
     *
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
     *
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
     *
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
     * This function renders the actions a card can have.
     * The actions are:
     * - Approving the reservation,
     * - Canceling the reservation.
     *
     * @returns {JSX}
     */
    const actions = () => {
        const actionList: Array<ReactNode> = [];
        if (reservationDetail.status === Status.Pending) {
            if (user?.hasRole(Role.Customer)) {
                actionList.push(renderCancelCardAction());
            } else if (user?.hasRole(Role.Barber)) {
                actionList.push(renderAcceptCardAction());
                actionList.push(renderDenyCardAction());
            }
        } else if (reservationDetail.status === Status.Active) {
            actionList.push(renderCompleteCardAction());
            actionList.push(renderCancelCardAction());
        } else if (reservationDetail.status === Status.Completed) {
            actionList.push(renderReviewCardAction());
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

    /**
     *
     * @param visible
     * @param onCreate
     * @param onCancel
     * @constructor
     */
    const ReviewForm: React.FC<ReviewFormProps> = ({
        visible,
        onCreate,
        onCancel,
    }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="Create a review"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            createReview(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
            >
                <Form form={form} layout="vertical" name="form_in_modal">
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
                                message: "Please a rating!",
                            },
                        ]}
                    >
                        <Rate allowHalf />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    /**
     *
     * @param values
     */
    const createReview = (values: FormValues) => {
        console.log("Received values of form: ", values);
        setReviewFormVisible(false);
    };

    return (
        <Card className={styles.card} actions={actions()}>
            <h2 className={`${styles.header} ${switchColorHeader()}`}>
                {reservationDetail.status}
            </h2>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "user")}
                    size="lg"
                />{" "}
                {user?.hasRole(Role.Customer) &&
                    reservationDetail.barber.getFullNameWithInitial}
                {user?.hasRole(Role.Barber) &&
                    reservationDetail.customer.getFullNameWithInitial}
            </p>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "map-marker-alt")}
                    size="lg"
                />{" "}
                {`${reservationDetail.customer.getAddress}, ${reservationDetail.customer.getZipCode}`}
                <a
                    target="_blank"
                    href={`${GOOGLE_MAPS_BASE_URL}${reservationDetail.customer.getZipCode}`}
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
                {reservationDetail.date}
            </p>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "clock")}
                    size="lg"
                />{" "}
                {`${reservationDetail.startTime} - ${reservationDetail.endTime}`}
            </p>

            <p>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={getIconByPrefixName("fas", "cut")}
                    size="lg"
                />{" "}
                {reservationDetail.services.map(({ name }, index) =>
                    index !== 0 ? `, ${name}` : `${name}`
                )}
            </p>

            <span className={styles.price}>
                {EURO_SYMBOL}{" "}
                {reservationDetail.services
                    .map((item) => item.price)
                    .reduce(
                        (servicePrice, currentValue) =>
                            currentValue + servicePrice
                    )
                    .toFixed(2)}
            </span>

            <ReviewForm
                visible={reviewFormVisible}
                onCreate={createReview}
                onCancel={() => setReviewFormVisible(false)}
            />
        </Card>
    );
};

export default ReservationCard;
