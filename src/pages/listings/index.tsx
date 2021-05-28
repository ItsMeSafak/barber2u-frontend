import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { Content, Header } from "antd/es/layout/layout";
import { Button, Col, Layout, Row, Select, Skeleton } from "antd";

import Barber from "../../models/Barber";
import { TempBarber } from "../../models/TempBarber";

import ListingItem from "../../components/listing-item";

import ListingsFilter from "../../components/forms/listings-filter";
import barberListings from "../../assets/listing/listing_barbers.json";
import { showHttpResponseNotification } from "../../assets/functions/notification";

import { fetchBarbers } from "../../services/listing-service";

import styles from "./styles.module.scss";
import { ScreenContext } from "../../contexts/screen-context";
import User from "../../models/User";

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
    const IMAGE_NAMES = ["barber-profile.jpeg", "picture-1.jpg", "picture-2.png", "picture-3.png", "picture-4.jpeg", "picture-5.jpg"];
    const { isMobileOrTablet } = useContext(ScreenContext);
    const [loading, setLoading] = useState(true);


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
        const response = await fetchBarbers();

        const { data } = response;



        console.log(data);



        // await fetchBarbers()
        //     .then(({ data }) => {
        //         // setBarbers(response.data);
        //         // console.log(response);
        //         data.map(({ user, companyName, kvkNumber, btwVatNumber, workRadius }) => new Barber(Object.setPrototypeOf(user, User.prototype), companyName, kvkNumber, btwVatNumber, workRadius));
        //         setLoading(false);
        //     })
        //     .catch((error) =>
        //         showHttpResponseNotification(error.message, error.status)
        //     );
    };

    /**
          * Render teh e ader   that   displays the total amount of barbers.
    */
    const renderTotalBarbersHeader = () => (
        <h1 className={styles.amountBarbers}>
            Found <span>{barbers.length}</span> local barbers
        </h1>
    );

    /**
* Render the select box used to sort the listing items.
     */
    const renderSortBySelect = () => (
        <Select defaultValue="recommended">
            <option value="recommended">Recommended</option>
            <option value="popularity-descending">Popularity</option>
            <option value="rating-descending">Rating</option>
            <option value="price-descending">Price</option>
        </Select>
    );

    /**
* Render all the barber listing items.
     */
    const renderListingItems = () =>
        barbers &&
        barbers.map((barber: Barber) => {
            const randomInt = Math.floor(Math.random() * IMAGE_NAMES.length);
            return (<ListingItem
                key={barber.getUser().getEmail}
                barber={barber}
                imageSrc={IMAGE_NAMES[randomInt]}
                tempBarber={barberListings[0] as TempBarber}
            />);
        });

    return (
        <BrowserRouter>
            <Layout className={styles.listings}>
                <Header className={styles.header}>
                    {renderTotalBarbersHeader()}
                </Header>
                <Content className={styles.mainSection}>

                    <Row justify="space-between" align="middle" className={styles.sortByRow}>
                        <div>
                            <span>Sort By: </span>
                            {renderSortBySelect()}
                        </div>
                    </Row>
                    <Skeleton active loading={loading} />
                    {!loading && (
                        <>
                            <Row className={isMobileOrTablet ? styles.listingsRowMobile : styles.listingsRow}>
                                <Col xs={24} lg={6}>
                                    <div><ListingsFilter /></div>
                                </Col>
                                <Col xs={24} lg={18} className={styles.listingItems}>
                                    <Row>{renderListingItems()}</Row>
                                </Col>
                            </Row>
                        </>
                    )}
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default Listings;
