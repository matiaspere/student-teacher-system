import React from "react";
import image from "../images/pexels-polina-zimmerman-3747140.jpg";
// import {
//     CForm,
//     CFormLabel,
//     CFormInput,
//     CFormText,
//     CButton,
//     CFormCheck,
//     CCol,
//     CContainer,
//     CRow,
// } from "@coreui/bootstrap-react";

const Login = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <img
                            src={image}
                            className="img-fluid mx-auto d-block w-50 rounded"
                        />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-start">
                        <form>
                            <h4>Login</h4>
                            <div class="mb-3">
                                <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" class="form-text">
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label
                                    for="exampleInputPassword1"
                                    class="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
