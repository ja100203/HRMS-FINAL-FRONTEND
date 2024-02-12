import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://localhost:8080",
    realm: "myrealm",
    clientId: "myclient",
});

const useAuth = () => {
    const isRun = useRef(false);
    const [token, setToken] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        client
            .init({ onLoad: "login-required" })
            .then((authenticated) => {
                if (authenticated) {
                    // Print the token to the console
                    console.log("Token:", client.token);
                    console.log("Roles:", client.realmAccess.roles);

                    setToken(client.token);
                    setRoles(client.realmAccess.roles);
                } else {
                    console.error("Failed to authenticate");
                }
            })
            .catch((error) => {
                console.error("Failed to initialize Keycloak", error);
            });
    }, []);

    const isHR = roles.includes("hr");

    const isEmployee = roles.includes("employee");

    return { token, isHR, isEmployee };
};

export default useAuth;
