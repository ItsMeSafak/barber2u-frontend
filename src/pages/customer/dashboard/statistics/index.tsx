import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row } from "antd";

import Review from "../../../../models/Review";
import Spinner from "../../../../components/spinner";
import CalendarPage from "../../../calendar";
import CardStatistic from "../../../../components/card-statistic";

import { fetchReviews } from "../../../../services/review-service";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * Customer statistics page.
 *
 * @returns {React.FC}
 */
const StatisticsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * This function fetches the reviews of a customer
     */
    const getReviews = useCallback(async () => {
        setIsLoading(true);
        const response = await fetchReviews();
        if (!response) return;

        setReviews(response.data.getReceivedReviews);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getReviews();
        return () => setIsLoading(true);
    }, [getReviews]);

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
     * This function renders the review statistics.
     *
     * @returns {JSX}
     */
    const renderReviewStatistics = () => (
        <Row className={styles.row} gutter={[16, 16]}>
            <Col xs={24} lg={12}>
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
                        ]}
                    />
                </Spinner>
            </Col>
            <Col xs={24} lg={12}>
                <Spinner spinning={isLoading}>
                    <CardStatistic
                        data={[
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
        <Layout>
            <Content>
                {renderReviewStatistics()}
                <CalendarPage />
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
