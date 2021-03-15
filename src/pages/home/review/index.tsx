import React from "react";

import { Carousel, Col, Row } from "antd";

import reviews from "../../../asset/content/homepage/homepage_reviews.json";

import styles from "./styles.module.scss";

/**
 * Review component is displaying a list of reviews inside a carousel
 *
 * @returns {JSX}
 */
const ReviewSection: React.FC = () => {
    /**
     * Rendering the reviews content data inside the carousel
     */
    const renderReviews = () =>
        reviews.map(({ id, author, message }) => (
            <Row key={id} justify="center">
                <Col className={styles.review} xs={24} lg={12}>
                    <p>
                        <q>{message}</q>
                        <span>- {author}</span>
                    </p>
                </Col>
            </Row>
        ));

    return (
        <Row id="reviews" className={styles.reviews} justify="center">
            <Col span={24}>
                <Carousel
                    autoplay={false}
                    draggable
                    className={styles.carousel}
                >
                    {reviews && renderReviews()}
                </Carousel>
            </Col>
        </Row>
    );
};

export default ReviewSection;
