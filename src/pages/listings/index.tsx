import React, { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, Header } from "antd/es/layout/layout";
import { Button, Col, Layout, Row, Select } from "antd";

import Barber from "../../models/Barber";
import { TempBarber } from "../../models/TempBarber";

import ListingItem from "../../components/listing-item";

import barberListings from "../../assets/listing/listing_barbers.json";
import { showHttpResponseNotification } from "../../assets/functions/notification";
import { getIconByPrefixName } from "../../assets/functions/icon";

import { fetchBarbers } from "../../services/listing-service";

import styles from "./styles.module.scss";

/**
 * A component for showing an overview of all the available barbers as a
 * listing item.
 *
 * @returns {JSX}
 */
const Listings: React.FC = () => {
    /**
     * State for the available barbers that is shown as listings.
     */
    const [barbers, setBarbers] = useState<Barber[]>([]);

    /**
     * Fetch all the barbers everytime on load of the page.
     */
    useEffect(() => {
        getBarbers();
    }, []);

    /**
     * Fetch the available barbers from the server with the listing service.
     */
    const getBarbers = async () => {
        await fetchBarbers()
            .then((response) => {
                setBarbers(response.data);
            })
            .catch((error) =>
                showHttpResponseNotification(error.message, error.status)
            );
    };

    /**
     * Render the header that displays the total amount of barbers.
     */
    const renderTotalBarbersHeader = () => (
        <h1 className={styles.amountBarbers}>
            Found <span>{barbers.length}</span> local barbers
        </h1>
    );

    /**
     * Render the hamburger button that should open the filter drawer.
     */
    const renderFilterHamburger = () => (
        <Button className={styles.hamburgerMenu} ghost>
            <FontAwesomeIcon
                icon={getIconByPrefixName("fas", "bars")}
                size="lg"
            />
        </Button>
    );

    /**
     * Render the select box used to sort the listing items.
     */
    const renderSortBySelect = () => (
        <Select defaultValue="recommended">
            <option value="recommended">Recommended</option>
            <option value="ascending">Price ascending</option>
            <option value="descending">Price descending</option>
        </Select>
    );

    /**
     * Render all the barber listing items.
     */
    const renderListingItems = () =>
        barbers &&
        barbers.map((barber: Barber) => (
            <ListingItem
                key={barber.getUser.getEmail}
                barber={barber}
                tempBarber={barberListings[0] as TempBarber}
            />
        ));

    return (
        <BrowserRouter>
            <Layout className={styles.listings}>
                <Header className={styles.header}>
                    {renderTotalBarbersHeader()}
                </Header>
                <Content className={styles.mainSection}>
                    <Col span={24}>
                        <Row justify="space-between" align="middle">
                            <div>{renderFilterHamburger()}</div>
                            <div>
                                <span>Sort By: </span>
                                {renderSortBySelect()}
                            </div>
                        </Row>
                        <Row>{renderListingItems()}</Row>
                    </Col>
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default Listings;
