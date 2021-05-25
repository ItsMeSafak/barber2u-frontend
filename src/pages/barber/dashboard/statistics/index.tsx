import React, { useState, useEffect, useCallback } from "react";

import moment from "moment";

import { Col, Layout, Row } from "antd";

import Status from "../../../../models/enums/Status";
import Reservation from "../../../../models/Reservation";

import { getReservations } from "../../../../services/reservation-service";

import { EURO_SYMBOL } from "../../../../assets/constants";

import Spinner from "../../../../components/spinner";
import CalendarPage from "../../../calendar";
import CardStatistic from "../../../../components/card-statistic";

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
                    moment().month === moment(reservation.date).month
            );
            setTotalCompleted(currentMonthReservations.length);
        },
        [setTotalCompleted]
    );

    /**
     * This function fetches the reservations of the barber;
     */
    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
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

        setIsLoading(false);
    }, [calculateIncome, calculateCompleted, calculateIncrease]);

    useEffect(() => {
        fetchReservations();
        return () => setIsLoading(true);
    }, [fetchReservations]);

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
                      reservation.services
                          .map((service) => service.price)
                          .reduce((accumulator, price) => accumulator + price)
                  )
                  .reduce((accumulator, price) => accumulator + price)
            : 0;

    return (
        <Layout className={styles.statistics}>
            <Content>
                <Row className={styles.row} gutter={[20, 20]}>
                    <Col xs={24} lg={8}>
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
                    <Col xs={24} lg={8}>
                        <Spinner spinning={isLoading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: `Total income (${moment().format(
                                            "MMMM"
                                        )})`,
                                        value: totalIncome,
                                        prefix: EURO_SYMBOL,
                                    },
                                ]}
                                positiveValueThreshold={1}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={isLoading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: `Income increasement/decreasement (${moment().format(
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
                </Row>
                <CalendarPage />
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
