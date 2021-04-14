import React, { useState } from "react";
import { Button, Card, Col, Image, Rate, Row, Select, Tabs } from "antd";
import { SelectValue } from "antd/es/select";
import moment, { Moment } from "moment";
import styles from "./styles.module.scss";
import { Barber } from "../../models/barber";

const { TabPane } = Tabs;
// TODO check map keys (model key & values check in case they are not sync with DB)

// TODO give services a time value, in order to calculate the required time for the timepicker
// TODO showing prices of a service inside the service dropdownlist
// TODO summary of your appointment request, such as total price, selected services and datetime
// TODO provide the DateTimePicker component with the time value as a parameter
// TODO custom daypicker(with icon), in order to select another day outside the shown weekdays
// TODO replacing OpeningsTime list variable to json object list or API call result
// TODO carousel for the time cards inside the Timepicker
// TODO Axios api post call to create appointment
// TODO remove static openingstimes json values

/**
 *
 * @param barber
 * @constructor
 */
const ListingItem: React.FC<{ barber: Barber }> = ({ barber }) => {
    const PROFILE_IMAGE_WIDTH = 150;
    const PORTFOLIO_IMAGE_WIDTH = 200;
    const [collapsed, setCollapsed] = useState(false);
    const [selectedServices, setSelectedServices] = useState([] as SelectValue);

    // TODO Calculate the time period based on the selectedServices
    const TIME_PERIOD = 60;

    /**
     *
     */
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    /** --------------------- Date Time Picker -------------------- */
    const openingsTime = [
        {
            startTime: moment("2021-04-12 08:00:00"),
            endTime: moment("2021-04-12 09:00:00"),
        },
        {
            startTime: moment("2021-04-13 08:00:00"),
            endTime: moment("2021-04-13 09:00:00"),
        },
        {
            startTime: moment("2021-04-14 08:00:00"),
            endTime: moment("2021-04-14 09:00:00"),
        },
        {
            startTime: moment("2021-04-15 08:00:00"),
            endTime: moment("2021-04-15 09:00:00"),
        },
        {
            startTime: moment("2021-04-16 08:00:00"),
            endTime: moment("2021-04-16 09:00:00"),
        },
        {
            startTime: moment("2021-04-16 12:00:00"),
            endTime: moment("2021-04-16 13:00:00"),
        },
        {
            startTime: moment("2021-04-16 18:00:00"),
            endTime: moment("2021-04-16 20:00:00"),
        },
        {
            startTime: moment("2021-04-17 08:00:00"),
            endTime: moment("2021-04-17 09:00:00"),
        },
        {
            startTime: moment("2021-04-18 08:00:00"),
            endTime: moment("2021-04-18 18:00:00"),
        },
        {
            startTime: moment("2021-04-19 08:00:00"),
            endTime: moment("2021-04-19 09:00:00"),
        },
        {
            startTime: moment("2021-04-20 08:00:00"),
            endTime: moment("2021-04-20 09:00:00"),
        },
        {
            startTime: moment("2021-04-21 08:00:00"),
            endTime: moment("2021-04-21 09:00:00"),
        },
    ];

    // The abbreviations of the weekday names
    const weekDayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // The weekdays for the day selector
    const weekDays = openingsTime
        // Map all the times to the start of the day
        .map((x) => x.startTime)
        // Remove the duplicates
        .filter(
            (x, index, self) =>
                index === self.findIndex((y) => x.isSame(y, "day"))
        )
        // Filter all the times that exceeds a full week and the times in the past.
        .filter((x) => {
            const dayDifference = x
                .clone()
                .startOf("day")
                .diff(moment().startOf("day"), "day");
            if (dayDifference >= 0 && dayDifference < 7) {
                return x;
            }
            return false;
        });

    const [selectedDay, setSelectedDay] = useState(weekDays[0]);

    // TODO set a correct default value for selectedTime. openingsTime[1] is temp.
    //  Correct default value should be the first openingsTime from the first weekDays list item.
    const [selectedTime, setSelectedTime] = useState(openingsTime[1]);

    /**
     *
     */
    const onSelectedDay = (day: Moment) => {
        setSelectedDay(day);
        const time = openingsTime.find((x) => x.startTime.isSame(day));
        if (time) setSelectedTime(time);
    };

    /**
     *
     * @param period
     */
    const getTimes = (period: number) => {
        const times: {
            startTime: moment.Moment;
            endTime: moment.Moment;
        }[] = [];
        openingsTime
            .filter((x) => selectedDay.isSame(x.startTime, "day"))
            .map((day) => {
                let startTime = day.startTime.clone();
                const timeDifferenceInMinutes = moment
                    .duration(day.endTime.diff(day.startTime))
                    .asMinutes();
                const amount = timeDifferenceInMinutes / period;
                for (let i = 0; i < amount; i++) {
                    const endTime = startTime.clone().add(period, "minutes");
                    times.push({ startTime, endTime });
                    startTime = endTime;
                }
            });

        return times;
    };

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
                                    onChange={(value) => {
                                        setSelectedServices(value);
                                    }}
                                >
                                    {barber.reservation.service.map((value) => (
                                        <Select.Option
                                            value={value}
                                            key={value}
                                        >
                                            <Row justify="space-between">
                                                <Col>{value}</Col>
                                                <Col>&euro; 0.00</Col>
                                            </Row>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                            <Row>Selected: {selectedServices}</Row>
                            <Row>Availability:</Row>
                            <Row>
                                <div className={styles.dateTimePicker}>
                                    <Row>
                                        {weekDays.map((day) => (
                                            <Col
                                                key={day.day()}
                                                className={`${
                                                    styles.dayPicker
                                                } ${
                                                    selectedDay.isSame(
                                                        day,
                                                        "day"
                                                    )
                                                        ? styles.dayPickerActive
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    onSelectedDay(day)
                                                }
                                            >
                                                {
                                                    weekDayAbbreviations[
                                                        day.weekday()
                                                    ]
                                                }
                                            </Col>
                                        ))}
                                        {/* <Col className={styles.dayPicker}>CUSTOM</Col> */}
                                    </Row>
                                    <Row gutter={[16, 24]} align="middle">
                                        {getTimes(TIME_PERIOD).map((day) => (
                                            <Col key={day.startTime.valueOf()}>
                                                <Card
                                                    className={`${
                                                        styles.cards
                                                    } ${
                                                        day.startTime.isSame(
                                                            selectedTime.startTime
                                                        )
                                                            ? styles.cardsActive
                                                            : ""
                                                    }`}
                                                    title="Morning"
                                                    size={
                                                        !day.startTime.isSame(
                                                            selectedTime.startTime
                                                        )
                                                            ? "small"
                                                            : "default"
                                                    }
                                                    onClick={() =>
                                                        setSelectedTime(day)
                                                    }
                                                >
                                                    <p>
                                                        {day.startTime.format(
                                                            "D MMMM"
                                                        )}
                                                    </p>
                                                    <p>
                                                        {day.startTime.format(
                                                            "HH:mm"
                                                        )}{" "}
                                                        -{" "}
                                                        {day.endTime.format(
                                                            "HH:mm"
                                                        )}
                                                    </p>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    {/* TODO temp row to check data */}
                                    <Row>
                                        Selected: from{" "}
                                        {selectedTime.startTime.calendar()} to{" "}
                                        {selectedTime.endTime.calendar()}{" "}
                                    </Row>
                                </div>
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
