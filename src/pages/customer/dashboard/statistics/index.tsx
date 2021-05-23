import React, { useContext } from "react";
import moment from "moment";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Review from "../../../../models/Review";
import { AuthenticationContext } from "../../../../contexts/authentication-context";
import WidgetReviews from "../../../../template/widget-reviews";

/**
 * Customer statistics page.
 *
 * @returns {React.FC}
 */
const StatisticsPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);
    if (user == null) return <h1>OOOPS, Something went wonrg</h1>;

    const reviews: Review[] = [
        new Review("id", user, "image", 5, "review msg5", moment()),
        new Review("id", user, "image", 4, "review msg4", moment()),
        new Review("id", user, "image", 3, "review msg3", moment()),
        new Review("id", user, "image", 2, "review msg2", moment()),
        new Review("id", user, "image", 1, "review msg1", moment()),
    ];
    return (
        <Layout>
            <Content>
                <WidgetReviews reviews={reviews} />
            </Content>
        </Layout>
    );
};

export default StatisticsPage;
