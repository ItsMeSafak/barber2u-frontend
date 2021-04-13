import React, { useState } from "react";
import { Button, Col, Image, Rate, Row, Select, Tabs } from "antd";
import moment, { Moment } from "moment";
import styles from "./styles.module.scss";
import { Barber } from "../../models/barber";
import DateTimePicker from "../datetimepicker";


const { TabPane } = Tabs;
// TODO check map keys
/**
 *
 * @param barber
 * @constructor
 */
const ListingItem: React.FC<{ barber: Barber }> = ({ barber }) => {
    const PROFILE_IMAGE_WIDTH = 150;
    const PORTFOLIO_IMAGE_WIDTH = 200;
    const [collapsed, setCollapsed] = useState(false);

    /**
     *
     */
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const selectedDateTime = {startTime: moment(), endTime: moment() };

    return (
        <Col className={styles.container}>
            <Row className={styles.containerTop}>
                <Col>
                    <Image
                        width={PROFILE_IMAGE_WIDTH}
                        src={barber.imageUrl}
                        preview={false}
                        className={styles.profileImage}
                    />
                </Col>
                <Col className={styles.containerTopContent}>
                    <Row>
                        <span className={styles.barberName}>{barber.name}</span>
                    </Row>
                    <Row>
                        <Rate
                            disabled
                            allowHalf
                            className={styles.rating}
                            defaultValue={barber.rate}
                        />
                    </Row>
                    <Row>
                        <Button
                            onClick={toggleCollapse}
                            className={
                                collapsed
                                    ? "ant-btn-secundary"
                                    : "ant-btn-primary"
                            }
                        >
                            {collapsed ? "Cancel" : "Reserve"}
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row
                className={`${styles.containerBottom} ${
                    collapsed ? "" : styles.hide
                }`}
            >
                <Col span={24}>
                    <Tabs type="card">
                        <TabPane
                            tab={<div className={styles.tab}>Reservation</div>}
                            key="1"
                        >
                            <Row>Service:</Row>
                            <Row>
                                <Select
                                    mode="multiple"
                                    className={styles.selectBox}
                                    placeholder="Select a service"
                                >
                                    {barber.reservation.service.map((value) => (
                                        <Select.Option
                                            value={value}
                                            key={value}
                                        >
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                            <Row>Availability:</Row>
                            <Row>
                                <DateTimePicker timePeriod={60} selectedDateTime={selectedDateTime}/>
                                <h3>{ selectedDateTime }</h3>
                            </Row>
                            <Row justify="end">
                                <Col>
                                    <Button type="primary">Reserve</Button>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane
                            tab={<div className={styles.tab}>Portfolio</div>}
                            key="2"
                        >
                            {barber.portfolio.map((service) => (
                                <Col key={service.name}>
                                    <Row className={styles.serviceName}>
                                        {service.name}
                                    </Row>
                                    <Row>
                                        {service.imageUrls.map((imageUrl) => (
                                            <Col
                                                key={imageUrl}
                                                className={
                                                    styles.portfolioImage
                                                }
                                            >
                                                <Image
                                                    width={
                                                        PORTFOLIO_IMAGE_WIDTH
                                                    }
                                                    src={imageUrl}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            ))}
                        </TabPane>
                        <TabPane
                            tab={<div className={styles.tab}>Reviews</div>}
                            key="3"
                        >
                            <Col>
                                {barber.reviews.map((review) => (
                                    <div
                                        key={barber.name}
                                        className={styles.reviewContainer}
                                    >
                                        <Row>
                                            <Col
                                                span={12}
                                                className={styles.reviewAuthor}
                                            >
                                                {review.author}
                                            </Col>
                                            <Col
                                                span={12}
                                                className={styles.reviewRate}
                                            >
                                                <Rate
                                                    disabled
                                                    allowHalf
                                                    className={styles.rating}
                                                    defaultValue={review.rate}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className={styles.createdOn}>
                                            {review.created_on}
                                        </Row>
                                        <Row>"{review.description}"</Row>
                                    </div>
                                ))}
                            </Col>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Col>
    );
};

export default ListingItem;
