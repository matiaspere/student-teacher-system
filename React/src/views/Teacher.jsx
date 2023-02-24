import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";


import "bootstrap/dist/css/bootstrap.min.css";

const Teacher = () => {
    const { user, token, setUser } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    if (user?.user_rols_id === "student") {
        return <Navigate to="/student" />;
    }

    const getData = async (rol, paginate) => {
        await axiosClient
            .get(`/users/${rol}/${paginate}?page=${page}`)
            .then((data) => {
                setUsersData(data?.data);
                console.log(data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData(1, paginate, page);
    }, [paginate, page]);

    return (
        <CContainer className="m-0">
            <CRow className="align-items-center">
                <CCol xs={4}>izquierdita</CCol>
                <CCol xs={8}>
                    <div className="my-5 container d-flex justify-content-start align-items-center w-100 flex-column">
                        <div className="container d-flex flex-row justify-content-between align-items-center">
                            <p className="lead">Users</p>
                            <Pagination usersData={usersData} setPaginate={setPaginate} paginate={paginate} setPage={setPage} page={page}/>
                        </div>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData?.data?.map((i) => (
                                    <tr key={i.id}>
                                        <th scope="row">{i.id}</th>
                                        <td>{i?.name}</td>
                                        <td>{i?.email}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Teacher;
