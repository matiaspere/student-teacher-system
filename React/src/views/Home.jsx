import React from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (

            <CContainer className="m-0" >
                <CRow className="align-items-center">
                    <CCol xs={4}>
                        izquierdita
                    </CCol>
                    <CCol xs={8} >
                        <div className="my-5 container d-flex justify-content-start align-items-center w-100 flex-column">
                            <div className="container d-flex flex-row justify-content-between align-items-center">
                                <p className="lead">Users</p>
                                <button className="btn btn-primary disabled">
                                    Add one
                                </button>
                            </div>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Create Date</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>

    );
};

export default Home;


