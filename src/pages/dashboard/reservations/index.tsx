import React, { useState } from "react";
import { Card, Col, Row, Modal, Button, Divider } from "antd";
import { Content } from "antd/lib/layout/layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { Reservation } from "../../../models/Reservation";


import styles from "./styles.module.scss";
import { Style } from "../../../models/Style";

interface ComponentProps {
    reservationItems: Reservation[];
}

const Reservations: React.FC<ComponentProps> = ({ reservationItems }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const prevMonth = () => setCurrentMonth((prevState) => {
        let state = prevState - 1
        if (state < 0) {
            state = 11
        }
        return state
    });

    const nextMonth = () => setCurrentMonth((prevState) => {
        let state = prevState + 1
        if (state > 11) {
            state = 0
        }
        return state
    });

    const newItems = reservationItems.filter((item) => {
        const objDate = new Date(item.date);
        return objDate.getUTCMonth() == currentMonth;
    })

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reservation, setReservation] = useState(new Reservation(0, Style.Curly, "", "", 0));

    const showModal = (item: Reservation) => {
        setReservation(item)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content className={styles.reservations}>
            <div className={styles.header}>
                <FontAwesomeIcon className={styles.arrow} onClick={prevMonth} icon={faCaretLeft} />
                <span>{monthNames[currentMonth]}</span>
                <FontAwesomeIcon className={styles.arrow} onClick={nextMonth} icon={faCaretRight} />
            </div>
            <div>
                <Row gutter={[20, 20]}>
                    {newItems &&
                        newItems.map((item) => (
                            <Col key={item.id} xs={24} sm={12} lg={8} xl={8} >
                                <Card className={styles.card} onClick={(event) => showModal(item)}>
                                    <p className={styles.title}>Reservation</p>
                                    <p>{item.style}</p>
                                    <p>{item.date}, {item.location}</p>
                                    <Divider />
                                    <p className={styles.price}>&euro; {item.price.toFixed(2)}</p>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>

            <Modal title="Detailed information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {reservation &&
                    <Card className={styles.card} key={reservation.id}>
                        <p>Hairstyle: {reservation.style}</p>
                        <p>{reservation.date},{reservation.location}</p>
                        <Divider />
                        <p className={styles.price}>Price: &euro;{reservation.price.toFixed(2)}</p>
                    </Card>
                }
            </Modal>
        </Content>
    );
};


export default Reservations;
