import React, { useCallback, useContext, useEffect, useState } from "react";

import { Col, Layout, Row } from "antd";

import User from "../../../models/User";
import Barber from "../../../models/Barber";
import Skeleton from "../../../components/skeleton";
import ListingItem from "./listing-item";

import { getBarbers } from "../../../services/listings-service";
import { ScreenContext } from "../../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Content, Header } = Layout;

const IMAGE_NAMES = [
    "barber-profile.jpeg",
    "picture-1.jpg",
    "picture-2.png",
    "picture-3.png",
    "picture-4.jpeg",
    "picture-5.jpg",
];

/**
 * Listings page.
 *
 * @returns {JSX}
 */
const ListingsPage: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

    const [isLoading, setLoading] = useState(true);
    const [barbers, setBarbers] = useState<Array<Barber>>([]);

    const retrieveBarbers = useCallback(async () => {
        setLoading(true);
        const response = await getBarbers();

        const { data } = response;
        const barberObjects = data.map(
            ({ user, companyName, kvkNumber, btwVatNumber, workRadius }) =>
                new Barber(
                    Object.setPrototypeOf(user, User.prototype),
                    companyName,
                    kvkNumber,
                    btwVatNumber,
                    workRadius
                )
        );
        setBarbers(barberObjects);
        setLoading(false);
    }, [setLoading, setBarbers]);

    useEffect(() => {
        retrieveBarbers();
    }, [retrieveBarbers]);

    /**
     * Render all the barber listing items.
     *
     * @returns {JSX}
     */
    const renderListingItems = () =>
        barbers &&
        barbers.map((barber: Barber) => {
            const randomInt = Math.floor(Math.random() * IMAGE_NAMES.length);
            return (
                <ListingItem
                    key={barber.getEmail}
                    barber={barber}
                    imageSource={IMAGE_NAMES[randomInt]}
                />
            );
        });

    return (
        <Layout className={styles.listings}>
            <Header className={styles.header}>
                <h1 className={styles.amountBarbers}>
                    Found <span>{barbers.length}</span> local barbers
                </h1>
            </Header>
            <Content className={styles.mainSection}>
                <Skeleton loading={isLoading}>
                    <Row
                        className={
                            isMobileOrTablet
                                ? styles.listingsRowMobile
                                : styles.listingsRow
                        }
                    >
                        <Col xs={24} lg={24} className={styles.listingItems}>
                            <Row>{renderListingItems()}</Row>
                        </Col>
                    </Row>
                </Skeleton>
            </Content>
        </Layout>
    );
};

export default ListingsPage;
