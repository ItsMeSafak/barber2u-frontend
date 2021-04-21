import React, { useContext, useEffect, useState } from "react";

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

import moment, { Moment } from "moment";

import Barber from "../../models/Barber";
import Service2 from "../../models/Service2";
import MomentRange from "../../models/MomentRange";
import { TempBarber } from "../../models/TempBarber";

import { AuthContext } from "../../contexts/auth-context";

import {
    fetchBarberAvailabilityRange,
    fetchBarberListing,
} from "../../services/listing-service";

import { showNotification } from "../../assets/functions/notification";

import styles from "./styles.module.scss";

const { TabPane } = Tabs;
// TODO check map keys (model key & values check in case they are not sync with DB)

// TODO carousel for the time cards inside the Timepicker
// TODO Axios api post call to create appointment

// TODO (optional) change the time picker slots to the custom generic card component

/**
 * A Item component for the Barber listing page and gives an overview of the barber information, such as: services,
 * pricing, availability, portfolio, reviews and rating.
 * @param barber The user object of the barber
 * @param tempBarber The temporary user object of a barber from json data.
 * @constructor
 */
const ListingItem: React.FC<{ barber: Barber; tempBarber: TempBarber }> = ({
    barber,
    tempBarber,
}) => {
    /**
     * The access token for using the API requests.
     */
    const { accessToken } = useContext(AuthContext);

    const PROFILE_IMAGE_WIDTH = 150;
    const PORTFOLIO_IMAGE_WIDTH = 200;

    /**
     * State for collapsing the bottom container of the barber container
     */
    const [collapsed, setCollapsed] = useState(false);

    /**
     * State for the selected barber services.
     */
    const [services, setServices] = useState<Service2[]>([]);

    /**
     * State for the selected barber services.
     */
    const [selectedServices, setSelectedServices] = useState<Service2[]>([]);

    /**
     * State for the time required in order to complete all the services on time.
     * Metric of the time in in Meters.
     */
    const [timeRequired, setTimeRequired] = useState<number>(0);

    /**
     * State for the custom DatePicker in the DayPicker Row
     */
    const [customDatePickerValue, setCustomDatePickerValue] = useState<Moment>(
        moment().startOf("day").add(7, "day")
    );

    /**
     * Toggle the collapse state of the barber bottom container
     */
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const [availability, setAvailability] = useState<MomentRange[]>([]);

    /**
     * The abbreviations of the weekday names
     */
    const weekDayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    /**
     * The weekdays for the daypicker selector
     */
    const weekDays = availability
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

    /**
     * State for the selected day in the day picker
     */
    const [selectedDay, setSelectedDay] = useState<Moment | undefined>();

    /**
     * It finds the first next available time on the same day as the selected day
     * @param day The selected day
     */
    const findFirstTimeMoment = (day: Moment | undefined) =>
        day &&
        availability.find(
            (x) =>
                x.startTime.isSame(day, "day") &&
                x.startTime.isSameOrAfter(moment())
        );

    /**
     * State for the selected time in the time picker
     */
    const [selectedTime, setSelectedTime] = useState<MomentRange | undefined>(
        findFirstTimeMoment(selectedDay)
    );

    /**
     * Filter the list of times that the Barber is open and split all the times based on the period,
     * so the customer can select a time without interfering with another time.
     */
    const getTimes = () => {
        // Initial of a list in which start and end times are saved.
        const times: MomentRange[] = [];

        if (!selectedDay) return times;

        // Filter and map based on the opening times, so the times can be saved in the times list.
        availability
            // Filter the opening times', so that only the times of the selected day are mapped.
            .filter(
                (x) =>
                    selectedDay.isSame(x.startTime, "day") &&
                    x.startTime.isSameOrAfter(moment())
            )
            .forEach((day) => {
                // TODO (optional) check if this line still works if removed/code optimized
                let startTime = day.startTime.clone();

                // The amount of minutes between the start time and end time.
                const timeDifferenceInMinutes = moment
                    .duration(day.endTime.diff(day.startTime))
                    .asMinutes();

                // The amount that the period fits in the time difference
                let timePeriod = timeDifferenceInMinutes;
                let numberOfSlots = 1;
                if (timeRequired !== 0) {
                    timePeriod = timeRequired;
                    numberOfSlots = timeDifferenceInMinutes / timePeriod;
                }

                // loop over the start time for exact the amount
                for (let i = 0; i < numberOfSlots; i++) {
                    const endTime = startTime
                        .clone()
                        .add(timePeriod, "minutes");

                    // Only allow time slots if they fit within the availability.
                    if (endTime.isSameOrBefore(day.endTime)) {
                        times.push(new MomentRange(startTime, endTime));
                        startTime = endTime;
                    }
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

    /**
     * Fetch the barber listing data from the server with the listing service.
     */
    const getListing = async () => {
        if (accessToken)
            await fetchBarberListing(accessToken, barber.getUser.getEmail)
                .then((response) => {
                    setServices(response.data.services);
                })
                .catch((error) =>
                    showNotification(undefined, error.message, error.status)
                );
    };

    /**
     * Fetch the barber listing data from the server with the listing service.
     * @param time time required for an availability timeslot
     */
    const getAvailability = async (time: number) => {
        if (accessToken)
            await fetchBarberAvailabilityRange(
                accessToken,
                barber.getUser.getEmail,
                time,
                moment().format("YYYY-MM-DD"),
                moment().add(7, "day").format("YYYY-MM-DD")
            )
                .then((response) => {
                    setAvailability(response.data);
                    // if there is at least 1 availability
                    if (response.data.length >= 1) {
                        if (!selectedDay) {
                            setSelectedDay(response.data[0].startTime);
                        }
                        if (!selectedTime) {
                            setSelectedTime(
                                findFirstTimeMoment(response.data[0].startTime)
                            );
                        }
                    }
                })
                .catch((error) =>
                    showNotification(undefined, error.message, error.status)
                );
    };

    /**
     * Fetch the barber listing everytime on load of the component. The
     * accessToken is refreshed after the page is loaded, so the barbers should
     * get refreshed.
     */
    useEffect(() => {
        getListing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    /**
     * Every time the selected services changes:
     * - Calculated the time period required.
     * - Fetch the availabilities with the new time required.
     */
    useEffect(() => {
        // TODO (optional) check if it is easier to sum. something like list.sum()
        // Calculate the time required
        let time = 0;
        selectedServices.forEach((x) => {
            time += x.time;
        });
        setTimeRequired(time);

        getAvailability(time);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedServices]);

    /**
     * Every time the selected day changes:
     * - Set the first available timeslot.
     */
    useEffect(() => {
        setSelectedTime(findFirstTimeMoment(selectedDay));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDay]);

    /**
     * Get the total price of the selected services
     */
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedServices.forEach((service) => {
            totalPrice += service.price;
        });
        return totalPrice;
    };

    /**
     * Render the select box of which all the barber services are displayed with
     * their pricing. The user is able to select multiple services and the value
     * is stored in the state {@link selectedServices}.
     */
    const renderServiceSelect = () => (
        <Select
            mode="multiple"
            maxTagCount="responsive"
            className={styles.selectBox}
            placeholder="Select a service"
            onChange={(selected) => {
                const serviceList: Service2[] = [];
                (selected as []).forEach((serviceName) => {
                    const serviceFound = services.find(
                        (service) => service.name === serviceName
                    );
                    if (serviceFound) {
                        serviceList.push(serviceFound);
                    }
                });
                setSelectedServices(serviceList);
            }}
        >
            {services.map((service) => (
                <Select.Option value={service.name} key={service.id}>
                    <Row justify="space-between" gutter={16}>
                        <Col>{service.name}</Col>
                        <Col>&euro; {service.price}</Col>
                    </Row>
                </Select.Option>
            ))}
        </Select>
    );

    /**
     * Render the day picker selector, so the user can pick a day the within
     * next 7 days the barber is available. The value is stores in the state
     * {@link selectedDay}
     */
    const renderDayPicker = () =>
        weekDays.length > 0 &&
        weekDays.map((day) => (
            <Col
                key={day.day()}
                className={`
                    ${styles.dayPicker} 
                    ${
                        selectedDay?.isSame(day, "day")
                            ? styles.dayPickerActive
                            : ""
                    }
                `}
                onClick={() => setSelectedDay(day)}
            >
                {weekDayAbbreviations[day.weekday()]}
            </Col>
        ));

    /**
     * Render the custom day picker, that is displayed as a calender icon which
     * opens a datepicker component. The user can this way select a day outside
     * the 7 days already displayed in the {@link renderDayPicker}. The value
     * is stored in the state {@link selectedDay}
     */
    const renderCustomDayPicker = () =>
        weekDays.length > 0 && (
            <Col
                className={`
                ${styles.dayPicker} 
                ${
                    selectedDay?.isSame(customDatePickerValue, "day")
                        ? styles.dayPickerActive
                        : ""
                }
            `}
            >
                <DatePicker
                    className={styles.antdDatepicker}
                    bordered={false}
                    allowClear={false}
                    inputReadOnly
                    defaultValue={customDatePickerValue}
                    onClick={() => setSelectedDay(customDatePickerValue)}
                    onChange={(date) => {
                        if (date) {
                            setSelectedDay(date);
                            setCustomDatePickerValue(date);
                        }
                    }}
                />
            </Col>
        );

    /**
     * Render the time picker, that is displaying multiple slots of the
     * availability from the barber. The slots are calculated by the required
     * time needed for your selected services. If a service required time is
     * bigger than a timeslot, the timeslot will not be show.
     * The timeslots are based on the day selected in the @link renderDayPicker}
     * or {@link renderCustomDayPicker}.
     * The selected time is stored in the state {@link selectedTime}
     */
    const renderTimePicker = () =>
        selectedTime &&
        getTimes().map((day) => (
            <Col key={day.startTime.valueOf()}>
                <Card
                    className={`
                        ${styles.cards} 
                        ${
                            day.startTime.isSame(selectedTime.startTime)
                                ? styles.cardsActive
                                : ""
                        }
                    `}
                    title={getPartOfTheDayString(day.startTime)}
                    size={
                        !day.startTime.isSame(selectedTime.startTime)
                            ? "small"
                            : "default"
                    }
                    onClick={() => setSelectedTime(day)}
                >
                    <p>{day.startTime.format("D MMMM")}</p>
                    <p>
                        {day.startTime.format("HH:mm")} -{" "}
                        {day.endTime.format("HH:mm")}
                    </p>
                </Card>
            </Col>
        ));

    /**
     * TODO Style/make the summary prettier
     * Render the summary, so the user can get an overview of the selected
     * services, the total cost, the time required to fulfil the services,
     * the selected day and time.
     */
    const renderSummary = () => (
        <Col>
            <Row>
                <h2>Summary:</h2>
            </Row>
            <Row>
                Services selected:
                <ul>
                    {selectedServices.map((service) => (
                        <li key={service.id}>{service.name}</li>
                    ))}
                </ul>
            </Row>
            <Row>Total price: &euro; {calculateTotalPrice()}</Row>
            <Row>Time required: {timeRequired} minutes</Row>
            <Row>
                Selected DateTime from {selectedTime?.startTime.calendar()} to{" "}
                {selectedTime?.endTime.calendar()}
            </Row>
        </Col>
    );

    /**
     * Render the portfolio, so examples of work can be shown in multiple
     * images grouped in the service name
     */
    const renderPortfolio = () =>
        tempBarber.portfolio.map((service) => (
            <Col key={service.name}>
                <Row className={styles.serviceName}>{service.name}</Row>
                <Row>
                    {service.imageUrls.map((imageUrl) => (
                        <Col key={imageUrl} className={styles.portfolioImage}>
                            <Image
                                width={PORTFOLIO_IMAGE_WIDTH}
                                src={imageUrl}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>
        ));

    /**
     * Render the reviews, so everyone can share their opinion and experiences
     * with the barber and other users.
     */
    const renderReviews = () =>
        tempBarber.reviews.map((review) => (
            <div key={tempBarber.name} className={styles.reviewContainer}>
                <Row>
                    <Col span={12} className={styles.reviewAuthor}>
                        {review.author}
                    </Col>
                    <Col span={12} className={styles.reviewRate}>
                        <Rate
                            disabled
                            allowHalf
                            className={styles.rating}
                            defaultValue={review.rate}
                        />
                    </Col>
                </Row>
                <Row className={styles.createdOn}>{review.created_on}</Row>
                <Row>"{review.description}"</Row>
            </div>
        ));

    return (
        <Col className={styles.container}>
            <Row className={styles.containerTop}>
                <Col>
                    <Image
                        width={PROFILE_IMAGE_WIDTH}
                        src={tempBarber.imageUrl}
                        preview={false}
                        className={styles.profileImage}
                    />
                </Col>
                <Col className={styles.containerTopContent}>
                    <Row>
                        <span className={styles.barberName}>
                            {barber.getUser.getFullNameWithInitial}
                        </span>
                    </Row>
                    <Row>
                        <Rate
                            disabled
                            allowHalf
                            className={styles.rating}
                            defaultValue={tempBarber.rate}
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
                            <Row>{renderServiceSelect()}</Row>
                            <Row>Availability:</Row>
                            <Row>
                                <div className={styles.dateTimePicker}>
                                    <Row>
                                        {renderDayPicker()}
                                        {renderCustomDayPicker()}
                                    </Row>
                                    <Row gutter={[16, 24]} align="middle">
                                        {renderTimePicker()}

                                        {/* TODO replace this error message with not allowing the custom datepicker to pick dates that are not available */}
                                        {!selectedTime && (
                                            <p>There are no available times.</p>
                                        )}
                                    </Row>
                                </div>
                            </Row>
                            <Row>{renderSummary()}</Row>
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
                            {renderPortfolio()}
                        </TabPane>
                        <TabPane
                            tab={<div className={styles.tab}>Reviews</div>}
                            key="3"
                        >
                            <Col>{renderReviews()}</Col>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Col>
    );
};

export default ListingItem;
