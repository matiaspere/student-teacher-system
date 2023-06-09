import { CContainer } from "@coreui/bootstrap-react";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const GuestLayout = () => {
    const { token } = useStateContext();


    return (
        <div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
