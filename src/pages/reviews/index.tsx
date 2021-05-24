import React, { useEffect, useState } from "react";

import { Content } from "antd/es/layout/layout";
import { Card, Col, Empty, Layout, Pagination, Rate, Row } from "antd";

import Review from "../../models/Review";

import WidgetReviews from "../../template/widget-reviews";

import { fetchReviews } from "../../services/review-service";

import { handlePagination } from "../../assets/functions/pagination";
import { MAX_REVIEWS_PER_PAGE } from "../../assets/constants";

import styles from "./styles.module.scss";

// TODO write JsDoc

/**
 * @returns {React.FC}
 */
const ReviewPage: React.FC = () => {
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_REVIEWS_PER_PAGE);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetchReviews().then((response) =>
            response.data ? setReviews(response.data) : setReviews([])
        );
    }, []);

    /**
     *
     */
    const renderReviews = () =>
        reviews.slice(minIndexValue, maxIndexValue).map((review) => (
            <Col key={review.id} xs={24} md={12} lg={8} xxl={6}>
                <Card
                    className={styles.card}
                    title={review.reviewer.getFullNameWithInitial}
                    extra={review.dateOfReview.format("DD-MM-YYYY")}
                >
                    <Rate defaultValue={review.starAmount} disabled />
                    <p>{review.reviewText}</p>
                </Card>
            </Col>
        ));

    return (
        <Layout>
            <Content>
                <Row gutter={[0, 32]}>
                    <Col span={24}>
                        <WidgetReviews reviews={reviews} />
                    </Col>
                    <Col span={24}>
                        {reviews && reviews.length > 0 ? (
                            <Row gutter={[20, 20]}>{renderReviews()}</Row>
                        ) : (
                            <Empty description="No reviews has been written yet." />
                        )}
                    </Col>
                    <Col span={24}>
                        <Row justify="center">
                            <Col>
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ReviewPage;
