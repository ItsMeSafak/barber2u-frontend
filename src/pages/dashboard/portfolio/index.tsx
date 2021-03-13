import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Divider, InputNumber, Row, Select, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Portfolio as PortfolioObject } from "../../../models/Portfolio";
import { PortfolioItem } from "../../../models/PortfolioItem";
import { Style } from "../../../models/Style";

import styles from "./styles.module.scss";

interface CardProps {
    ptItem: PortfolioItem;
    newItem: boolean;
}

const { Option } = Select;

const ServiceCard: React.FC<CardProps> = ({ ptItem, newItem }) => {
    const [isEditing, setIsEditing] = useState(0)

    return (
        <Col key={ptItem.id} xs={24} sm={12} lg={8} xl={8}>
            <Card className={styles.card}>
                {isEditing == ptItem.id ?
                    <>
                        <Select className={styles.dropdown} defaultValue={ptItem.style}>
                            {Object.keys(Style).map((style) => <Option key={style} value={style}>{style}</Option>
                            )}
                        </Select>
                    </>
                    : <>
                        <h2 className={styles.header}>{ptItem.style}</h2>
                    </>
                }
            </Card>
        </Col>
    )
}

interface ComponentProps {
    portfolio: PortfolioObject;
}

const Portfolio: React.FC<ComponentProps> = ({ portfolio }) => {
    const [newItem, setNewItem] = useState(false)
    const allStylesAvailable = portfolio.items.map((item) => item.style);

    const emptyIItem = () => new PortfolioItem(0, Style.Curly, "");

    return (
        <Layout className={styles.portfolio}>
            <Content>
                <h1 className={styles.title}>Portfolio</h1>
                {!newItem ? <Button className={styles.addBtn} type="primary" icon={<FontAwesomeIcon icon={faPlus} />} size="large"
                    onClick={(evt) => setNewItem((prevState) => !prevState)}>
                    Add new portfolio item
                        </Button>
                    : <><Button className={`${styles.addBtn} ${styles.saveBtn}`} type="primary" icon={<FontAwesomeIcon icon={faCheck} />} size="large"
                        onClick={(evt) => setNewItem((prevState) => !prevState)}>
                        Save
                            </Button>
                        <Button className={styles.addBtn} danger type="primary" icon={<FontAwesomeIcon icon={faTimes} />} size="large"
                            onClick={(evt) => setNewItem((prevState) => !prevState)}>
                            Cancel
                            </Button>
                        <Row gutter={[20, 20]}>
                            <ServiceCard ptItem={emptyIItem()} newItem={newItem} />
                        </Row></>
                }
                <Divider />
                {allStylesAvailable && allStylesAvailable.map((style) => (
                    <div className={styles.styleRow} key={style}>
                        <h2 className={styles.header}>{style}</h2>
                        <Row gutter={[20, 20]}>
                            {portfolio &&
                                portfolio.items.map((ptItem) => {
                                    if (ptItem.style == style) return (<ServiceCard key={ptItem.id} ptItem={ptItem} newItem={false} />)
                                    return null
                                })}
                        </Row>
                    </div>
                ))}
            </Content>
        </Layout>
    )
};

export default Portfolio;
