import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import Navbar from "../components/Navbar";


const DefaultLayout = () => {
    const { user, token, setUser } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        axiosClient
            .get("/auth/user")
            .then(({ data }) => {
                setUser(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
