import React, { useCallback, useContext, useEffect, useState } from "react";

import { Row, Divider, Layout, Pagination, Select, Empty, Col } from "antd";

import Status from "../../models/enums/Status";
import Skeleton from "../../components/skeleton";
import Reservation from "../../models/Reservation";
import ReservationCard from "../../components/card-reservation";

import { BarberContext } from "../../contexts/barber-context";
import { getReservations } from "../../services/reservation-service";
import { handlePagination } from "../../assets/functions/pagination";
import { MAX_ITEMS_PER_PAGE } from "../../assets/constants";
import { showHttpResponseNotification } from "../../assets/functions/notification";

import styles from "./styles.module.scss";

const { Content } = Layout;
const { Option } = Select;

const MAX_ITEMS_PAGE = 6;

/**
 * This component renders the reservations page on the dashboard for the customer.
 * The component consists of reservation items that the customer has made in the past and future.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ReservationsPage: React.FC = () => {
    const [reservationItems, setReservationItems] = useState<Reservation[]>([]);
    const [currentFilter, setCurrentFilter] = useState("");
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_ITEMS_PER_PAGE);

    const { loading, isUpdated, setIsUpdated, setLoading } = useContext(
        BarberContext
    );

    /**
     * This function fetches the reservation from the backend and displays it on the page.
     */
    const fetchReservations = useCallback(
        async (filterStatus: string | null) => {
            setLoading(true);
            const response = await getReservations(filterStatus);

            const { status, message, data } = response;
            showHttpResponseNotification(message, status, false);
            if (!data) return;
            setReservationItems(data);
            setLoading(false);
        },
        [setLoading]
    );

    useEffect(() => {
        fetchReservations(currentFilter !== "" ? currentFilter : null);
        setIsUpdated(false);
        return () => setLoading(true);
    }, [isUpdated, setIsUpdated, setLoading, fetchReservations, currentFilter]);

    /**
     * This function renders the reservation cards.
     *
     * @param {Reservation[]} reservationList Reservations to be rendered.
     * @returns {JSX}
     */
    const renderReservationItems = (reservationList: Reservation[]) =>
        reservationList.slice(minIndexValue, maxIndexValue).map((item) => (
            <Col key={item.getId} xs={24} md={12} lg={8} xxl={6}>
                <ReservationCard reservationDetail={item} />
            </Col>
        ));

    /**
     * This function handles the filtering of the reservations based on the status
     *
     * @param value
     */
    const handleFilterChange = (value: string) => {
        setCurrentFilter(value);
        setMinIndexValue(0);
        setMaxIndexValue(MAX_ITEMS_PER_PAGE);
    };

    return (
        <Content className={styles.reservations}>
            <Select
                placeholder="Select a status"
                size="large"
                allowClear
                onChange={handleFilterChange}
            >
                <Option value={Status.Active}>Active</Option>
                <Option value={Status.Pending}>Pending</Option>
                <Option value={Status.Completed}>Completed</Option>
                <Option value={Status.Cancelled}>Cancelled</Option>
            </Select>
            <Divider />
            <Skeleton loading={loading}>
                <div className={styles.wrapper}>
                    <Row gutter={[20, 20]}>
                        {reservationItems.length > 0 ? (
                            renderReservationItems(reservationItems)
                        ) : (
                            <Empty className={styles.noData} />
                        )}
                    </Row>
                    <div className={styles.pagination}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={(value) =>
                                handlePagination(
                                    value,
                                    setMinIndexValue,
                                    setMaxIndexValue,
                                    MAX_ITEMS_PER_PAGE
                                )
                            }
                            defaultPageSize={MAX_ITEMS_PAGE}
                            total={reservationItems.length}
                        />
                    </div>
                </div>
            </Skeleton>
        </Content>
    );
};

export default ReservationsPage;
