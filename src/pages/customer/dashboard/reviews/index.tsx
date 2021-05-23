import React, { useContext, useState } from "react";
import { Card, Col, Layout, Pagination, Rate, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import Review from "../../../../models/Review";
import { AuthenticationContext } from "../../../../contexts/authentication-context";
import WidgetReviews from "../../../../template/widget-reviews";
import styles from "./styles.module.scss";
import { handlePagination } from "../../../../assets/functions/pagination";
import { MAX_REVIEWS_PER_PAGE } from "../../../../assets/constants";

/**
 * @returns {React.FC}
 */
const ReviewPage: React.FC = () => {
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_REVIEWS_PER_PAGE);

    const { user } = useContext(AuthenticationContext);
    if (user == null) return <h1>OOOPS, Something went wonrg</h1>;

    const reviews: Review[] = [
        new Review("1", user, "image", 5, "review msg5", moment()),
        new Review("2", user, "image", 4, "review msg4", moment()),
        new Review("3", user, "image", 3, "review msg3", moment()),
        new Review("4", user, "image", 2, "review msg2", moment()),
        new Review("5", user, "image", 1, "review msg1", moment()),
        new Review("6", user, "image", 1, "review msg1", moment()),
        new Review("7", user, "image", 1, "review msg1", moment()),
        new Review("8", user, "image", 1, "review msg1", moment()),
        new Review("9", user, "image", 1, "review msg1", moment()),
        new Review("10", user, "image", 1, "review msg1", moment()),
        new Review("11", user, "image", 1, "review msg1", moment()),
        new Review("12", user, "image", 2, "review msg2", moment()),
        new Review("13", user, "image", 2, "review msg2", moment()),
        new Review("14", user, "image", 4, "review msg4", moment()),
    ];

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
                        <Row gutter={[20, 20]}>{renderReviews()}</Row>
                    </Col>
                    <Col span={24}>
                        <Row>
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
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ReviewPage;
