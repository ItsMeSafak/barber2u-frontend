import React from "react";

import OverviewReservationCard from "../../../../components/overview-card-reservation";

/**
 * This component renders the reservations page on the dashboard for the customer.
 * The component consists of reservation items that the customer has made in the past and future.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ReservationsPage: React.FC = () => <OverviewReservationCard />;

export default ReservationsPage;
