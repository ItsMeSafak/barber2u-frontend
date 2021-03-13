import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Checkbox, Rate, Select, Slider} from "antd";
import styles from "./styles.module.scss";
import ListingItem from "../../components/listing-item";
import barberListings from "../../asset/listing_barbers.json";
import {Barber} from "../../model/barber";

const Listings: React.FC = () => {
    const amountListings = barberListings.length
    const styleOptions = ["Styled", "Curled", "Bleached"];
    return (
        <BrowserRouter>
            <section>
                <h1 className={styles.amountBarbers}>Found {amountListings} local barbers</h1>
            </section>
            <section className={styles.mainSection}>
                <div className={styles.filterContainer}>
                    <span>Price range:</span>
                    <Slider range/>
                    <span>Rating:</span>
                    <Rate/>
                    <span>Style</span>
                    <Checkbox.Group className={styles.checkboxGroup} options={styleOptions}/>
                </div>
                <div className={styles.contentContainer}>
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
                </div>
            </section>
        </BrowserRouter>
    )
};

export default Listings;
