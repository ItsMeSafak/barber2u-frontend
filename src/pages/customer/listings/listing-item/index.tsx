import React from "react";
import { Link } from "react-router-dom";

import { Col, Rate, Row } from "antd";

import Barber from "../../../../models/Barber";

import { MEDIA_URL } from "../../../../assets/constants";

import styles from "./styles.module.scss";

interface ComponentProps {
    barber: Barber;
    imageSource: string;
}

/**
 * Listing item component.
 *
 * @returns {JSX}
 */
const ListingItem: React.FC<ComponentProps> = (props) => {
    const { barber, imageSource } = props;

    const randomInt = Math.floor(Math.random() * 5) + 1;
    const cities = [
        0,
        "Amsterdam",
        "Rotterdam",
        "Den Haag",
        "Hilversum",
        "Breda",
    ];

    return (
        <Link
            to={{
                pathname: "/listing",
                state: [{ barber, imageSource }],
            }}
            className={styles.listingLink}
        >
            <Col className={styles.container}>
                <Row className={styles.containerTop}>
                    <Col
                        className={styles.imageCol}
                        style={{
                            backgroundImage: `url(${MEDIA_URL}/${imageSource})`,
                        }}
                    />
                    <Col className={styles.containerTopContent}>
                        <Row>
                            <h3 className={styles.barberName}>
                                {barber.getFullNameWithInitial} -{" "}
                                {cities[randomInt]}
                            </h3>
                        </Row>
                        <Row>
                            <Rate
                                disabled
                                allowHalf
                                className={styles.rating}
                                defaultValue={randomInt}
                            />{" "}
                            ({randomInt * 2 + 10})
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Link>
    );
};

export default ListingItem;
