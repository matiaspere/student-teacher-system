import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Navbar from "../components/Navbar";


const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
