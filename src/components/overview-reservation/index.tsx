import React, { useState } from "react";
import {Button, Col, Layout, Row} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconByPrefixName } from "../../assets/functions/icon";
import ReservationCalendar from "../calendar-reservation";
import OverviewReservationCard from "../overview-card-reservation";

import styles from "./styles.module.scss";

/**
 *
 *
 * @returns {JSX}
 */
const OverviewReservation: React.FC = () => {
    const [displayCalendar, setDisplayCalendar] = useState(true);

    return (
        <Layout>
            <Row justify="end">
                <Col className={styles.layoutToggleContainer}>
                    <span>Layout:</span>
                    <Button
                        onClick={() => setDisplayCalendar(!displayCalendar)}
                    >
                        {displayCalendar && (
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "grip-horizontal"
                                )}
                            />
                        )}
                        {!displayCalendar && (
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "calendar-alt"
                                )}
                            />
                        )}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {displayCalendar && <ReservationCalendar />}
                    {!displayCalendar && <OverviewReservationCard />}
                </Col>
            </Row>
        </Layout>
    );
};

export default OverviewReservation;
