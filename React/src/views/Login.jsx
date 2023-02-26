import React, { useState, useRef } from "react";
import image from "../images/pexels-polina-zimmerman-3747140.jpg";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";

const Login = () => {
    const form = useRef(null);
    const [errors, setErrors] = useState([]);
    const { setUser, setToken } = useStateContext();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        await axiosClient
            .post("/auth/login", payload)
            .then(({ data }) => {
                if (data.errors) {
                    const errorJson = JSON.parse(data.errors);
                    console.log(errorJson);
                    setErrors(errorJson);
                } else if (data.access_token) {
                    setToken(data.access_token);
                    setUser(data.user);
                    if (data.user.user_rols_id === 1) {
                        return <Navigate to="/teacher"/>
                    } else {
                        return <Navigate to="/student"/>
                    }
                } else {
                    const errorObjet = {
                        error: [data],
                    };
                    console.log(errorObjet);
                    setErrors(errorObjet);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

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
                        <form ref={form} onSubmit={onSubmit}>
                            <h4>Login</h4>
                            {errors && (
                                <div>
                                    {Object.keys(errors).map((i) => (
                                        <div
                                            key={i}
                                            className="p-2 mb-2 bg-danger text-white rounded"
                                        >
                                            {errors[i][0]}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mb-3">
                                <label
                                    for="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    for="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-25"
                                >
                                    Submit
                                </button>
                                <Link to="/signup">not registered?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
