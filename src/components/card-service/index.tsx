import React, { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col } from "antd";
import { faCertificate, faEdit } from "@fortawesome/free-solid-svg-icons";

import Service from "../../models/Service";

import styles from "./styles.module.scss";

interface ComponentProps {
    serviceDetail: Service;
    editCallback: (serviceEntity: Service | null) => void;
}
/**
 * This component renders the service card for the services page,
 * consisting of information regarding the service a barber offers.
 * TODO: Create a generic card component, that can be reused in the other pages.
 *
 * @param {Object} props
 * @returns {JSX}
 */
const ServiceCard: React.FC<ComponentProps> = (props) => {
    const { serviceDetail, editCallback } = props;

    /**
     * This function renders the actions a card can have.
     * The actions are:
     * - Deleting the service.
     * - Editing the service.
     *
     * @returns {JSX}
     */
    const actions = () => [
        <FontAwesomeIcon
            key="edit"
            className={styles.editAction}
            icon={faEdit}
            onClick={() => editCallback(serviceDetail)}
        />
    ];

    /**
     * This function deletes the current service.
     */
    // const deleteCurrentService = async () => {
    //     const response = await deleteService(accessToken, serviceDetail.id);

    //     // If request is not OK, handle errors with notification.
    //     const { status, message } = response;
    //     if (!(status === 200)) showNotification(undefined, message, status);
    //     else showNotification(undefined, message, status);
    //     setIsDeleted(true);
    // };

    return (
        <Col key={serviceDetail.id} xs={24} sm={12} lg={8} xl={8}>
            <Card
                className={styles.card}
                actions={actions()}
            >
                <h2 className={styles.header}>{serviceDetail.name} <FontAwesomeIcon className={serviceDetail.active ? styles.certificateOn : styles.certificateOff}
                    icon={faCertificate} /></h2>
                <p>{serviceDetail.description}</p>
                <p className={styles.time}><span>{serviceDetail.time}</span> minutes</p>
                <span className={styles.price}>
                    &euro; {serviceDetail.price.toFixed(2)},-
                        </span>
            </Card>
        </Col>
    );
};

export default ServiceCard;
