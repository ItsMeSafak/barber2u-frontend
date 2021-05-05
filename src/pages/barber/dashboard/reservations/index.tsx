import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row, Modal, Divider, Layout, Pagination } from "antd";

import Style from "../../../../models/enums/Style";
import Reservation from "../../../../models/Reservation";

import { MONTH_NAMES } from "../../../../assets/constants";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";
import ReservationCard from "../../../../components/card-reservation";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";
import { getReservations } from "../../../../services/reservation-service";

const { Content } = Layout;

const MAX_ITEMS_PAGE = 6;

/**
 * This component renders the reservations page on the dashboard for the customer.
 * The component consists of reservation items that the customer has made in the past and future.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ReservationsPage: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reservationItems, setReserVationItems] = useState<Reservation[]>([]);

    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_ITEMS_PAGE);

    console.log(reservationItems);
    /**
     */
    const fetchRservations = useCallback(async () => {
        const response = await getReservations();

        const { status, message } = response;
        showHttpResponseNotification(message, status, false);
        if (!response.data) return;

        setReserVationItems(response.data);
    }, []);

    useEffect(() => {
        fetchRservations();
    }, []);

    // /**
    //  * This function returns the index number of the previous month.
    //  *
    //  * @returns {number}
    //  */
    // const previousMonth = () =>
    //     setCurrentMonth((prevState) => {
    //         let state = prevState - 1;
    //         if (state < 0) {
    //             state = 11;
    //         }
    //         return state;
    //     });

    // /**
    //  * This function returns the index number of the next month.
    //  *
    //  * @returns {number}
    //  */
    // const nextMonth = () =>
    //     setCurrentMonth((prevState) => {
    //         let state = prevState + 1;
    //         if (state > 11) {
    //             state = 0;
    //         }
    //         return state;
    //     });

    // /**
    //  * This function filters the reservation items and checks
    //  * if the current month does not equal the month of the reservation item, then the item gets filtered out.
    //  */
    // const newItems = reservationItems.filter((item) => {
    //     const objDate = new Date(item.date);
    //     return objDate.getUTCMonth() === currentMonth;
    // });

    /**
     * This function sets the current reservation item selected.
     * After executing this function, the details will de rendered.
     *
     * @param {Reservation} item Reservation item to be shown detailed.
     */
    const showModal = (item: Reservation) => {
        setIsModalVisible(true);
    };

    /**
     * TODO: Work this fucntion out.
     */
    const handleOk = () => {
        setIsModalVisible(false);
    };

    /**
     * TODO: Work this fucntion out.
     */
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /**
     * 
     * @param pageNumber 
     */
    const handlePagination = (pageNumber: number) => {
        setMaxIndexValue(MAX_ITEMS_PAGE * pageNumber);
        setMinIndexValue((MAX_ITEMS_PAGE * pageNumber) - MAX_ITEMS_PAGE);
    };

    /**
     * This function renders the reservations of the current month.
     *
     * @param {Reservation[]} reservationList Reservations to be rendered.
     * @returns {JSX}
     */
    const renderReservationItems = (reservationList: Reservation[]) =>
        reservationList.slice(minIndexValue, maxIndexValue).map((item) => (
            <ReservationCard key={item.id} reservationDetail={item} />
        ));

    // /**
    //  * This function renders the detailed information of a selected reservation.
    //  *
    //  * @param reservationItem Reservation item to be rendered.
    //  * @returns {JSX}
    //  */
    // const renderDetailedInformation = (reservationItem: Reservation) => (
    //     <Card className={styles.card} key={reservationItem.id}>
    //         <p>Hairstyle: {reservationItem.style}</p>
    //         <p>
    //             {reservationItem.date},{reservationItem.location}
    //         </p>
    //         <Divider />
    //         <p className={styles.price}>
    //             Price: &euro;{reservationItem.price.toFixed(2)}
    //         </p>
    //     </Card>
    // );

    return (
        <Content className={styles.reservations}>
            <h1 className={styles.title}>Reservations</h1>
            <Divider />
            <div>
                <Row gutter={[20, 20]}>
                    {reservationItems && renderReservationItems(reservationItems)}
                </Row>
            </div>

            {/* <Modal
                title="Detailed information"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {reservation && renderDetailedInformation(reservation)}
            </Modal> */}
            <div className={styles.pagination}>
                <Pagination defaultCurrent={1} onChange={handlePagination} defaultPageSize={MAX_ITEMS_PAGE} total={reservationItems.length} />
            </div>
        </Content>
    );
};

export default ReservationsPage;
