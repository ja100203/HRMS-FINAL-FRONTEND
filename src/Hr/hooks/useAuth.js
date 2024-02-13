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
                    console.log("Roles:", client.resourceAccess.myclient.roles);

                    setToken(client.token);
                    setRoles(client.resourceAccess.myclient.roles);
                } else {
                    console.error("Failed to authenticate");
                }
            })
            .catch((error) => {
                console.error("Failed to initialize Keycloak", error);
            });
    }, []);

    const isHR = roles.includes("client_HR");

    const isEmployee = roles.includes("client_Employee");

    const logout = () => {
        client.logout();
    };

    return { token, isHR, isEmployee, client, logout };
};

export default useAuth;
