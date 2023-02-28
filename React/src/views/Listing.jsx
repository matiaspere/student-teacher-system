import React, { useState, useEffect } from "react";
import { CContainer, CRow } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

const Listing = () => {
    const { user, setUser, setToken } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    const getUserData = async () => {
        try {
            // Get user's data and all the users but filtered according to the user's rol
            const { data } = await axiosClient.get("/auth/user");
            setUser(data);
            const _usersData = await axiosClient.get(
                `/users/${data.user_rols_id}/${paginate}?page=${page}`
            );
            setUsersData(_usersData?.data);
        } catch (error) {
            // if got an error, set user and token null and redirect to login
            setUser({});
            setToken(null);
            <Navigate to="/login" />;
        }
    };

    const getData = async (rol) => {
        // Get all the users but filtered according to the rol given as parameter
        await axiosClient
            .get(`/users/${rol}/${paginate}?page=${page}`)
            .then((data) => {
                setUsersData(data?.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        // get users each time the paginate or page changes
        getData(user?.user_rols_id);
    }, [paginate, page]);

    let rol;
    if (user?.user_rols_id === 1) {
        rol = "teachers";
    } else {
        rol = "students";
    }

    return (
        <div className="container">
            <div className="my-5 container d-flex justify-content-center align-items-center w-100 flex-column">
                <div className="container d-flex flex-row justify-content-between align-items-center gap-2">
                    <p className="lead">Other {rol}</p>
                    <Pagination
                        usersData={usersData}
                        setPaginate={setPaginate}
                        paginate={paginate}
                        setPage={setPage}
                        page={page}
                    />
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData?.data?.map((i) => (
                            <tr key={i.id}>
                                <td>{i?.name}</td>
                                <td>{i?.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Listing;
