import React, { useState } from "react";

import {
    Layout,
    Button,
    Card,
    Col,
    Divider,
    Row,
    Select
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Style } from "../../../models/Style";
import { PortfolioItem } from "../../../models/PortfolioItem";
import { Portfolio } from "../../../models/Portfolio";

import styles from "./styles.module.scss";

interface CardProps {
    portfolioItem: PortfolioItem;
    newItem: boolean;
}

const { Option } = Select;

const ServiceCard: React.FC<CardProps> = (props) => {
    const [isEditing, setIsEditing] = useState(0);
    const { portfolioItem, newItem } = props;

    return (
        <Col key={portfolioItem.id} xs={24} sm={12} lg={8}>
            <Card className={styles.card}>
                {isEditing === portfolioItem.id ? (
                    <Select
                        className={styles.dropdown}
                        defaultValue={portfolioItem.style}
                    >
                        {Object.keys(Style).map((style) => (
                            <Option key={style} value={style}>
                                {style}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    <h2 className={styles.header}>{portfolioItem.style}</h2>
                )}
            </Card>
        </Col>
    );
};

interface ComponentProps {
    portfolio: Portfolio;
}

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
                onClick={() =>
                    setNewItem((prevState) => !prevState)
                }
            >
                Save
                        </Button>
            <Button
                className={styles.addBtn}
                danger
                type="primary"
                icon={<FontAwesomeIcon icon={faTimes} />}
                size="large"
                onClick={() =>
                    setNewItem((prevState) => !prevState)
                }
            >
                Cancel
                        </Button>
            <Row gutter={[20, 20]}>
                <ServiceCard
                    portfolioItem={emptyIItem()}
                    newItem={newItem}
                />
            </Row>
        </>
    );

    const renderPortfolioItems = (portfolioObject: Portfolio, style: Style) => (
        portfolioObject.items.map((portfolioItem) => {
            if (portfolioItem.style === style)
                return (
                    <ServiceCard
                        key={portfolioItem.id}
                        portfolioItem=
                        {portfolioItem}
                        newItem={false}
                    />
                );
            return null;
        })
    );

    const renderStyleSections = (allStyles: Style[]) => (
        allStyles.map((style) => (
            <div className={styles.styleRow} key={style}>
                <h2 className={styles.header}>{style}</h2>
                <Row gutter={[20, 20]}>
                    {portfolio && renderPortfolioItems(portfolio, style)}
                </Row>
            </div>
        ))
    );

    return (
        <Layout className={styles.portfolio}>
            <Content>
                <h1 className={styles.title}>Portfolio</h1>
                {!newItem ? renderAddButton() : (
                    renderSaveAndCancelButton()
                )}
                <Divider />
                {allStylesAvailable &&
                    renderStyleSections(allStylesAvailable)}
            </Content>
        </Layout>
    );
};

export default PortfolioPage;
