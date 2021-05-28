import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter, useParams } from "react-router-dom";

import { Content, Header } from "antd/es/layout/layout";
import { Button, Col, Layout, Row, Select } from "antd";

import Barber from "../../models/Barber";

import ListingItem from "../../components/listing-item";

import ListingsFilter from "../../components/forms/listings-filter";
import barberListings from "../../assets/listing/listing_barbers.json";
import { showHttpResponseNotification } from "../../assets/functions/notification";

import { fetchBarberListing } from "../../services/listing-service";

import styles from "./styles.module.scss";
import { ScreenContext } from "../../contexts/screen-context";

/**
 * A component for showing an overview of all the available barbers as a
 * listing item.
 *
 * @returns {JSX}
 */
const Listing: React.FC = () => {
    /**
     * State for the available barbers that is shown as listings.
     */
    const [barber, setBarber] = useState<Barber>();
    const IMAGE_NAMES = ["barber-profile.jpeg", "picture-1.jpg", "picture-2.png", "picture-3.png", "picture-4.jpeg", "picture-5.jpg"];
    const { isMobileOrTablet } = useContext(ScreenContext);

    const randomInt = Math.floor(Math.random() * IMAGE_NAMES.length);

    /**
     * Fetch the barber everytime on load of the page.
     */
    useEffect(() => {
        getBarber();
    }, []);

    const { email } = useParams<{ email: string }>();

    /**
     * Fetch the available barbers from the server with the listing service.
     */
    const getBarber = async () => {
        await fetchBarberListing(email)
            .then((response) => {
                setBarber(response.data.barber);
            })
            .catch((error) =>
                showHttpResponseNotification(error.message, error.status)
            );
    };


    return (
        <BrowserRouter>
            <Layout className={styles.listing}>
                <Header className={styles.header} style={{ backgroundImage: `url(http://192.168.2.8:8080/api/media/${IMAGE_NAMES[randomInt]})` }} />
                <Content className={styles.mainSection}>
                    <Row className={isMobileOrTablet ? styles.listingsRowMobile : styles.listingsRow}>
                        t
                    </Row>
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default Listing;
