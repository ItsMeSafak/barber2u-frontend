import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Button, Col, Row, Select } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Barber from "../../models/Barber";
import { TempBarber } from "../../models/TempBarber";

import ListingItem from "../../components/listing-item";

import { getIconByPrefixName } from "../../assets/functions/icon";
import barberListings from "../../assets/listing/listing_barbers.json";
import { showNotification } from "../../assets/functions/notification";

import { fetchBarbers } from "../../services/listing-service";

import styles from "./styles.module.scss";

/**
 * A component for showing an overview of all the available barbers as a
 * listing item.
 * @link{ListingItem}
 * @constructor
 */
const Listings: React.FC = () => {
    /**
     * State for the available barbers that is shown as listings.
     */
    const [barbers, setBarbers] = useState<Barber[]>([]);

    /**
     * Fetch the available barbers from the server with the listing service.
     */
    const getBarbers = async () => {
        await fetchBarbers()
            .then((response) => {
                setBarbers(response.data);
            })
            .catch((error) =>
                showNotification(undefined, error.message, error.status)
            );
    };

    /**
     * Fetch all the barbers everytime on load of the page. The accessToken is
     * refreshed after the page is loaded, so the barbers should get refreshed.
     */
    useEffect(() => {
        getBarbers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <section>{renderTotalBarbersHeader()}</section>
            <section className={styles.mainSection}>
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
                {/* <div className={styles.filterContainer}>
                    <span>Price range:</span>
                    <Slider range/>
                    <span>Rating:</span>
                    <Rate/>
                    <span>Style</span>
                    <Checkbox.Group className={styles.checkboxGroup} options={styleOptions}/>
                </div> */}
                {/* <div className={styles.contentContainer}>
                    <div className={styles.sortContainer}>
                        <span>Sort By:</span>
                        <Select defaultValue="recommended">
                            <option value="recommended">Recommended</option>
                            <option value="ascending">Price ascending</option>
                            <option value="descending">Price descending</option>
                        </Select>
                    </div>
                    <div>
                        <ListingItem barber={barberListings[0] as Barber}/>
                        <ListingItem barber={barberListings[1] as Barber}/>
                    </div>
                </div> */}
            </section>
        </BrowserRouter>
    );
};

export default Listings;
