import React, { useState } from "react";

const Statistics: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());

    return (
        <div>dashboard works!</div>
    );
};


export default Statistics;
