import React, { useState, useEffect } from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

const Listing = () => {
    const { user, setUser } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    const getData = async (rol) => {
        await axiosClient
            .get(`/users/${rol}/${paginate}?page=${page}`)
            .then((data) => {
                setUsersData(data?.data);
            })
            .catch((err) => console.log(err));
    };

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

    useEffect(() => {
        getData(user?.user_rols_id);
    }, [paginate, page]);


    return (
        <CContainer>
            <CRow className="align-items-start justify-content-center h-100 gx-5">
                {/* <div className="col-3 bg-info" style={{height: "100vh"}}>
                        cssandsanb
                    </div> */}
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="my-5 container d-flex justify-content-center align-items-center w-100 flex-column">
                        <div className="container d-flex flex-row justify-content-between align-items-center">
                            <p className="lead">Users</p>
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
            </CRow>
        </CContainer>
    );
};

export default Listing;
