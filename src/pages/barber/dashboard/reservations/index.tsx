import React, { useCallback, useContext, useEffect, useState } from "react";

import { Row, Divider, Layout, Pagination, Skeleton } from "antd";

import Reservation from "../../../../models/Reservation";

import ReservationCard from "../../../../components/card-reservation";

import { DashboardContext } from "../../../../contexts/dashboard-context";

import { getReservations } from "../../../../services/reservation-service";

import { showHttpResponseNotification } from "../../../../assets/functions/notification";

import styles from "./styles.module.scss";

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
    const [reservationItems, setReserVationItems] = useState<Reservation[]>([]);
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_ITEMS_PAGE);
    const { loading, isUpdated, setIsUpdated, setLoading } = useContext(
        DashboardContext
    );

    /**
     * This function fetches the reservation from the backend and displays it on the page.
     */
    const fetchReservations = useCallback(async () => {
        setLoading(true);
        const response = await getReservations();

        const { status, message } = response;
        showHttpResponseNotification(message, status, false);
        if (!response.data) return;

        setReserVationItems(response.data);
        setLoading(false);
    }, [setLoading]);

    useEffect(() => {
        fetchReservations();
        setIsUpdated(false);
        return () => setLoading(true);
    }, [isUpdated, setIsUpdated, setLoading, fetchReservations]);

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

    // /**
    //  * This function sets the current reservation item selected.
    //  * After executing this function, the details will de rendered.
    //  *
    //  * @param {Reservation} item Reservation item to be shown detailed.
    //  */
    // const showModal = (item: Reservation) => {
    //     setIsModalVisible(true);
    // };

    // /**
    //  * TODO: Work this fucntion out.
    //  */
    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // /**
    //  * TODO: Work this fucntion out.
    //  */
    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    /**
     * This function handles the pagination of the reservations.
     * The current max amount of reservation cards to be displayed are 6.
     *
     * @param pageNumber the current page number we are on.
     */
    const handlePagination = (pageNumber: number) => {
        setMaxIndexValue(MAX_ITEMS_PAGE * pageNumber);
        setMinIndexValue(MAX_ITEMS_PAGE * pageNumber - MAX_ITEMS_PAGE);
    };

    /**
     * This function renders the reservation cards.
     *
     * @param {Reservation[]} reservationList Reservations to be rendered.
     * @returns {JSX}
     */
    const renderReservationItems = (reservationList: Reservation[]) =>
        reservationList
            .slice(minIndexValue, maxIndexValue)
            .map((item) => (
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
            <Skeleton active loading={loading} />
            {!loading && (
                <>
                    <h1 className={styles.title}>Reservations</h1>
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {reservationItems &&
                            renderReservationItems(reservationItems)}
                    </Row>

                    {/* <Modal
                    title="Detailed information"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {reservation && renderDetailedInformation(reservation)}
                </Modal> */}
                    <div className={styles.pagination}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={handlePagination}
                            defaultPageSize={MAX_ITEMS_PAGE}
                            total={reservationItems.length}
                        />
                    </div>
                </>
            )}
        </Content>
    );
};

export default ReservationsPage;
