import React, { useCallback, useEffect, useState } from "react";

import { Content } from "antd/es/layout/layout";
import { Card, Col, Empty, Layout, Pagination, Rate, Row, Tabs } from "antd";

import Skeleton from "../../components/skeleton";

import Review from "../../models/Review";
import ReviewDetails from "../../models/ReviewDetails";

import { fetchReviews } from "../../services/review-service";

import { handlePagination } from "../../assets/functions/pagination";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { DATE_FORMAT, MAX_REVIEWS_PER_PAGE } from "../../assets/constants";

import styles from "./styles.module.scss";

const { TabPane } = Tabs;

// The type of user from a review
enum ReviewUserType {
    Reviewer,
    TargetUser,
}

/**
 * This page is responsible for showing the reviews of a user inside cards.
 *
 * @returns {React.FC}
 */
const ReviewPage: React.FC = () => {
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_REVIEWS_PER_PAGE);
    const [reviews, setReviews] = useState<ReviewDetails>();
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
     * Render the TabPane in which it contains a list of review cards and a pagination component
     *
     * @param {Review[]} reviewList The list of reviews that the card uses to display review information
     * @param {number} key The identifier for the parent Tab component
     * @param {string} title The title that is displayed inside the TabPane component
     * @param {ReviewUserType} type The type of user from the review.
     * @returns {JSX}
     */
    const renderTabPane = (
        reviewList: Review[],
        key: number,
        title: string,
        type: ReviewUserType
    ) => (
        <TabPane tab={title} key={key}>
            <Row gutter={[20, 20]}>
                {reviewList.length > 0 ? (
                    renderReviews(reviewList, type)
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
                    total={reviewList.length}
                />
            </div>
        </TabPane>
    );

    /**
     * Render the review cards based on their pagination list position
     *
     * @param {Review[]} reviewList The list of reviews that the card uses to display review information
     * @param {ReviewUserType} type The type of user from the review
     * @returns {JSX}
     */
    const renderReviews = (reviewList: Review[], type: ReviewUserType) =>
        reviewList.slice(minIndexValue, maxIndexValue).map((review) => (
            <Col key={review.getId} xs={24} md={12} lg={8} xxl={6}>
                <Card
                    className={styles.card}
                    title={
                        type === ReviewUserType.Reviewer
                            ? review.getTargetUser.getFullNameWithInitial
                            : review.getReviewer.getFullNameWithInitial
                    }
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
                <Skeleton loading={isLoading}>
                    <div className={styles.wrapper}>
                        <Tabs defaultActiveKey="1" centered>
                            {reviews &&
                                renderTabPane(
                                    reviews.getReceivedReviews,
                                    1,
                                    "Received reviews",
                                    ReviewUserType.TargetUser
                                )}
                            {reviews &&
                                renderTabPane(
                                    reviews.getWrittenReviews,
                                    2,
                                    "My reviews",
                                    ReviewUserType.Reviewer
                                )}
                        </Tabs>
                    </div>
                </Skeleton>
            </Content>
        </Layout>
    );
};

export default ReviewPage;
