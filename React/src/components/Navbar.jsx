import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo-removebg-preview.png";

const Navbar = () => {
    const { user, token, setUser, setToken } = useStateContext();

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/auth/logout").then(() => {
            setUser({});
            setToken(null);
            <Navigate to="/login" />;
        });
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/home">
                    <img src={logo} alt="logo" style={{ width: "50px" }} />
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
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {token ? (
                            <>
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        aria-current="page"
                                        href="/user"
                                        style={{ color: "#0D4F94" }}
                                    >
                                        Profile
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        href="/listing"
                                        style={{ color: "#0D4F94" }}
                                    >
                                        {user?.user_rols_id === 1
                                            ? "Teachers"
                                            : "Students"}
                                    </a>
                                </li>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </ul>

                    <ul class="navbar-nav ml-auto">
                        {token ? (
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={onLogout}>
                                    Logout
                                </a>
                            </li>
                        ) : (
                            <>
                                <li class="nav-item">
                                    <a
                                        style={{
                                            backgroundColor: "#0D4F94",
                                            borderRadius: "5px",
                                        }}
                                        class="nav-link text-white text-center"
                                        href="/signup"
                                    >
                                        Signup
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link text-center"
                                        href="/login"
                                    >
                                        Login
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
