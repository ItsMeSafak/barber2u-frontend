import React from "react";

import { Carousel, Row } from "antd";

import reviews from "../../../asset/content/homepage/homepage_reviews.json";

import styles from "./styles.module.scss";

/**
 * Review component is displaying a list of reviews inside a carousel
 *
 * @returns {JSX}
 */
const ReviewComponent: React.FC = () => {
    /**
     * Rendering the reviews content data inside the carousel
     */
    const renderReviews = () =>
        reviews &&
        reviews.map(({ id, author, message }) => (
            <Row key={id} justify="center">
                <p>
                    <span>"{message}"</span>
                    <span>- {author}</span>
                </p>
            </Row>
        ));

    return (
        <section id="reviews" className={styles.reviews}>
            <div className={styles.reviewContainer}>
                <Carousel
                    autoplay={false}
                    draggable
                    className={styles.carousel}
                >
                    {renderReviews()}
                </Carousel>
            </div>
        </section>
    );
};

export default ReviewComponent;
