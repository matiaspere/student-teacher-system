import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import Navbar from "../components/Navbar";


const DefaultLayout = () => {
    const { token, setUser } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }


    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
