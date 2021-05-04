import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Row, Col, Tooltip } from "antd";

import CardStatistic from "../../../../components/card-statistic";

import {
    getHealthStatus,
    shutdownAPIServer,
} from "../../../../services/actuator-service";

import { showHttpResponseNotification } from "../../../../assets/functions/notification";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";
import Spinner from "../../../../components/spinner";

const { Content } = Layout;

/**
 * Moderator statistics page.
 *
 * @returns {JSX}
 */
const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [APIServerStatus, setAPIServerStatus] = useState("N/A");
    const [databaseServerStatus, setDatabaseServerStatus] = useState("N/A");
    const [mailServerStatus, setMailServerStatus] = useState("N/A");
    const [APIServerDiskUsage, setAPIServerDiskUsage] = useState(0);

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
                size="2x"
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

    return (
        <Layout className={styles.statistics}>
            <Content>
                {/* <Skeleton active loading={loading} /> */}
                <Row gutter={[20, 20]}>
                    <Col xs={24}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                title="Disk Usage"
                                value={APIServerDiskUsage}
                                negativeValueThreshold={50}
                                prefix={
                                    <FontAwesomeIcon
                                        icon={getIconByPrefixName("fas", "hdd")}
                                    />
                                }
                                suffix="%"
                                withProgressBar
                                progressBar={{
                                    percentage: APIServerDiskUsage,
                                    tooltipText: `${APIServerDiskUsage}% Usage`,
                                }}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                title="API Server"
                                value={APIServerStatus}
                                positiveValueThreshold="UP"
                                prefix={
                                    <FontAwesomeIcon
                                        icon={getIconByPrefixName(
                                            "fas",
                                            "server"
                                        )}
                                    />
                                }
                                actions={[renderShutdownAPIServerButton()]}
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                title="Database Server"
                                value={databaseServerStatus}
                                positiveValueThreshold="UP"
                                prefix={
                                    <FontAwesomeIcon
                                        icon={getIconByPrefixName(
                                            "fas",
                                            "database"
                                        )}
                                    />
                                }
                            />
                        </Spinner>
                    </Col>
                    <Col xs={24}>
                        <Spinner spinning={loading}>
                            <CardStatistic
                                title="Mail Server"
                                value={mailServerStatus}
                                positiveValueThreshold="UP"
                                prefix={
                                    <FontAwesomeIcon
                                        icon={getIconByPrefixName(
                                            "fas",
                                            "envelope"
                                        )}
                                    />
                                }
                            />
                        </Spinner>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
