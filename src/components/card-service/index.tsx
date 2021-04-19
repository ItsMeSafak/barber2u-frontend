import React, { useContext, useState } from "react";

import { Button, Card, Col, Popover, Select } from "antd";
import { faCertificate, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";
import Service from "../../models/Service";
import NewServiceForm from "../forms/new-service";
import { deleteService } from "../../services/services-service";
import { AuthContext } from "../../contexts/auth-context";
import { showNotification } from "../../assets/functions/notification";

interface ComponentProps {
    serviceDetail: Service;
    newService: boolean;
    callback?: (formData: { name: string; description: string; price: number; time: number; }) => void;
    serviceDeleted?: (isDeleted: boolean) => void;
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
    const { serviceDetail, newService, callback, serviceDeleted } = props;
    const { accessToken } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);


    /**
     * This function renders the actions a card can have.
     * The actions are:
     * - Deleting the service.
     * - Editing the service.
     *
     * @returns {JSX}
     */
    const actions = () => [
        <Popover
            key="delete"
            content={<Button onClick={() => {
                deleteCurrentService();
            }}>Close</Button>}
            title="Title"
            trigger="click"
            visible={confirmDelete}
        ><FontAwesomeIcon icon={faTrash} onClick={() => setConfirmDelete((prevState) => !prevState)} /></Popover>,
        <FontAwesomeIcon
            key="edit"
            icon={faEdit}
            onClick={() => setIsEditing(serviceDetail.id)}
        />,
    ];

    /**
     * This function deletes the current service.
     */
    const deleteCurrentService = async () => {
        if (serviceDeleted) serviceDeleted(true);
        const response = await deleteService(accessToken, serviceDetail.id);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        else showNotification(undefined, message, status);
    };

    return (
        <Col key={serviceDetail.id} xs={24} sm={12} lg={8} xl={8}>
            <Card
                className={styles.card}
                actions={!newService ? actions() : []}
            >
                {isEditing === serviceDetail.id ? (
                    <NewServiceForm serviceDetail={serviceDetail} newService={newService} callback={callback} />
                ) : (
                    <>
                        <h2 className={styles.header}>{serviceDetail.name} <FontAwesomeIcon className={serviceDetail.active ? styles.certificateOn : styles.certificateOff}
                            icon={faCertificate} /></h2>
                        <p>{serviceDetail.description}</p>
                        <p className={styles.time}><span>{serviceDetail.time}</span> minutes</p>
                        <span className={styles.price}>
                            &euro; {serviceDetail.price.toFixed(2)},-
                        </span>
                    </>
                )}
            </Card>
        </Col>
    );
};

export default ServiceCard;
