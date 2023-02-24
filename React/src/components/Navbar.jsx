import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
    CNavbar,
    CNavbarNav,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavItem,
    CNavLink,
} from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const { user, setUser, setToken } = useStateContext();
    // const [visible, setVisible] = useState(false);

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/auth/logout").then(() => {
            setUser({});
            setToken(null);
            return <Navigate to="/login" />;
        });
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark">
                <div class="container-fluid navbar1">
                    <a class="navbar-brand nav-text" href="#">
                        LOGO
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a
                                    class="nav-link active nav-text"
                                    aria-current="page"
                                    href="#"
                                >
                                    {user?.name}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    role="button"
                                    class="nav-link nav-text"
                                    onClick={onLogout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
