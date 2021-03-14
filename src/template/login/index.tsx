import React from "react";
import { Button } from "react-bootstrap";
import { signIn } from "../../asset/services/Auth-Service";
import styles from "./styles.module.scss";

const Login: React.FC = () => {
    const handleSignIn = () => {
        signIn("test").then((response) => {
            // hier handelen we de response af.
        });
    };

    return <Button>test</Button>;
};

export default Login;
