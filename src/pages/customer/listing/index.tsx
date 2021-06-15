import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

import Slider from "react-slick";
import moment, { Moment } from "moment";
import {
    Layout,
    Row,
    Col,
    DatePicker,
    Card,
    Button,
    Empty,
    Divider,
} from "antd";

import Barber from "../../../models/Barber";
import Service from "../../../models/Service";
import MomentRange from "../../../models/MomentRange";

import { ScreenContext } from "../../../contexts/screen-context";

import { getBarberServices } from "../../../services/listings-service";
import {
    getBarberAvailability,
    getBarberWorkdays,
    createReservation,
} from "../../../services/reservation-service";

import {
    DATE_FORMAT,
    MEDIA_URL,
    HOUR_MINUTE_FORMAT,
} from "../../../assets/constants";

import styles from "./styles.module.scss";
import Skeleton from "../../../components/skeleton";
import { showHttpResponseNotification } from "../../../assets/functions/notification";

const { Content, Header } = Layout;

/**
 * Listing page.
 *
 * @returns {JSX}
 */
const ListingPage: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

    const location = useLocation<
        Array<{ barber: Barber; imageSource: string }>
    >();

    const { barber, imageSource } = location.state[0];
    const [isLoading, setLoading] = useState(true);
    const [barberObject, setBarberObject] = useState(barber);
    const [image, setImage] = useState(imageSource);
    const [services, setServices] = useState(Array<Service>());
    const [selectedServices, setSelectedServices] = useState(Array<Service>());
    const [timeSlots, setTimeSlots] = useState<MomentRange[]>([]);
    const [workdays, setWorkDays] = useState(Array<Moment>());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<
        MomentRange | undefined
    >();

    const customDatePickerValue = useRef(moment());
    const selectedDay = useRef(moment());
    const history = useHistory();

    const timeRequired = useRef(0);

    const slickRef = useRef<Slider>(null);

    /**
     * Get all services of a barber
     */
    const retrieveServices = useCallback(async () => {
        const response = await getBarberServices(barberObject.getEmail);
        const { data } = response;
        const serviceObjects = data.services.map(
            ({ id, name, description, price, time, active }) =>
                new Service(id, name, description, price, time, active ?? false)
        );
        setServices(serviceObjects);
    }, [barberObject]);

    /**
     * Get all timeslots from a date
     */
    const retrieveTimeSlots = useCallback(async () => {
        if (selectedDay.current && timeRequired.current > 0) {
            const response = await getBarberAvailability(
                barberObject.getEmail,
                timeRequired.current,
                selectedDay.current.format(DATE_FORMAT)
            );
            const { data } = response;
            setTimeSlots(data);
            // If at least 1 timeslot is available, set the first timeslot as default selected timeslot
            if (data.length > 0) {
                const firstTimeSlot = data[0];
                setSelectedTimeSlot(firstTimeSlot);
            }
        }
    }, [barberObject]);

    /**
     * Get all workdays of a barber
     */
    const retrieveWorkDays = useCallback(async () => {
        if (timeRequired.current > 0) {
            const response = await getBarberWorkdays(
                barberObject.getEmail,
                timeRequired.current
            );
            const { data } = response;
            setWorkDays(data);
            // If at least 1 workday is available, set the first workday as default selected day
            if (data) {
                await retrieveTimeSlots();
            }
        }
    }, [barberObject, retrieveTimeSlots]);

    /**
     * Get the total time required of the selected services
     */
    const calculateTimeRequired = useCallback(
        () =>
            selectedServices.reduce(
                (total, selectedService) => total + selectedService.getTime,
                0
            ),
        [selectedServices]
    );

    /**
     * Get the total price of the selected services
     */
    const calculateTotalPrice = () =>
        selectedServices
            .map((service) => service.getPrice)
            .reduce((x, y) => x + y, 0);

    /**
     * The workdays for the daypicker selector
     */
    const getWeekWorkdays =
        workdays &&
        workdays.filter((x) => {
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
     * Returns false if one of the requirements is not met in order to place a resernvation
     */
    const isAllowedToPlaceReservation = () =>
        selectedServices && selectedDay.current && selectedTimeSlot;

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
        ],
    };

    useEffect(() => {
        setBarberObject(Object.setPrototypeOf(barber, Barber.prototype));
        retrieveServices();
        setImage(imageSource);
        setLoading(false);
    }, [location, barber, imageSource, retrieveServices]);

    /**
     * Create a reservation request via the reservation service to the server.
     */
    const placeReservation = async () => {
        if (selectedTimeSlot) {
            const response = await createReservation(
                barberObject.getEmail,
                selectedServices,
                selectedTimeSlot
            );
            const { status, message } = response;
            showHttpResponseNotification(message, status);
            history.push("/customer");
        }
    };

    /**
     * Remove service from selectedServices list
     * @param service The service to remove from the list
     */
    function handleRemove(service: Service) {
        const newList = selectedServices.filter(
            (item) => item.getId !== service.getId
        );
        setSelectedServices(newList);
    }

    /**
     * Handle the selection of a service
     * @param service The service selected
     */
    function handleServiceSelection(service: Service) {
        setSelectedServices([...selectedServices, service]);
    }

    useEffect(() => {
        timeRequired.current = calculateTimeRequired();
        retrieveWorkDays();
    }, [selectedServices, calculateTimeRequired, retrieveWorkDays]);

    /**
     * Render the select box of which all the barber services are displayed with
     * their pricing. The user is able to select multiple services and the value
     * is stored in the state {@link selectedServices}.
     */
    const renderServiceSelect = () => (
        <Layout>
            {services.map((service) => (
                <Row
                    className={`${styles.serviceRow} ${
                        selectedServices.includes(service)
                            ? styles.serviceRowActive
                            : ""
                    }`}
                    key={service.getId}
                    onClick={() =>
                        selectedServices.includes(service)
                            ? handleRemove(service)
                            : handleServiceSelection(service)
                    }
                >
                    <Row className={styles.serviceRowSub}>
                        <h3>{service.getName}</h3>
                    </Row>
                    <Row className={styles.serviceRowSub}>
                        <p>{service.getDescription}</p>
                    </Row>
                    <Row className={styles.serviceRowSub}>
                        <span>
                            €{service.getPrice} - Avg duration of:{" "}
                            {service.getTime} minutes
                        </span>
                    </Row>
                </Row>
            ))}
        </Layout>
    );

    /**
     * Handle the selection of a day
     */
    function handleDaySelection(day: Moment) {
        selectedDay.current = day;
        retrieveTimeSlots();
    }

    /**
     * Render the custom day picker, that is displayed as a calender icon which
     * opens a datepicker component. The user can this way select a day outside
     * the 7 days already displayed in the {@link renderDayPicker}. The value
     * is stored in the state {@link selectedDay}
     */
    const renderCustomDayPicker = () => (
        <Col>
            <DatePicker
                className={styles.customDatePicker}
                bordered={true}
                allowClear={false}
                inputReadOnly
                defaultValue={selectedDay.current}
                onChange={(date) => {
                    if (date) {
                        customDatePickerValue.current = date;
                        handleDaySelection(date);
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
        timeSlots.length > 0 ? (
            timeSlots.map((timeslot) => (
                <div key={timeslot.startTime.format("x")}>
                    <Col className={styles.cardCol}>
                        <Card
                            title=""
                            className={`${styles.cards} ${
                                selectedTimeSlot === timeslot
                                    ? styles.cardActive
                                    : ""
                            }`}
                            onClick={() => {
                                setSelectedTimeSlot(timeslot);
                            }}
                        >
                            <p>{timeslot.startTime.format("D MMMM")}</p>
                            <p>
                                {timeslot.startTime.format("HH:mm")}
                                {" - "}
                                {timeslot.endTime.format("HH:mm")}
                            </p>
                        </Card>
                    </Col>
                </div>
            ))
        ) : (
            <Empty
                className={styles.emptyElement}
                description={
                    <p>No available timeslots for the selected date!</p>
                }
            />
        );
    /**
     * Render the summary, so the user can get an overview of the selected
     * services, the total cost, the time required to fulfil the services,
     * the selected day and time.
     */
    const renderSummary = () => (
        <div
            className={
                !isMobileOrTablet ? styles.summaryCol : styles.summaryColMobile
            }
        >
            {isMobileOrTablet && <Divider />}
            <Row className={styles.servicesTitle}>
                <h3>Summary</h3>
            </Row>
            {selectedServices.length > 0 && selectedTimeSlot ? (
                <Col>
                    <Row>
                        <span className={styles.bold}>Services selected:</span>
                        <ul>
                            {selectedServices.map((service: Service) => (
                                <li key={service.getId}>{service.getName}</li>
                            ))}
                        </ul>
                    </Row>
                    <Row>
                        <p className={styles.bold}>Total price:&nbsp; </p>&euro;{" "}
                        {calculateTotalPrice()}
                    </Row>
                    <Row>
                        <p className={styles.bold}>
                            Expected time required:&nbsp;
                        </p>
                        {timeRequired.current} minutes
                    </Row>
                    {selectedTimeSlot && (
                        <Row>
                            <p className={styles.bold}>Selected date:&nbsp;</p>
                            {selectedTimeSlot?.startTime.format(DATE_FORMAT)}
                        </Row>
                    )}
                    {selectedTimeSlot && (
                        <Row>
                            <p className={styles.bold}>Selected time:&nbsp;</p>
                            {selectedTimeSlot?.startTime.format(
                                HOUR_MINUTE_FORMAT
                            )}{" "}
                            -{" "}
                            {selectedTimeSlot?.endTime.format(
                                HOUR_MINUTE_FORMAT
                            )}
                        </Row>
                    )}
                    <Button
                        block
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className={styles.reservationButton}
                        disabled={!isAllowedToPlaceReservation()}
                        onClick={placeReservation}
                    >
                        Place reservation
                    </Button>
                </Col>
            ) : (
                <Empty
                    description={
                        <p>
                            Select at least one service and a timeslot to see a
                            summary!
                        </p>
                    }
                />
            )}
        </div>
    );

    return (
        <Layout>
            <Header
                className={styles.header}
                style={{ backgroundImage: `url(${MEDIA_URL}/${image})` }}
            >
                <h1>{barberObject.getFullNameWithInitial}</h1>
            </Header>
            <Content className={styles.mainSection}>
                <Skeleton loading={isLoading}>
                    <Row className={styles.servicesTitle}>
                        <h3>Services</h3>
                    </Row>
                    <Row>
                        <Col xs={24}>{renderServiceSelect()}</Col>
                    </Row>
                    <Divider />
                    <Row className={styles.servicesTitle}>
                        <h3>Available slots</h3>
                    </Row>
                    {getWeekWorkdays && selectedServices.length > 0 && (
                        <Row className={styles.dateTimePicker}>
                            <Col xs={24}>{renderCustomDayPicker()}</Col>
                        </Row>
                    )}
                    <Row className={styles.availableCarousel}>
                        <Col xs={24}>
                            <Slider {...sliderSettings} ref={slickRef}>
                                {selectedServices.length > 0 ? (
                                    renderTimePicker()
                                ) : (
                                    <Empty
                                        className={styles.emptyElement}
                                        description={
                                            <p>
                                                Select at least one service to
                                                see the available timeslots!
                                            </p>
                                        }
                                    />
                                )}
                            </Slider>
                        </Col>
                    </Row>
                    {renderSummary()}
                </Skeleton>
            </Content>
        </Layout>
    );
};

export default ListingPage;
