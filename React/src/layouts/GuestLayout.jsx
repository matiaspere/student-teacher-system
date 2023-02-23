import { CContainer } from "@coreui/bootstrap-react";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const GuestLayout = () => {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div className="col-auto p-5 h-100">
            <Outlet />
        </div>
    );
};

export default GuestLayout;
