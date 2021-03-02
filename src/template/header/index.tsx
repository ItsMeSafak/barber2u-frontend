import React from "react";

import "./styles.scss";

const Header: React.FC = () => (
    <header>
        <div>
            <div>LOGO</div>
        </div>
        <div className="nav-right">
            <div>Home</div>
            <div>How it works</div>
            <div>About</div>
            <div>Contact</div>
            <div className="loginbtn">Log in</div>
        </div>
    </header>
    );

export default Header;
