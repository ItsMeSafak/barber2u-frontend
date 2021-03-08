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

const date = new Date().getUTCMonth;

const Reservations: React.FC<ComponentProps> = ({ items }) => {
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

    const newItems = items?.filter((item) => {
        const objDate = new Date(item.dateF);
        console.log(objDate.getUTCMonth());
        console.log(objDate.getUTCMonth() == currentMonth);
        return objDate.getUTCMonth() == currentMonth;
    })

    console.log(items);

    const convertDateToMonth = (dateString: string) => {
        const objDate = new Date(dateString)
        return objDate.getUTCMonth()
    }

    return (
        <Layout>
            <Content className={styles.reservations}>
                <div className={styles.header}>
                    <FontAwesomeIcon className={styles.arrow} onClick={prevMonth} icon={faCaretLeft} />
                    <span>{monthNames[currentMonth]}</span>
                    <FontAwesomeIcon className={styles.arrow} onClick={nextMonth} icon={faCaretRight} />
                </div>
                <div>
                    <Row gutter={[20, 20]}>
                        {newItems &&
                            newItems.map(({ dateF, style, price }) => (
                                <Col key={style} xs={24} sm={12} lg={8} xl={8} >
                                    <Card className={styles.card} key={style}>
                                        <p className={styles.title}>{convertDateToMonth(dateF)}</p>
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
