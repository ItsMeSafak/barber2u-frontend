import React, { useCallback, useContext, useEffect, useState } from "react";

import {
    Col,
    Divider,
    Empty,
    Layout,
    Pagination,
    Row,
    Select,
    Skeleton,
} from "antd";
import { getReservations } from "../../services/reservation-service";

import Reservation from "../../models/Reservation";

import ReservationCard from "../card-reservation";

import styles from "./styles.module.scss";
import Status from "../../models/enums/Status";
import { BarberbContext } from "../../contexts/barber-context";
import { showHttpResponseNotification } from "../../assets/functions/notification";

const { Content } = Layout;
const { Option } = Select;

const MAX_ITEMS_PAGE = 6;

/**
 *
 *
 * @returns {JSX}
 */
const OverviewReservationCard: React.FC = () => {
    const [reservationItems, setReservationItems] = useState<Reservation[]>([]);
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_ITEMS_PAGE);
    const [currentFilter, setCurrentFilter] = useState("");
    const { loading, isUpdated, setIsUpdated, setLoading } = useContext(
        BarberbContext
    );

    /**
     * This function fetches the reservation from the backend and displays it on the page.
     */
    const fetchReservations = useCallback(
        async (filterStatus: string | null) => {
            setLoading(true);
            const response = await getReservations(filterStatus);

            const { status, message } = response;
            showHttpResponseNotification(message, status, false);
            if (!response.data) return;

            setReservationItems(response.data);
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
        reservationList.slice(minIndexValue, maxIndexValue).map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
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
    };

    return (
        <Content className={styles.reservations}>
            <h1 className={styles.title}>Reservations</h1>
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
            <Skeleton active loading={loading} />
            {!loading && (
                <>
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

export default OverviewReservationCard;
