import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row, Modal, Divider, Layout } from "antd";

import Style from "../../../../models/enums/Style";
import Reservation from "../../../../models/Reservation";

import { MONTH_NAMES } from "../../../../assets/constants";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the reservations page on the dashboard for the customer.
 * The component consists of reservation items that the customer has made in the past and future.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ReservationsPage: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reservation, setReservation] = useState(
        new Reservation(0, Style.Curly, "", "", 0)
    );

    const reservationItems: Reservation[] = [
        {
            id: 1,
            date: "2012-04-23",
            style: Style.Curly,
            location: "Amsterdam",
            price: 20.0,
        },
        {
            id: 2,
            date: "2012-04-23",
            style: Style.Styled,
            location: "Amsterdam",
            price: 16.2,
        },
        {
            id: 3,
            date: "2012-04-23",
            style: Style.Yee,
            location: "Amsterdam",
            price: 20.1,
        },
    ];

    /**
     * This function returns the index number of the previous month.
     *
     * @returns {number}
     */
    const previousMonth = () =>
        setCurrentMonth((prevState) => {
            let state = prevState - 1;
            if (state < 0) {
                state = 11;
            }
            return state;
        });

    /**
     * This function returns the index number of the next month.
     *
     * @returns {number}
     */
    const nextMonth = () =>
        setCurrentMonth((prevState) => {
            let state = prevState + 1;
            if (state > 11) {
                state = 0;
            }
            return state;
        });

    /**
     * This function filters the reservation items and checks
     * if the current month does not equal the month of the reservation item, then the item gets filtered out.
     */
    const newItems = reservationItems.filter((item) => {
        const objDate = new Date(item.date);
        return objDate.getUTCMonth() === currentMonth;
    });

    /**
     * This function sets the current reservation item selected.
     * After executing this function, the details will de rendered.
     *
     * @param {Reservation} item Reservation item to be shown detailed.
     */
    const showModal = (item: Reservation) => {
        setReservation(item);
        setIsModalVisible(true);
    };

    /**
     * TODO: Work this fucntion out.
     */
    const handleOk = () => {
        setIsModalVisible(false);
    };

    /**
     * TODO: Work this fucntion out.
     */
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /**
     * This function renders the reservations of the current month.
     *
     * @param {Reservation[]} reservationList Reservations to be rendered.
     * @returns {JSX}
     */
    const renderReservationItems = (reservationList: Reservation[]) =>
        reservationList.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
                <Card className={styles.card} onClick={() => showModal(item)}>
                    <p className={styles.title}>Reservation</p>
                    <p>{item.style}</p>
                    <p>
                        {item.date}, {item.location}
                    </p>
                    <Divider />
                    <p className={styles.price}>
                        &euro; {item.price.toFixed(2)}
                    </p>
                </Card>
            </Col>
        ));

    /**
     * This function renders the detailed information of a selected reservation.
     *
     * @param reservationItem Reservation item to be rendered.
     * @returns {JSX}
     */
    const renderDetailedInformation = (reservationItem: Reservation) => (
        <Card className={styles.card} key={reservationItem.id}>
            <p>Hairstyle: {reservationItem.style}</p>
            <p>
                {reservationItem.date},{reservationItem.location}
            </p>
            <Divider />
            <p className={styles.price}>
                Price: &euro;{reservationItem.price.toFixed(2)}
            </p>
        </Card>
    );

    return (
        <Content className={styles.reservations}>
            <div className={styles.header}>
                <FontAwesomeIcon
                    className={styles.arrow}
                    onClick={previousMonth}
                    icon={getIconByPrefixName("fas", "caret-left")}
                />
                <span>{MONTH_NAMES[currentMonth]}</span>
                <FontAwesomeIcon
                    className={styles.arrow}
                    onClick={nextMonth}
                    icon={getIconByPrefixName("fas", "caret-right")}
                />
            </div>
            <div>
                <Row gutter={[20, 20]}>
                    {newItems && renderReservationItems(newItems)}
                </Row>
            </div>

            <Modal
                title="Detailed information"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {reservation && renderDetailedInformation(reservation)}
            </Modal>
        </Content>
    );
};

export default ReservationsPage;
