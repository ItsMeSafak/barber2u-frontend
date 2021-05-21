import React, { useCallback, useEffect, useState } from "react";

import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Layout, Row, Col, Tooltip, Divider } from "antd";

import User from "../../../../models/User";
import Barber from "../../../../models/Barber";
import Spinner from "../../../../components/spinner";
import Reservation from "../../../../models/Reservation";
import CardStatistic from "../../../../components/card-statistic";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";
import {
    getBarbers,
    getCustomers,
    getReservations,
} from "../../../../services/admin-service";
import {
    getHealthStatus,
    shutdownAPIServer,
} from "../../../../services/actuator-service";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * Admin statistics page.
 *
 * @returns {JSX}
 */
const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState<Array<User>>([]);
    const [barbers, setBarbers] = useState<Array<Barber>>([]);
    const [reservations, setReservations] = useState<Array<Reservation>>([]);
    const [APIServerStatus, setAPIServerStatus] = useState("N/A");
    const [databaseServerStatus, setDatabaseServerStatus] = useState("N/A");
    const [mailServerStatus, setMailServerStatus] = useState("N/A");
    const [APIServerDiskUsage, setAPIServerDiskUsage] = useState(Number.NaN);

    const fetchServerStatuses = useCallback(async () => {
        const response = await getHealthStatus();
        if (!response) return;

        const { diskSpace, mail, mongo } = response.components;
        setAPIServerStatus(response.status);
        setDatabaseServerStatus(mongo.status);
        setMailServerStatus(mail.status);

        if (diskSpace.details) {
            const { total, free } = diskSpace.details;
            const diskUsage = Number(
                (((total - free) / total) * 100).toFixed(1)
            );
            setAPIServerDiskUsage(diskUsage);
        }
    }, [
        setAPIServerStatus,
        setDatabaseServerStatus,
        setMailServerStatus,
        setAPIServerDiskUsage,
    ]);

    const fetchCustomers = useCallback(async () => {
        const response = await getCustomers();
        if (!response) return;

        const { data } = response;
        const userObjects = data.map((user: User) =>
            Object.setPrototypeOf(user, User.prototype)
        );
        setCustomers(userObjects);
    }, []);

    const fetchBarbers = useCallback(async () => {
        const response = await getBarbers();
        if (!response) return;

        const { data } = response;
        const userObjects = data.map(
            ({ user, companyName, kvkNumber, btwVatNumber, workRadius }) =>
                new Barber(
                    Object.setPrototypeOf(user, User.prototype),
                    companyName,
                    kvkNumber,
                    btwVatNumber,
                    workRadius
                )
        );
        setBarbers(userObjects);
    }, []);

    const fetchReservations = useCallback(async () => {
        const response = await getReservations();
        if (!response) return;

        const { data } = response;
        const reservationObjects = data.map((reservation: Reservation) =>
            Object.setPrototypeOf(reservation, Reservation.prototype)
        );
        setReservations(reservationObjects);
    }, []);

    useEffect(() => {
        Promise.all([
            fetchServerStatuses(),
            fetchCustomers(),
            fetchBarbers(),
            fetchReservations(),
        ]).then(() => setLoading(false));

        return () => setLoading(true);
    }, [fetchServerStatuses, fetchCustomers, fetchBarbers, fetchReservations]);

    /**
     * This function is used to render the API shutdown button.
     *
     * @returns {JSX}
     */
    const renderShutdownAPIServerButton = () => (
        <Tooltip title="Shutdown API Server">
            <FontAwesomeIcon
                key={1}
                className={styles.turnOffButton}
                onClick={() => onShutdownAPIServerClick()}
                icon={getIconByPrefixName("fas", "power-off")}
                size="lg"
            />
        </Tooltip>
    );

    /**
     * This function is used to shutdown the API once clicked.
     */
    const onShutdownAPIServerClick = async () => {
        shutdownAPIServer()
            .then((response) =>
                showHttpResponseNotification(response.message, 200)
            )
            .catch((error) => showHttpResponseNotification(error.message, 422));
    };

    /**
     * This function renders the icon with an additional icon.
     *
     * @param parentIcon The parent icon.
     * @param childIcon The child icon (which appears next to the parent)
     * @returns {JSX}
     */
    const renderIconWithAdditionalIcon = (
        parentIcon: FontAwesomeIconProps,
        childIcon?: FontAwesomeIconProps
    ) => (
        <>
            <FontAwesomeIcon {...parentIcon} />
            {childIcon && (
                <FontAwesomeIcon
                    className={styles.suffixIcon}
                    size="xs"
                    color="green"
                    {...childIcon}
                />
            )}
        </>
    );

    return (
        <Layout className={styles.statistics}>
            <Content>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                valueStyle={{ padding: 50 }}
                                data={[
                                    {
                                        title: "Customers",
                                        value: customers.length,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "user-tie",
                                        }),
                                    },
                                    {
                                        title: "Verified",
                                        value: customers.filter(
                                            (user) => user.getIsVerified
                                        ).length,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "user-tie" },
                                            { icon: "check" }
                                        ),
                                    },
                                    {
                                        title: "Active",
                                        value: customers.filter(
                                            (user) => user.getIsActive
                                        ).length,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "user-tie" },
                                            { icon: "unlock" }
                                        ),
                                    },
                                ]}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Barbers",
                                        value: barbers.length,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "cut",
                                        }),
                                    },
                                    {
                                        title: "Verified",
                                        value: barbers.filter(
                                            (user) => user.getIsVerified
                                        ).length,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "cut" },
                                            { icon: "check" }
                                        ),
                                    },
                                    {
                                        title: "Active",
                                        value: barbers.filter(
                                            (user) => user.getIsActive
                                        ).length,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "cut" },
                                            { icon: "unlock" }
                                        ),
                                    },
                                ]}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Appointments",
                                        value: reservations.length,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "calendar",
                                        }),
                                    },
                                    {
                                        title: "Completed",
                                        value: reservations.filter(
                                            (reservation) =>
                                                reservation.status ===
                                                "COMPLETED"
                                        ).length,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "calendar" },
                                            { icon: "check" }
                                        ),
                                    },
                                ]}
                            />
                        </Spinner>
                    </Col>
                    <Divider />
                    <Col xs={24} lg={12}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "Disk Usage",
                                        value: APIServerDiskUsage,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "hdd",
                                        }),
                                        suffix: "%",
                                    },
                                ]}
                                negativeValueThreshold={50}
                                withProgressBar
                                progressBar={{
                                    percentage: APIServerDiskUsage,
                                    tooltipText: `${APIServerDiskUsage}% Usage`,
                                }}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                data={[
                                    {
                                        title: "API",
                                        value: APIServerStatus,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "server",
                                        }),
                                    },
                                    {
                                        title: "Database",
                                        value: databaseServerStatus,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "database",
                                        }),
                                    },
                                    {
                                        title: "Mail",
                                        value: mailServerStatus,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "envelope",
                                        }),
                                    },
                                ]}
                                positiveValueThreshold="UP"
                                actions={[renderShutdownAPIServerButton()]}
                            />
                        </Spinner>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
