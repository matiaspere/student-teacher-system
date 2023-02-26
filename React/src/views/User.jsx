import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const { user, setUser } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosClient
            .get("/auth/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let rol;
    if (user?.user_rols_id === 1) {
        rol = "Teacher";
    } else {
        rol = "Student";
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <form className="my-5">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                value={user?.name}
                            />
                        </div>
                        <div class="mb-3">
                            <label
                                for="exampleInputPassword1"
                                class="form-label"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputPassword1"
                                value={user?.email}
                            />
                        </div>
                        {/* <div class="mb-3">{rol}</div> */}
                    </form>
                </div>
                <div className="col-8">
                    <div className="container">ads</div>
                </div>
            </div>
        </div>
    );
};

export default User;
