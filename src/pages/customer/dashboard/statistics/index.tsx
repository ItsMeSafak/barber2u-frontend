import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Carousel, Col, Empty, Layout, Rate, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import { getIconByPrefixName } from "../../../../assets/functions/icon";

import Review from "../../../../models/Review";

import Spinner from "../../../../components/spinner";
import CalendarPage from "../../../calendar";
import CardStatistic from "../../../../components/card-statistic";

import { fetchReviews } from "../../../../services/review-service";

import styles from "./styles.module.scss";

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

        const { data } = response;
        setReviews(data);
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
     * Rendering the reviews content data inside the carousel
     */
    const renderReviews = () =>
        reviews.slice(0, 5).map((review) => (
            <Row key={review.getId} justify="center">
                <Col className={styles.review} xs={24} lg={12}>
                    <p>{review.getReviewText}</p>
                </Col>
            </Row>
        ));

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
                                title: "Total reviews",
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
                                    <Rate
                                        value={calculateAverageRating()}
                                        allowHalf
                                        disabled
                                    />
                                ),
                            },
                        ]}
                    />
                </Spinner>
            </Col>
            <Col xs={24} lg={12}>
                <Spinner spinning={isLoading}>
                    <Card className={styles.card}>
                        <Carousel
                            autoplay
                            draggable
                            className={styles.carousel}
                            dots={false}
                        >
                            {reviews.length > 0 ? (
                                renderReviews()
                            ) : (
                                <Empty
                                    className={styles.noReviews}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            )}
                        </Carousel>
                    </Card>
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
