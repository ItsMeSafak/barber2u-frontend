import React from "react";
import { Card } from "antd";

import styles from "./styles.module.scss";

const Reservations: React.FC = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date: number = new Date().getUTCMonth()

    return (
        <div className={styles.header}>
            {monthNames[date]}
        </div>
    );
};


export default Reservations;
