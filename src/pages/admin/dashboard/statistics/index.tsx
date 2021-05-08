import React, { useCallback, useEffect, useState } from "react";

import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Layout, Row, Col, Tooltip, Divider } from "antd";

import Spinner from "../../../../components/spinner";
import CardStatistic from "../../../../components/card-statistic";

import {
    getHealthStatus,
    shutdownAPIServer,
} from "../../../../services/actuator-service";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * Admin statistics page.
 *
 * @returns {JSX}
 */
const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [APIServerStatus, setAPIServerStatus] = useState("N/A");
    const [databaseServerStatus, setDatabaseServerStatus] = useState("N/A");
    const [mailServerStatus, setMailServerStatus] = useState("N/A");
    const [APIServerDiskUsage, setAPIServerDiskUsage] = useState(Number.NaN);

    const fetchServerStatuses = useCallback(async () => {
        setLoading(true);
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
        setLoading(false);
    }, [
        setAPIServerStatus,
        setDatabaseServerStatus,
        setMailServerStatus,
        setAPIServerDiskUsage,
        setLoading,
    ]);

    useEffect(() => {
        fetchServerStatuses();

        return () => setLoading(true);
    }, [
        APIServerStatus,
        databaseServerStatus,
        mailServerStatus,
        fetchServerStatuses,
        setLoading,
    ]);

    /**
     * TODO...
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
     * TODO...
     */
    const onShutdownAPIServerClick = async () => {
        shutdownAPIServer()
            .then((response) =>
                showHttpResponseNotification(response.message, 200)
            )
            .catch((error) => showHttpResponseNotification(error.message, 422));
    };

    /**
     * TODO...
     * @param parentIcon
     * @param childIcon
     * @returns
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
                                        value: 19,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "user-tie",
                                        }),
                                    },
                                    {
                                        title: "Verified",
                                        value: 19,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "user-tie" },
                                            { icon: "check" }
                                        ),
                                    },
                                    {
                                        title: "Active",
                                        value: 19,
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
                                        value: 19,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "cut",
                                        }),
                                    },
                                    {
                                        title: "Verified",
                                        value: 19,
                                        prefix: renderIconWithAdditionalIcon(
                                            { icon: "cut" },
                                            { icon: "check" }
                                        ),
                                    },
                                    {
                                        title: "Active",
                                        value: 19,
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
                                        value: 19,
                                        prefix: renderIconWithAdditionalIcon({
                                            icon: "calendar",
                                        }),
                                    },
                                    {
                                        title: "Completed",
                                        value: 19,
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
