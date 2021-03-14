import React, { useState } from "react";

import { Content } from "antd/lib/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row, Modal, Divider } from "antd";

import Style from "../../../models/Style";
import Reservation from "../../../models/Reservation";

import { MONTH_NAMES } from "../../../asset/constants";
import { getIconByPrefixName } from "../../../asset/functions/icon";

import styles from "./styles.module.scss";

interface ComponentProps {
    reservationItems: Reservation[];
}

/* eslint-disable */
const ReservationsPage: React.FC<ComponentProps> = (props) => {
    const { reservationItems } = props;
    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reservation, setReservation] = useState(
        new Reservation(0, Style.Curly, "", "", 0)
    );

    const previousMonth = () =>
        setCurrentMonth((prevState) => {
            let state = prevState - 1;
            if (state < 0) {
                state = 11;
            }
            return state;
        });

    const nextMonth = () =>
        setCurrentMonth((prevState) => {
            let state = prevState + 1;
            if (state > 11) {
                state = 0;
            }
            return state;
        });

    const newItems = reservationItems.filter((item) => {
        const objDate = new Date(item.date);
        return objDate.getUTCMonth() === currentMonth;
    });

    const showModal = (item: Reservation) => {
        setReservation(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderReservationItems = (reservationList: Reservation[]) =>
        reservationList.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
                <Card
                    className={styles.card}
                    onClick={(event) => showModal(item)}
                >
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
