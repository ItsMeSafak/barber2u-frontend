import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Rate, Row, Statistic } from "antd";

import Review from "../../models/Review";

import { getIconByPrefixName } from "../../assets/functions/icon";

import styles from "./styles.module.scss";

interface ComponentProps {
    reviews: Review[];
}
/**
 * This component renders the widget statistics for reviews.
 *
 * @returns {JSX}
 */
const WidgetReviews: React.FC<ComponentProps> = (props) => {
    /**
     * Calculate the average rating of all reviews
     */
    const calculateAverageRating = () =>
        props.reviews && props.reviews.length > 0
            ? props.reviews
                  .map((review) => review.starAmount)
                  .reduce((a, b) => a + b) / props.reviews.length
            : 0;

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
                <Card className={styles.card}>
                    <Statistic
                        title="Reviews"
                        value={props.reviews.length}
                        className={styles.center}
                        prefix={
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={getIconByPrefixName("fas", "comments")}
                                size="1x"
                            />
                        }
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12}>
                <Card className={styles.card}>
                    <Statistic
                        title="Rating"
                        value={calculateAverageRating().toFixed(1)}
                        className={styles.center}
                        prefix={
                            <Rate
                                value={calculateAverageRating()}
                                allowHalf
                                disabled
                            />
                        }
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default WidgetReviews;
