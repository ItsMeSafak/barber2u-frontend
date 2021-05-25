import React, { useCallback, useEffect, useState } from "react";

import { Content } from "antd/es/layout/layout";
import { Card, Col, Divider, Empty, Layout, Pagination, Rate, Row } from "antd";

import Review from "../../models/Review";

import { fetchReviews } from "../../services/review-service";

import Skeleton from "../../components/skeleton";

import { handlePagination } from "../../assets/functions/pagination";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { DATE_FORMAT, MAX_REVIEWS_PER_PAGE } from "../../assets/constants";

import styles from "./styles.module.scss";

/**
 * This page is responsible for showing the reviews of a user inside cards.
 *
 * @returns {React.FC}
 */
const ReviewPage: React.FC = () => {
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_REVIEWS_PER_PAGE);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * This function fetches the reviews for the barber.
     */
    const getReviews = useCallback(async () => {
        setIsLoading(true);
        const response = await fetchReviews();

        const { status, message, data } = response;
        showHttpResponseNotification(message, status, false);
        if (!data) return;

        setReviews(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getReviews();
    }, [getReviews]);

    /**
     * Render the review cards based on their pagination list position
     */
    const renderReviews = () =>
        reviews.slice(minIndexValue, maxIndexValue).map((review) => (
            <Col key={review.getId} xs={24} md={12} lg={8} xxl={6}>
                <Card
                    className={styles.card}
                    title={review.getReviewer.getFullNameWithInitial}
                    extra={review.getDateOfReview.format(DATE_FORMAT)}
                >
                    <Rate defaultValue={review.getStarAmount} disabled />
                    <p>{review.getReviewText}</p>
                </Card>
            </Col>
        ));

    return (
        <Layout>
            <Content className={styles.reviews}>
                <Divider />
                <Skeleton loading={isLoading}>
                    <div className={styles.wrapper}>
                        <Row gutter={[20, 20]}>
                            {reviews && reviews.length > 0 ? (
                                renderReviews()
                            ) : (
                                <Empty className={styles.noData} />
                            )}
                        </Row>
                        <div className={styles.pagination}>
                            <Pagination
                                defaultCurrent={1}
                                onChange={(value) =>
                                    handlePagination(
                                        value,
                                        setMinIndexValue,
                                        setMaxIndexValue,
                                        MAX_REVIEWS_PER_PAGE
                                    )
                                }
                                defaultPageSize={MAX_REVIEWS_PER_PAGE}
                                total={reviews.length}
                            />
                        </div>
                    </div>
                </Skeleton>
            </Content>
        </Layout>
    );
};

export default ReviewPage;
