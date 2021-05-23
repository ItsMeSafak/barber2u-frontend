import React, { useState, useEffect, useCallback } from "react";

import moment from "moment";

import { Col, Layout, Row } from "antd";

import Status from "../../../../models/enums/Status";
import Reservation from "../../../../models/Reservation";

import { getReservations } from "../../../../services/reservation-service";

import { EURO_SYMBOL } from "../../../../assets/constants";

import Spinner from "../../../../components/spinner";
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
    const calculateIncome = useCallback((reservations: Reservation[]) => {
        const income = calculatePriceAmount(reservations);
        setTotalIncome(income);
    }, [setTotalIncome]);

    /**
     * This function calculates the total increase compared to the last month;
     * 
     * @param {Reservation[]} reservations last months reservations of the barber
     */
    const calculateIncrease = useCallback((lastReservations: Reservation[], currentReservations: Reservation[]) => {
        const lastIncome = calculatePriceAmount(lastReservations) === 0 ?
            100 : calculatePriceAmount(lastReservations);
        const currentIncome = calculatePriceAmount(currentReservations);
        const increase = Math.round((currentIncome * 100.0 / lastIncome) - 100);
        setTotalIncrease(increase);
    }, [setTotalIncrease]);

    /**
     * This function calculates the total income;
     * 
     * @param {Reservation[]} reservations this months reservations of the barber
     */
    const calculateCompleted = useCallback((reservations: Reservation[]) => {
        const currentMonthReservations = reservations.filter((res) =>
            moment().month === moment(res.date).month);
        setTotalCompleted(currentMonthReservations.length);
    }, [setTotalCompleted]);

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

        const currentMonthReservations = reservationObjects.filter((res) =>
            moment().month() === moment(res.date).month());

        const lastMonthReservations = reservationObjects.filter((res) =>
            (moment().month() - 1) === moment(res.date).month());

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
        reservations.length > 0 ?
            reservations.map((res) => res.services
                .map((ser) => ser.price).reduce((acc, price) => acc + price))
                .reduce((acc, pr) => acc + pr) : 0;

    return (
        <Layout className={styles.statistics}>
            <Content>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={isLoading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Total reservations completed this month",
                                        value: totalCompleted,
                                    }]}
                                positiveValueThreshold={1}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={isLoading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Total income this month",
                                        value: `${EURO_SYMBOL} ${totalIncome}`,
                                    }
                                ]}
                                numericValue={totalIncome}
                                positiveValueThreshold={1}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={isLoading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Percentual increase compared to last month",
                                        value: `${totalIncrease}%`,
                                    }
                                ]}
                                numericValue={totalIncrease}
                                positiveValueThreshold={1}
                            />
                        </Spinner>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
