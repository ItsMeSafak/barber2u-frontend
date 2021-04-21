import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Modal } from "antd";
import { faCertificate, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Service from "../../models/Service";

import { ServiceContext } from "../../contexts/service-context";

import { deleteService } from "../../services/services-service";

import { showNotification } from "../../assets/functions/notification";

import styles from "./styles.module.scss";

interface ComponentProps {
    serviceDetail: Service;
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
    const { serviceDetail } = props;
    const { setServiceDetail, setIsNewService, setIsDeleted } = useContext(ServiceContext);

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
            onClick={() => {
                setIsNewService(false);
                setServiceDetail(serviceDetail);
            }
            }
        />,
        <FontAwesomeIcon
            key="delete"
            className={styles.editAction}
            icon={faTrash}
            onClick={() => warningModal()}
        />
    ];

    /**
     * This function creates a warnign modal for deleting the current service.
     */
    const warningModal = () => {
        Modal.warning({
            centered: true,
            title: "Delete service",
            content: "Are you sure you want to delete this service?",
            okCancel: true,
            onOk: deleteCurrentService
        });
    };

    /**
     * This function deletes the current service on the list.
     */
    const deleteCurrentService = async () => {
        const response = await deleteService(serviceDetail?.id);
        setIsDeleted(true);

        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        else showNotification(undefined, message, status);
    };

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
