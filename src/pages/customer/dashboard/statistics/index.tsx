import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import Review from "../../../../models/Review";

import WidgetReviews from "../../../../template/widget-reviews";

import CalendarPage from "../../../calendar";

import { fetchReviews } from "../../../../services/review-service";

/**
 * Customer statistics page.
 *
 * @returns {React.FC}
 */
const StatisticsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetchReviews().then((response) =>
            response.data ? setReviews(response.data) : setReviews([])
        );
    }, []);

    return (
        <Layout>
            <Content>
                <WidgetReviews reviews={reviews} />
                <CalendarPage />
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
