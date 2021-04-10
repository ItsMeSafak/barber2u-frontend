import React from "react";

import { Carousel, Col, Row } from "antd";

import { PLACEHOLDER_TEXT } from "../../../assets/constants";

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
        [1, 2, 3, 4, 5, 6].map((index) => (
            <Row key={index} justify="center">
                <Col className={styles.review} xs={24} lg={12}>
                    <p>
                        <q>{PLACEHOLDER_TEXT}</q>
                        <span>- Anonymous</span>
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
                    {renderReviews()}
                </Carousel>
            </Col>
        </Row>
    );
};

export default ReviewSection;
