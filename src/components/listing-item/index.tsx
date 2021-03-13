import React, {useState} from "react";
import {Button, Col, Image, Rate, Row, Select, Tabs} from "antd";
import styles from "./styles.module.scss";
import placeholderImage from "../../asset/placeholder-150x150.png"
import {Barber} from "../../model/barber";

const {TabPane} = Tabs

const ListingItem: React.FC<{ barber: Barber }> = ({ barber }) => {
    const PROFILE_IMAGE_WIDTH = 150
    const PORTFOLIO_IMAGE_WIDTH = 200
    const rating = barber.rate
    const rateSetting = {
        disabled: true,
        className: styles.rating
    }
    const [collapsed, setCollapsed] = useState(false)

    function toggleCollapse() {
        setCollapsed(!collapsed)
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <Image
                    width={PROFILE_IMAGE_WIDTH}
                    src={barber.imageUrl}
                    preview={false}
                    className={styles.profileImage}/>
                <div className={styles.containerTopContent}>
                    <span className={styles.barberName}>{barber.name}</span>
                    <Rate {...rateSetting} defaultValue={barber.rate} />
                    <Button onClick={toggleCollapse} className={collapsed ? "ant-btn-secundary" : "ant-btn-primary"}>
                        {collapsed ? "Cancel" : "Reserve"}
                    </Button>
                </div>
            </div>
            <div className={`${styles.containerBottom} ${collapsed ? "" : styles.hide}`}>
                <Tabs type="card" centered>
                    <TabPane tab={<div className={styles.tab}>Reservation</div>} key="1">
                        <Row>Service:</Row>
                        <Row>
                            <Select mode="multiple" defaultValue="styled">
                                { barber.reservation.service.map((value) =>
                                    <Select.Option value={value} key={value}>{value}</Select.Option>
                                )}
                            </Select>
                        </Row>
                        <Row>Availability:</Row>
                        <Row justify="end">
                            <Col><Button type="primary">Reserve</Button></Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<div className={styles.tab}>Portfolio</div>} key="2">
                        { barber.portfolio.map((service =>
                                <Row key={service.name}>{ service.name }</Row>
                        ))}

                        <Row>Styled</Row>
                        <Row>
                            <Col className={styles.portfolioImage}>
                                <Image
                                    width={PORTFOLIO_IMAGE_WIDTH}
                                    src={placeholderImage}/>
                            </Col>
                            <Col className={styles.portfolioImage}>
                                <Image
                                    width={PORTFOLIO_IMAGE_WIDTH}
                                    src={placeholderImage}/>
                            </Col>
                            <Col className={styles.portfolioImage}>
                                <Image
                                    width={PORTFOLIO_IMAGE_WIDTH}
                                    src={placeholderImage}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<div className={styles.tab}>Reviews</div>} key="3">
                        <Col>
                            <div className={styles.reviewContainer}>
                                <Row>
                                    <Col span={12}>NAAM ACHTERNAAM</Col>
                                    <Col span={12} className={styles.reviewRate}>
                                        <Rate {...rateSetting} defaultValue={rating}/>
                                    </Col>
                                </Row>
                                <Row>Monday, 1 January 1970</Row>
                                <Row>"TRASH BARBER. Gives you yee-yee *ass haircut"</Row>
                            </div>
                            <div className={styles.reviewContainer}>
                                <Row>
                                    <Col>NAAM ACHTERNAAM</Col>
                                    <Col><Rate disabled defaultValue={rating} className={styles.rating}/></Col>
                                </Row>
                                <Row>Monday, 1 January 1970</Row>
                                <Row>"TRASH BARBER. Gives you yee-yee *ass haircut"</Row>
                            </div>
                        </Col>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
};

export default ListingItem;
