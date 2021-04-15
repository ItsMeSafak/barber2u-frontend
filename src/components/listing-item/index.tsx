import React, { useState } from "react";

import {
    Col,
    Row,
    Tabs,
    Card,
    Rate,
    Image,
    Button,
    Select,
    DatePicker,
} from "antd";
import { SelectValue } from "antd/es/select";

import moment, { Moment } from "moment";

import { Barber } from "../../models/barber";
import MomentRange from "../../models/MomentRange";

import styles from "./styles.module.scss";

const { TabPane } = Tabs;
// TODO check map keys (model key & values check in case they are not sync with DB)

// TODO give services a time value, in order to calculate the required time for the timepicker
// TODO showing prices of a service inside the service dropdownlist
// TODO summary of your appointment request, such as total price, selected services and datetime
// TODO replacing OpeningsTime list variable to json object list or API call result
// TODO carousel for the time cards inside the Timepicker
// TODO Axios api post call to create appointment
// TODO remove static openingstimes json values

/**
 * A Item component for the Barber listing page and gives an overview of the barber information, such as: services,
 * pricing, availability, portfolio, reviews and rating.
 * @param barber The user object of the barber
 * @constructor
 */
const ListingItem: React.FC<{ barber: Barber }> = ({ barber }) => {
    const PROFILE_IMAGE_WIDTH = 150;
    const PORTFOLIO_IMAGE_WIDTH = 200;

    /**
     * State for collapsing the bottom container of the barber container
     */
    const [collapsed, setCollapsed] = useState(false);

    /**
     * State for the selected barber services.
     */
    const [selectedServices, setSelectedServices] = useState([] as SelectValue);

    /**
     * State for the custom DatePicker in the DayPicker Row
     */
    const [customDatePickerValue, setCustomDatePickerValue] = useState<Moment>(
        moment().startOf("day").add(7, "day")
    );

    // TODO Remove when services are requested and calculate the time period bases on the services.
    /**
     * The amount of time needed for the total appointment.
     */
    const TIME_PERIOD = 60;

    /**
     * Toggle the collapse state of the barber bottom container
     */
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    /** --------------------- Date Time Picker -------------------- */
    const openingsTime = [
        new MomentRange(
            moment("2021-04-15 08:00:00"),
            moment("2021-04-15 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-15 22:00:00"),
            moment("2021-04-15 23:00:00")
        ),
        new MomentRange(
            moment("2021-04-16 08:00:00"),
            moment("2021-04-16 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-17 08:00:00"),
            moment("2021-04-17 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-17 12:00:00"),
            moment("2021-04-17 13:00:00")
        ),
        new MomentRange(
            moment("2021-04-17 18:00:00"),
            moment("2021-04-17 20:00:00")
        ),
        new MomentRange(
            moment("2021-04-18 08:00:00"),
            moment("2021-04-18 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-19 08:00:00"),
            moment("2021-04-19 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-20 08:00:00"),
            moment("2021-04-20 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-21 08:00:00"),
            moment("2021-04-21 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-22 08:00:00"),
            moment("2021-04-22 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-23 08:00:00"),
            moment("2021-04-23 09:00:00")
        ),
        new MomentRange(
            moment("2021-04-24 08:00:00"),
            moment("2021-04-24 09:00:00")
        ),
    ];

    /**
     * The abbreviations of the weekday names
     */
    const weekDayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    /**
     * The weekdays for the daypicker selector
     */
    const weekDays = openingsTime
        // Map all the times to the start of the day
        .map((x) => x.start)
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

    /**
     * State for the selected day in the day picker
     */
    const [selectedDay, setSelectedDay] = useState<Moment>(weekDays[0]);

    /**
     * It finds the first next available time on the same day as the selected day
     * @param day The selected day
     */
    const findFirstTimeMoment = (day: Moment) =>
        openingsTime.find(
            (x) => x.start.isSame(day, "day") && x.start.isSameOrAfter(moment())
        );

    /**
     * State for the selected time in the time picker
     */
    const [selectedTime, setSelectedTime] = useState<MomentRange | undefined>(
        findFirstTimeMoment(selectedDay)
    );

    /**
     *  On selecting a day in the daypicker row, set the new value in the state and select the time card,
     *  in case the time in the same day has time available.
     * @param day The selected day
     */
    const onSelectedDay = (day: Moment) => {
        setSelectedDay(day);
        setSelectedTime(findFirstTimeMoment(day));
    };

    /**
     * Filter the list of times that the Barber is open and split all the times based on the period,
     * so the customer can select a time without interfering with another time.
     * @param period A period in minutes
     */
    const getTimes = (period: number) => {
        // Initial of a list in which start and end times are saved.
        const times: MomentRange[] = [];

        // Filter and map based on the opening times, so the times can be saved in the times list.
        openingsTime
            // Filter the opening times', so that only the times of the selected day are mapped.
            .filter(
                (x) =>
                    selectedDay.isSame(x.start, "day") &&
                    x.start.isSameOrAfter(moment())
            )
            .forEach((day) => {
                // TODO (optional) check if this line still works if removed/code optimized
                let startTime = day.start.clone();

                // The amount of minutes between the start time and end time.
                const timeDifferenceInMinutes = moment
                    .duration(day.end.diff(day.start))
                    .asMinutes();

                // TODO (optional) better naming for 'amount'
                // The amount that the period fits in the time difference
                const amount = timeDifferenceInMinutes / period;

                // loop over the start time for exact the amount
                for (let i = 0; i < amount; i++) {
                    const endTime = startTime.clone().add(period, "minutes");
                    times.push(new MomentRange(startTime, endTime));
                    startTime = endTime;
                }
            });

        return times;
    };

    /**
     * Get the part of the day from a Moment and return the part in a string.
     * Possible returns are: Morning / Afternoon / Evening / Night.
     * @param day A moment of the day of which the part will be found
     */
    const getPartOfTheDayString = (day: Moment) => {
        // The strings of the parts of the day
        const NIGHT_STRING = "Night";
        const MORNING_STRING = "Morning";
        const AFTERNOON_STRING = "Afternoon";
        const EVENING_STRING = "Evening";

        // Moment clones of the parts of the day
        const NIGHT_MOMENT = day.clone().startOf("day");
        const MORNING_MOMENT = day.clone().startOf("day").add(6, "hour");
        const AFTERNOON_MOMENT = day.clone().startOf("day").add(12, "hour");
        const EVENING_MOMENT = day.clone().startOf("day").add(18, "hour");
        const TOMORROW_NIGHT_MOMENT = day.clone().startOf("day").add(1, "day");

        // Check each moment scenario in order to return the correct string
        if (day.isSameOrAfter(NIGHT_MOMENT) && day.isBefore(MORNING_MOMENT))
            return NIGHT_STRING;
        if (day.isSameOrAfter(MORNING_MOMENT) && day.isBefore(AFTERNOON_MOMENT))
            return MORNING_STRING;
        if (day.isSameOrAfter(AFTERNOON_MOMENT) && day.isBefore(EVENING_MOMENT))
            return AFTERNOON_STRING;
        if (
            day.isSameOrAfter(EVENING_MOMENT) &&
            day.isBefore(TOMORROW_NIGHT_MOMENT)
        )
            return EVENING_STRING;
        return "";
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
                                        <Col
                                            className={`${styles.dayPicker} ${
                                                selectedDay.isSame(
                                                    customDatePickerValue,
                                                    "day"
                                                )
                                                    ? styles.dayPickerActive
                                                    : ""
                                            }`}
                                        >
                                            <DatePicker
                                                className={
                                                    styles.antdDatepicker
                                                }
                                                bordered={false}
                                                allowClear={false}
                                                inputReadOnly
                                                defaultValue={
                                                    customDatePickerValue
                                                }
                                                onClick={() =>
                                                    onSelectedDay(
                                                        customDatePickerValue
                                                    )
                                                }
                                                onChange={(date) => {
                                                    if (date) {
                                                        console.log(date);
                                                        onSelectedDay(date);
                                                        setCustomDatePickerValue(
                                                            date
                                                        );
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 24]} align="middle">
                                        {selectedTime &&
                                            getTimes(TIME_PERIOD).map((day) => (
                                                <Col key={day.start.valueOf()}>
                                                    <Card
                                                        className={`${
                                                            styles.cards
                                                        } ${
                                                            day.start.isSame(
                                                                selectedTime.start
                                                            )
                                                                ? styles.cardsActive
                                                                : ""
                                                        }`}
                                                        title={getPartOfTheDayString(
                                                            day.start
                                                        )}
                                                        size={
                                                            !day.start.isSame(
                                                                selectedTime.start
                                                            )
                                                                ? "small"
                                                                : "default"
                                                        }
                                                        onClick={() =>
                                                            setSelectedTime(day)
                                                        }
                                                    >
                                                        <p>
                                                            {day.start.format(
                                                                "D MMMM"
                                                            )}
                                                        </p>
                                                        <p>
                                                            {day.start.format(
                                                                "HH:mm"
                                                            )}{" "}
                                                            -{" "}
                                                            {day.end.format(
                                                                "HH:mm"
                                                            )}
                                                        </p>
                                                    </Card>
                                                </Col>
                                            ))}

                                        {/* TODO replace this error message with not allowing the custom datepicker to pick dates that are not available */}
                                        {!selectedTime && (
                                            <p>There are no available times.</p>
                                        )}
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
