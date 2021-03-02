import React from "react";

import "./styles.scss";

const Header: React.FC = () => (
    <header>
        <ul>
            <li>LOGO</li>
        </ul>
        <ul className="nav-right">
            <li>Home</li>
            <li>How it works</li>
            <li>About</li>
            <li>Contact</li>
            <li className="loginbtn">Log in</li>
        </ul>
    </header>
    );

export default Header;
