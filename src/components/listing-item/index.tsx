import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import {
    Button,
    Card,
    Col,
    DatePicker,
    Image,
    Rate,
    Row,
    Select,
    Tabs,
} from "antd";

import Slider from "react-slick";
import moment, { Moment } from "moment";

import Barber from "../../models/Barber";
import Service from "../../models/Service";
import MomentRange from "../../models/MomentRange";
import { TempBarber } from "../../models/TempBarber";

import {
    fetchBarberListing,
    fetchBarberWorkdays,
    fetchBarberAvailability,
} from "../../services/listing-service";
import { sendCreateReservation } from "../../services/reservation-service";

import {
    AFTERNOON_STRING,
    DATE_FORMAT,
    EVENING_STRING,
    MORNING_STRING,
    NIGHT_STRING,
} from "../../assets/constants";

import { showHttpResponseNotification } from "../../assets/functions/notification";

import styles from "./styles.module.scss";

const { TabPane } = Tabs;

// TODO (optional) change the time picker slots to the custom generic card component

/**
 * A Item component for the Barber listing page and gives an overview of the barber information, such as: services,
 * pricing, availability, portfolio, reviews and rating.
 *
 * @param barber {Barber} The user object of the barber
 * @param tempBarber {TempBarber} The temporary user object of a barber from json data.
 * @returns {JSX}
 */
const ListingItem: React.FC<{ barber: Barber; tempBarber: TempBarber, imageSrc: string }> = ({
    barber,
    tempBarber,
    imageSrc
}) => {
    const sliderSettings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    };

    const history = useHistory();

    const slickRef = useRef<Slider>(null);

    /**
     * Reset slick to first position
     */
    const resetSlick = () => slickRef.current?.slickGoTo(0);

    const PROFILE_IMAGE_WIDTH = 300;
    const PORTFOLIO_IMAGE_WIDTH = 200;

    /**
     * State for collapsing the bottom container of the barber container
     */
    const [collapsed, setCollapsed] = useState<boolean>(false);

    /**
     * State for the selected barber services.
     */
    const [services, setServices] = useState<Service[]>([]);

    /**
     * State for the selected barber services.
     */
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);

    /**
     * Every time the selected services changes, the time required is recalculated.
     */
    useEffect(() => {
        setTimeRequired(calculateTimeRequired());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedServices]);

    /**
     * State for the time required in order to complete all the services on time.
     * Metric of the time in in Meters.
     */
    const [timeRequired, setTimeRequired] = useState<number>(0);

    /**
     * Every time the time required is calculated, the workdays gets fetched and filtered
     */
    useEffect(() => {
        getWorkDays(timeRequired);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRequired]);

    /**
     * State for the custom DatePicker in the DayPicker Row
     */
    const [customDatePickerValue, setCustomDatePickerValue] = useState<Moment>(
        moment().startOf("day").add(7, "day")
    );

    /**
     * State for the availability timeslots
     */
    const [availability, setAvailability] = useState<MomentRange[]>([]);

    /**
     * State for the available workdays
     */
    const [workdays, setWorkDays] = useState<Moment[]>([]);

    /**
     * The workdays for the daypicker selector
     */
    const getWeekWorkdays = workdays.filter((x) => {
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
     * @param day {Moment | undefined} The selected day
     * @param timeMoments {MomentRange[]} The time moments that the barber is available
     */
    const findFirstTimeMoment = (
        day: Moment | undefined,
        timeMoments: MomentRange[]
    ) =>
        day &&
        timeMoments.find(
            (x) =>
                x.startTime.isSame(day, "day") &&
                x.startTime.isSameOrAfter(moment())
        );

    /**
     * Every time the selected day changes:
     * - Set the first available timeslot.
     */
    useEffect(() => {
        getAvailability(timeRequired);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDay]);

    /**
     * State for the selected time in the time picker
     */
    const [selectedTime, setSelectedTime] = useState<MomentRange | undefined>(
        findFirstTimeMoment(selectedDay, [])
    );

    /**
     * Get the part of the day from a Moment and return the part in a string.
     * Possible returns are: Morning / Afternoon / Evening / Night.
     *
     * @param day {Moment} A moment of the day of which the part will be found
     */
    const getPartOfTheDayString = (day: Moment) => {
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
     * Fetch the barber listing everytime on load of the component.
     */
    useEffect(() => {
        getListing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Fetch the barber listing data from the server with the listing service.
     */
    const getListing = async () => {
        await fetchBarberListing(barber.getUser.getEmail)
            .then((response) => {
                setServices(response.data.services);
            })
            .catch((error) =>
                showHttpResponseNotification(error.message, error.status)
            );
    };

    /**
     * Fetch the barber working days from the server with the listing service.
     *
     * @param time {number} time required in minutes for an availability timeslot
     */
    const getWorkDays = async (time: number) => {
        if (time > 0)
            await fetchBarberWorkdays(barber.getUser.getEmail, time)
                .then((response) => {
                    setWorkDays(response.data);
                    if (response.data.length > 0)
                        setSelectedDay(response.data[0]);
                })
                .catch((error) =>
                    showHttpResponseNotification(
                        error.message,
                        error.status
                    )
                );
    };

    /**
     * Fetch the barber availabilities of a specific day from the server with the listing service.
     *
     * @param time {number} time required in minutes for an availability timeslot
     */
    const getAvailability = async (time: number) => {
        if (time > 0 && selectedDay)
            await fetchBarberAvailability(
                barber.getUser.getEmail,
                time,
                selectedDay.format(DATE_FORMAT)
            )
                .then((response) => {
                    setAvailability(response.data);
                    setSelectedTime(
                        findFirstTimeMoment(selectedDay, response.data)
                    );
                    resetSlick();
                })
                .catch((error) =>
                    showHttpResponseNotification(
                        error.message,
                        error.status
                    )
                );
    };

    /**
     * Create a reservation request via the reservation service to the server.
     */
    const createReservation = async () => {
        if (selectedTime)
            await sendCreateReservation(
                barber.getUser.getEmail,
                selectedServices,
                selectedTime
            )
                .then((response) => {
                    showHttpResponseNotification(
                        response.message,
                        response.status
                    );
                })
                .catch((error) =>
                    showHttpResponseNotification(
                        error.message,
                        error.status
                    )
                );
    };

    /**
     * Get the total time required of the selected services
     */
    const calculateTimeRequired = () =>
        selectedServices
            .map((service) => service.time)
            .reduce((x, y) => x + y, 0);

    /**
     * Get the total price of the selected services
     */
    const calculateTotalPrice = () =>
        selectedServices
            .map((service) => service.price)
            .reduce((x, y) => x + y, 0);

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
                const serviceList: Service[] = [];
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
        getWeekWorkdays.length > 0 &&
        getWeekWorkdays.map((day) => (
            <Col
                key={day.day()}
                flex={1}
                className={`
                    ${styles.dayPicker} 
                    ${selectedDay?.isSame(day, "day")
                        ? styles.dayPickerActive
                        : ""
                    }
                `}
                onClick={() => setSelectedDay(day)}
            >
                {day.format("ddd")}
            </Col>
        ));

    /**
     * Render the custom day picker, that is displayed as a calender icon which
     * opens a datepicker component. The user can this way select a day outside
     * the 7 days already displayed in the {@link renderDayPicker}. The value
     * is stored in the state {@link selectedDay}
     */
    const renderCustomDayPicker = () =>
        getWeekWorkdays.length > 0 && (
            <Col
                flex={1}
                className={`
                ${styles.dayPicker} 
                ${selectedDay?.isSame(customDatePickerValue, "day")
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
                    disabledDate={(d) =>
                        d.isBefore(workdays[0]) ||
                        d.isAfter(workdays[workdays.length - 1])
                    }
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
        availability.map((day) => (
            <div key={day.startTime.valueOf()}>
                <Card
                    className={`
                        ${styles.cards} 
                        ${day.startTime.isSame(selectedTime.startTime)
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
            </div>
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
                    {selectedServices.map((service: Service) => (
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
     * Render the reserve button that will send an appointment request.
     */
    const renderReserveButton = () => (
        <Button type="primary" onClick={createReservation}>
            Reserve
        </Button>
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

    const randomInt = Math.floor(Math.random() * 5) + 1;
    const cities = [0, "Amsterdam", "Rotterdam", "Den Haag", "Hilversum", "Breda"];
    return (
        <Col className={styles.container} onClick={() => history.push(`/listing/${barber.getUser.getEmail}`)}>
            <Row className={styles.containerTop}>
                <Col className={styles.imageCol} style={{ backgroundImage: `url(http://192.168.2.8:8080/api/media/${imageSrc})` }} />
                <Col className={styles.containerTopContent}>
                    <Row>
                        <h3 className={styles.barberName}>
                            {barber.getUser.getFullNameWithInitial} - {cities[randomInt]}
                        </h3>
                    </Row>
                    <Row>
                        <Rate
                            disabled
                            allowHalf
                            className={styles.rating}
                            defaultValue={randomInt}
                        /> ({(randomInt * 2) + 10})
                    </Row>
                </Col>
            </Row>
            <Row
                className={`${styles.containerBottom} ${collapsed ? "" : styles.hide
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
                            <Row justify="center">
                                <Col className={styles.dateTimePicker}>
                                    <Row>
                                        {renderDayPicker()}
                                        {renderCustomDayPicker()}
                                    </Row>
                                </Col>
                            </Row>
                            <div
                                className={`
                                ${styles.slider} 
                                ${styles.dateTimePicker}
                            `}
                            >
                                <Slider {...sliderSettings} ref={slickRef}>
                                    {renderTimePicker()}
                                    {(!selectedDay ||
                                        !selectedTime ||
                                        getWeekWorkdays.length === 0) && (
                                            <p>There are no available times.</p>
                                        )}
                                </Slider>
                            </div>
                            <Row>{renderSummary()}</Row>
                            <Row justify="end">
                                <Col>{renderReserveButton()}</Col>
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
