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
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid navbar1">
                    <a className="navbar-brand nav-text" href="#">
                        LOGO
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/user"
                                >
                                    Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/listing"
                                >
                                    {user?.user_rols_id === 1 ? 'Teachers' : "Students"}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link active nav-text"
                                    aria-current="page"
                                    href="#"
                                >
                                    {user?.name}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    role="button"
                                    className="nav-link nav-text"
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
