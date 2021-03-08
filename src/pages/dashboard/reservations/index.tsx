import React, { useState } from "react";
import { Card, Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface ComponentProps {
    items?: {
        dateF: string;
        style: string;
        price: number;
    }[];
}

const Reservations: React.FC<ComponentProps> = ({ items }) => {
    const [currentMonth, setCurrentMonth] = useState("");

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date: number = new Date().getMonth();

    const previousMonth = () => {
        console.log("prev")
        setCurrentMonth(monthNames[date - 1])
    }

    const nextMonth = () => {
        console.log("next")
        setCurrentMonth(monthNames[date + 1])
    }

    return (
        <Layout>
            <Content className={styles.reservations}>
                <div className={styles.header}>
                    <FontAwesomeIcon className={styles.arrow} onClick={previousMonth} icon={faCaretLeft} />
                    <span>{currentMonth}</span>
                    <FontAwesomeIcon className={styles.arrow} onClick={nextMonth} icon={faCaretRight} />
                </div>
                <div>
                    <Row gutter={[20,20]}>
                        {items &&
                            items.map(({ dateF, style, price }) => (
                                <Col key={style} xs={24} sm={12} lg={8} xl={8} >
                                    <Card className={styles.card} key={style}>
                                        <p className={styles.title}>{dateF}</p>
                                        <p>{style}</p>
                                        <p className={styles.price}>&euro; {price.toFixed(2)}</p>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </div>
            </Content>
        </Layout>

    );
};


export default Reservations;
