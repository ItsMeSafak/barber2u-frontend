import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Layout, Button, Divider, Row } from "antd";

import ServiceCard from "../../../../components/card";

import Style from "../../../../models/enums/Style";
import Portfolio from "../../../../models/Portfolio";
import PortfolioItem from "../../../../models/PortfolioItem";

import styles from "./styles.module.scss";

const { Content } = Layout;

interface ComponentProps {
    portfolio: Portfolio;
}

/**
 * This component renders the protfolio page, consisting of portfolio cards/items.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const PortfolioPage: React.FC<ComponentProps> = (props) => {
    const { portfolio } = props;
    const [newItem, setNewItem] = useState(false);

    const allStylesAvailable = portfolio.items.map((item) => item.style);

    /**
     * This function creates a new (and empty) instance of a portfolio item.
     *
     * @returns {PortfolioItem}
     */
    const emptyIItem = () => new PortfolioItem(0, Style.Curly, "");

    /**
     * This function renders an add button.
     * This would then create an empty portfolio card with empty values in the input fields.
     *
     * @returns {JSX}
     */
    const renderAddButton = () => (
        <Button
            className={styles.addBtn}
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            size="large"
            onClick={() => setNewItem((prevState) => !prevState)}
        >
            Add new portfolio item
        </Button>
    );

    /**
     * This function render the save and cancel button, which will appear after triggering the add button.
     * The save button has the functionality to add the newly created instance of portfolio item to the list.
     * The cancel button closes the empty portfolio item and switches back to the add button.
     *
     * @returns {JSX}
     */
    const renderSaveAndCancelButton = () => (
        <>
            <Button
                className={`${styles.addBtn} ${styles.saveBtn}`}
                type="primary"
                icon={<FontAwesomeIcon icon={faCheck} />}
                size="large"
                onClick={() => setNewItem((prevState) => !prevState)}
            >
                Save
            </Button>
            <Button
                className={styles.addBtn}
                danger
                type="primary"
                icon={<FontAwesomeIcon icon={faTimes} />}
                size="large"
                onClick={() => setNewItem((prevState) => !prevState)}
            >
                Cancel
            </Button>
            <Row gutter={[20, 20]}>
                <ServiceCard portfolioItem={emptyIItem()} newItem={newItem} />
            </Row>
        </>
    );

    /**
     * This method renders all the portfolio items that match the passed style value.
     * If the passed style equals the style of the current portfolio item in the map function,
     * then it should get rendered on that row.
     *
     * @param {Portfolio} portfolioObject The portfolio object, consisting of portfolio items.
     * @param {Style} style The current style to be rendered on the row.
     * @returns {JSX}
     */
    const renderPortfolioItems = (portfolioObject: Portfolio, style: Style) =>
        portfolioObject.items.map((portfolioItem) => {
            if (portfolioItem.style === style)
                return (
                    <ServiceCard
                        key={portfolioItem.id}
                        portfolioItem={portfolioItem}
                        newItem={false}
                    />
                );
            return null;
        });

    /**
     * This function renders all the available style rows in the portfolio.
     * Each row is a unique style and each row consists of portfolio items that match that style.
     *
     * @param {Style[]} allStyles List of all the available styles in the portfolio.
     * @returns {JSX}
     */
    const renderStyleSections = (allStyles: Style[]) =>
        allStyles.map((style) => (
            <div className={styles.styleRow} key={style}>
                <h2 className={styles.header}>{style}</h2>
                <Row gutter={[20, 20]}>
                    {portfolio && renderPortfolioItems(portfolio, style)}
                </Row>
            </div>
        ));

    return (
        <Layout className={styles.portfolio}>
            <Content>
                <h1 className={styles.title}>Portfolio</h1>
                {!newItem ? renderAddButton() : renderSaveAndCancelButton()}
                <Divider />
                {allStylesAvailable && renderStyleSections(allStylesAvailable)}
            </Content>
        </Layout>
    );
};

export default PortfolioPage;
