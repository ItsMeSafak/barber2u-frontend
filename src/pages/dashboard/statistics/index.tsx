import React from "react";

import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Content } from "antd/lib/layout/layout";
import { Animation, PieSeries } from "@devexpress/dx-react-chart";
import { Card, Col, Layout, Row, Statistic } from "antd";

import styles from "./styles.module.scss";

/* eslint-disable */
const StatisticsPage: React.FC = () => {
    const data = [
        { month: "Jan", revenue: 200 },
        { month: "Feb", revenue: 250 },
        { month: "Mar", revenue: 165 },
        { month: "Apr", revenue: 44 },
        { month: "May", revenue: 310 },
        { month: "Jun", revenue: 27 },
        { month: "Jul", revenue: 430 },
    ];

    return (
        <Layout className={styles.statistics}>
            <Content>
                <Row gutter={[20, 20]}>
                    <Col sm={24} lg={12}>
                        <Card className={styles.card}>
                            <Chart data={data}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries
                                    valueField="revenue"
                                    argumentField="month"
                                />
                                <Animation />
                            </Chart>
                        </Card>
                    </Col>
                    <Col sm={24} lg={12}>
                        <Card className={styles.card}>
                            <Chart data={data}>
                                <PieSeries
                                    valueField="revenue"
                                    argumentField="month"
                                />
                                <Animation />
                            </Chart>
                        </Card>
                    </Col>
                    <Col sm={12} lg={8}>
                        <Card className={styles.card}>
                            <Statistic
                                title="Account Balance (CNY)"
                                value={112893}
                                precision={2}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
