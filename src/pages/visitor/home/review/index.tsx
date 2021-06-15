import React, { useState } from "react";

import Slider from "react-slick";
import { Col, Row } from "antd";

import {
    PLACEHOLDER_REVIEW1,
    PLACEHOLDER_REVIEW2,
    PLACEHOLDER_REVIEW3,
} from "../../../../assets/constants";

import styles from "./styles.module.scss";

/**
 * Review component is displaying a list of reviews inside a carousel
 *
 * @returns {JSX}
 */
const ReviewSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const reviews = [
        {
            reviewNumber: 1,
            review: PLACEHOLDER_REVIEW1,
            writer: "Darlene",
        },
        {
            reviewNumber: 2,
            review: PLACEHOLDER_REVIEW2,
            writer: "Ismail",
        },
        {
            reviewNumber: 3,
            review: PLACEHOLDER_REVIEW3,
            writer: "Derk",
        },
    ];

    /**
     * Rendering the reviews content data inside the carousel
     */
    const renderReviews = () =>
        reviews.map(({ reviewNumber, review, writer }) => (
            <Row key={reviewNumber} justify="center">
                <Col className={styles.review} xs={24} lg={12}>
                    <p>
                        <q>{review}</q>
                        <span>- {writer}</span>
                    </p>
                </Col>
            </Row>
        ));

    return (
        <Row id="reviews" className={styles.section} justify="center">
            <Col span={24}>
                <Slider
                    autoplay={false}
                    draggable
                    className={styles.carousel}
                    arrows={false}
                    dots={true}
                    beforeChange={(prev, next) => {
                        setCurrentSlide(next);
                    }}
                    customPaging={(index) => (
                        <p
                            className={
                                index === currentSlide
                                    ? styles.customDotsActive
                                    : styles.customDots
                            }
                        />
                    )}
                >
                    {renderReviews()}
                </Slider>
            </Col>
        </Row>
    );
};

export default ReviewSection;
