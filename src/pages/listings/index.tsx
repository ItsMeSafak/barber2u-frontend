import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Button, Col, Row, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import ListingItem from "../../component/listing-item";
import barberListings from "../../asset/listing_barbers.json";
import { Barber } from "../../models/barber";
import { getIconByPrefixName } from "../../asset/functions/icon";

/**
 *
 * @constructor
 */
const Listings: React.FC = () => {
    const amountListings = barberListings.length;
    return (
        <BrowserRouter>
            <section>
                <h1 className={styles.amountBarbers}>
                    Found <span>{amountListings}</span> local barbers
                </h1>
            </section>
            <section className={styles.mainSection}>
                <Col span={24}>
                    <Row justify="space-between" align="middle">
                        <div>
                            <Button className={styles.hamburgerMenu} ghost>
                                <FontAwesomeIcon
                                    icon={getIconByPrefixName("fas", "bars")}
                                    size="lg"
                                />
                            </Button>
                        </div>
                        <div>
                            <span>Sort By: </span>
                            <Select defaultValue="recommended">
                                <option value="recommended">Recommended</option>
                                <option value="ascending">
                                    Price ascending
                                </option>
                                <option value="descending">
                                    Price descending
                                </option>
                            </Select>
                        </div>
                    </Row>
                    <Row>
                        <ListingItem barber={barberListings[0] as Barber} />
                        <ListingItem barber={barberListings[1] as Barber} />
                    </Row>
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
