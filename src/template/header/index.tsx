import React from "react";

import styles from "./styles.module.scss";

interface ComponentProps {
    tabs?: {
        url: string;
        name: string;
        isPillButton: boolean;
    }[];
}

const Header: React.FC<ComponentProps> = ({ tabs }) => (
    <header>
        <h2 className={styles.title}>Barber2U</h2>
        <ul className={styles.navbarRightSide}>
            {/* <div>Home</div>
            <div>How it works</div>
            <div>About</div>
            <div>Contact</div>
            <div className="loginbtn">Log in</div> */}
            {tabs &&
                tabs.map(({ url, name, isPillButton }) => (
                    <li
                        key={name}
                        className={isPillButton && styles.pillButton}
                    >
                        <a href={url}>{name}</a>
                    </li>
                ))}
        </ul>
    </header>
);

export default Header;
