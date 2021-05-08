import React from "react";

import { valueType } from "antd/lib/statistic/utils";
import {
    Card,
    Col,
    Progress,
    Row,
    Statistic,
    StatisticProps,
    Tooltip,
} from "antd";

import { NEGATIVE_COLOR, POSITIVE_COLOR } from "../../assets/constants";

import styles from "./styles.module.scss";

interface ComponentProps extends StatisticProps {
    data: Array<StatisticProps>;
    actions?: Array<React.ReactNode>;
    statisticColor?: string;
    positiveValueThreshold?: string | number;
    negativeValueThreshold?: string | number;
    withProgressBar?: boolean;
    progressBar?: {
        percentage: number;
        tooltipText: string;
    };
}

/**
 * This component is used to render a generic card with statistics.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const CardStatistic: React.FC<ComponentProps> = (props) => {
    const {
        data,
        actions,
        statisticColor,
        positiveValueThreshold,
        negativeValueThreshold,
        withProgressBar,
        progressBar,
    } = props;

    /**
     * TODO...
     * @returns {string}
     */
    const getStatisticColor = (value: valueType | undefined) => {
        if (value) {
            if (positiveValueThreshold && !negativeValueThreshold) {
                if (typeof positiveValueThreshold === "string")
                    return value === positiveValueThreshold
                        ? POSITIVE_COLOR
                        : NEGATIVE_COLOR;
                if (typeof positiveValueThreshold === "number")
                    return value >= positiveValueThreshold
                        ? POSITIVE_COLOR
                        : NEGATIVE_COLOR;
            }

            if (negativeValueThreshold && !positiveValueThreshold) {
                if (typeof negativeValueThreshold === "string")
                    return value !== negativeValueThreshold
                        ? POSITIVE_COLOR
                        : NEGATIVE_COLOR;
                if (typeof negativeValueThreshold === "number")
                    return value <= negativeValueThreshold
                        ? POSITIVE_COLOR
                        : NEGATIVE_COLOR;
            }
        }

        return statisticColor;
    };

    /**
     * TODO...
     * @returns {JSX}
     */
    const renderProgressBar = () => (
        <>
            {progressBar && (
                <Tooltip title={progressBar.tooltipText}>
                    <Progress
                        percent={progressBar.percentage}
                        strokeColor={NEGATIVE_COLOR}
                        trailColor={POSITIVE_COLOR}
                        showInfo={false}
                        status="active"
                    />
                </Tooltip>
            )}
        </>
    );

    /**
     * TODO...
     */
    const renderData = () =>
        data.map((details) => {
            const { title, value, precision, prefix, suffix } = details;
            return (
                <>
                    <Col key={value} xs={24 / data.length}>
                        <Statistic
                            title={title}
                            style={
                                data.length > 1 ? { textAlign: "center" } : {}
                            }
                            value={value}
                            precision={precision}
                            valueStyle={{
                                color: getStatisticColor(value),
                                paddingTop: "1rem",
                            }}
                            prefix={prefix}
                            suffix={suffix}
                        />
                        {withProgressBar && renderProgressBar()}
                    </Col>
                </>
            );
        });

    return (
        <Card className={styles.card} actions={actions}>
            <Row>{renderData()}</Row>
        </Card>
    );
};

export default CardStatistic;
