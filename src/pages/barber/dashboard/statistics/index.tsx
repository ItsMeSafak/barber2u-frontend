import React, { useState, useEffect, useCallback } from "react";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row } from "antd";

import Review from "../../../../models/Review";
import Status from "../../../../models/enums/Status";
import Service from "../../../../models/Service";
import Spinner from "../../../../components/spinner";
import Reservation from "../../../../models/Reservation";
import CalendarPage from "../../../calendar";
import CardStatistic from "../../../../components/card-statistic";

import { EURO_SYMBOL } from "../../../../assets/constants";
import { fetchReviews } from "../../../../services/review-service";
import { getReservations } from "../../../../services/reservation-service";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the statistics page of a barber.
 *
 * @returns {JSX}
 */
const StatisticsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalIncrease, setTotalIncrease] = useState(0);
    const [reviews, setReviews] = useState<Review[]>([]);

    /**
     * This function fetches the reviews of a barber
     */
    const getReviews = useCallback(async () => {
        const response = await fetchReviews();
        if (!response) return;

        setReviews(response.data.getReceivedReviews);
    }, []);

    /**
     * This function calculates the total income;
     *
     * @param {Reservation[]} reservations this months reservations of the barber
     */
    const calculateIncome = useCallback(
        (reservations: Reservation[]) => {
            const income = calculatePriceAmount(reservations);
            setTotalIncome(income);
        },
        [setTotalIncome]
    );

    /**
     * This function calculates the total increase compared to the last month;
     *
     * @param {Reservation[]} reservations last months reservations of the barber
     */
    const calculateIncrease = useCallback(
        (
            lastReservations: Reservation[],
            currentReservations: Reservation[]
        ) => {
            const lastIncome = calculatePriceAmount(lastReservations);
            const currentIncome = calculatePriceAmount(currentReservations);
            const increase = Math.round(
                (currentIncome * 100.0) / lastIncome - 100
            );
            if (lastIncome !== 0) setTotalIncrease(increase);
        },
        [setTotalIncrease]
    );

    /**
     * This function calculates the total income;
     *
     * @param {Reservation[]} reservations this months reservations of the barber
     */
    const calculateCompleted = useCallback(
        (reservations: Reservation[]) => {
            const currentMonthReservations = reservations.filter(
                (reservation) =>
                    moment().month === moment(reservation.getDate).month
            );
            setTotalCompleted(currentMonthReservations.length);
        },
        [setTotalCompleted]
    );

    /**
     * This function fetches the reservations of the barber;
     */
    const fetchReservations = useCallback(async () => {
        const response = await getReservations(Status.Completed);
        if (!response) return;

        const { data } = response;
        const reservationObjects = data.map((reservation: Reservation) =>
            Object.setPrototypeOf(reservation, Reservation.prototype)
        );

        const currentMonthReservations = reservationObjects.filter(
            (reservation) =>
                moment().month() === moment(reservation.date).month()
        );

        const lastMonthReservations = reservationObjects.filter(
            (reservation) =>
                moment().month() - 1 === moment(reservation.date).month()
        );

        calculateIncome(currentMonthReservations);
        calculateCompleted(currentMonthReservations);
        calculateIncrease(lastMonthReservations, currentMonthReservations);
    }, [calculateIncome, calculateCompleted, calculateIncrease]);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchReservations(), getReviews()]).then(() =>
            setIsLoading(false)
        );
        return () => setIsLoading(true);
    }, [fetchReservations, getReviews]);

    /**
     * Calculate the average rating of all reviews
     */
    const calculateAverageRating = () =>
        reviews && reviews.length > 0
            ? reviews
                  .map((review) => review.getStarAmount)
                  .reduce((a, b) => a + b) / reviews.length
            : 0;

    /**
     * This function calculates the total amount of money of the given reservations
     *
     * @param {Reservation[]} reservations reservations to be calculated with
     * @returns {number}
     */
    const calculatePriceAmount = (reservations: Reservation[]): number =>
        reservations.length > 0
            ? reservations
                  .map((reservation) =>
                      reservation.getServices
                          .map(
                              (service) =>
                                  Object.setPrototypeOf(
                                      service,
                                      Service.prototype
                                  ).getPrice
                          )
                          .reduce((accumulator, price) => accumulator + price)
                  )
                  .reduce((accumulator, price) => accumulator + price)
            : 0;

    /**
     * This function renders the barber statistics.
     * Such as the income and finished reservations.
     *
     * @returns {JSX}
     */
    const renderBarberStatistics = () => (
        <Row className={styles.row} gutter={[20, 20]}>
            <Col xs={24} lg={12} xl={6}>
                <Spinner spinning={isLoading}>
                    <CardStatistic
                        data={[
                            {
                                title: `Reservations completed (${moment().format(
                                    "MMM"
                                )})`,
                                value: totalCompleted,
                            },
                        ]}
                        positiveValueThreshold={1}
                    />
                </Spinner>
            </Col>
            <Col xs={24} lg={12} xl={6}>
                <Spinner spinning={isLoading}>
                    <CardStatistic
                        data={[
                            {
                                title: `Total income (${moment().format(
                                    "MMMM"
                                )})`,
                                value: totalIncome.toFixed(2),
                                prefix: EURO_SYMBOL,
                            },
                        ]}
                        positiveValueThreshold={1}
                    />
                </Spinner>
            </Col>
            <Col xs={24} lg={12} xl={6}>
                <Spinner spinning={isLoading}>
                    <CardStatistic
                        data={[
                            {
                                title: `Income increase (${moment().format(
                                    "MMMM"
                                )})`,
                                value: totalIncrease,
                                suffix: "%",
                            },
                        ]}
                        positiveValueThreshold={1}
                    />
                </Spinner>
            </Col>
            <Col xs={24} lg={12} xl={6}>
                <Spinner spinning={isLoading}>
                    <CardStatistic
                        data={[
                            {
                                title: "Total received reviews",
                                value: reviews.length,
                                prefix: (
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={getIconByPrefixName(
                                            "fas",
                                            "comments"
                                        )}
                                        size="1x"
                                    />
                                ),
                            },
                            {
                                title: "Average rating",
                                value: calculateAverageRating().toFixed(1),
                                prefix: (
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={getIconByPrefixName(
                                            "fas",
                                            "star"
                                        )}
                                        size="1x"
                                    />
                                ),
                            },
                        ]}
                    />
                </Spinner>
            </Col>
        </Row>
    );

    return (
        <Layout className={styles.statistics}>
            <Content>
                {renderBarberStatistics()}
                <CalendarPage />
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
