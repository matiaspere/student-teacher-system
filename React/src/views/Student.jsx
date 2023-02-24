import React, {useState, useEffect} from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import Pagination from "../components/Pagination";

const Student = () => {
    const { user, token, setUser } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [paginate, setPaginate] = useState(10);

    if (user?.user_rols_id === 1) {
        return <Navigate to="/teacher" />;
    }

    const getData = async (rol, paginate) => {
        await axiosClient
            .get(`/users/${rol}/${paginate}`)
            .then((data) => {
                setUsersData(data.data.data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData(2, paginate);
    }, [paginate]);

    return (
        <CContainer className="m-0">
            <CRow className="align-items-center">
                <CCol xs={4}>izquierdita</CCol>
                <CCol xs={8}>
                    <div className="my-5 container d-flex justify-content-start align-items-center w-100 flex-column">
                        <div className="container d-flex flex-row justify-content-between align-items-center">
                            <p className="lead">Users</p>
                            <Pagination setPaginate={setPaginate} paginate={paginate}/>
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
                                {usersData.map((i) => (
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

export default Student;
