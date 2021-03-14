import React, { useState } from "react";

import { Layout, Button, Divider, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import ServiceCard from "../../../component/card";

import Style from "../../../models/Style";
import Portfolio from "../../../models/Portfolio";
import PortfolioItem from "../../../models/PortfolioItem";

import styles from "./styles.module.scss";

interface ComponentProps {
    portfolio: Portfolio;
}

/* eslint-disable */
const PortfolioPage: React.FC<ComponentProps> = (props) => {
    const { portfolio } = props;
    const [newItem, setNewItem] = useState(false);

    const allStylesAvailable = portfolio.items.map((item) => item.style);

    const emptyIItem = () => new PortfolioItem(0, Style.Curly, "");

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
