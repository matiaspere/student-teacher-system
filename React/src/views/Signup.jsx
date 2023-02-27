import React, { useEffect, useRef, useState } from "react";
import {  Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";

const Signup = () => {
    const form = useRef(null);
    const { setUser, token } = useStateContext();
    const [userCreated, setUserCreated] = useState(false);
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState([]);

    if (token) {
        return <Navigate to="/" />;
    }
    useEffect(() => {
        async function getRoles() {
            await axiosClient
                .get("/roles")
                .then((data) => {
                    setRoles(data.data.roles);
                    console.log(data.data.roles);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getRoles();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            password_confirmation: formData.get("password_confirmation"),
            user_rols_id: formData.get("user_rols_id"),
        };

        console.log(payload);
        axiosClient
            .post("/auth/signup", payload)
            .then(({ data }) => {
                if (data.errors) {
                    const errorJson = JSON.parse(data.errors);
                    console.log(errorJson);
                    setErrors(errorJson);
                } else {
                    setUser(data.user);
                    setUserCreated(true);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 500) {
                    // error de validacion
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <>
            {!userCreated ? (
                <div class="container py-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <h1 class="text-center mb-4">Signup</h1>
                            {errors && (
                                <div>
                                    {Object.keys(errors).map((i) => (
                                        <div
                                            key={i}
                                            className="p-2 mb-2 text-white rounded"
                                            style={{
                                                backgroundColor: "#e04cd8",
                                                border: "none",
                                            }}
                                        >
                                            {errors[i][0]}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <form ref={form} onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="nameRegister"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        id="nameRegister"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="********"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="passwordConfirmationRegister"
                                        className="form-label"
                                    >
                                        Password Confirmation
                                    </label>
                                    <input
                                        name="password_confirmation"
                                        type="password"
                                        className="form-control"
                                        id="passwordConfirmationRegister"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="userTypeRegister"
                                        className="form-label"
                                    >
                                        Student or Teacher?
                                    </label>
                                    <select
                                        className="form-select"
                                        id="userTypeRegister"
                                        name="user_rols_id"
                                    >
                                        <option defaultValue={null}></option>
                                        {roles.map((rol) => (
                                            <option value={rol.id}>
                                                {rol.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div class="d-grid gap-2">
                                    <button
                                        type="submit"
                                        class="btn"
                                        style={{
                                            backgroundColor: "#0D4F94",
                                            border: "none",
                                            color: "white",
                                        }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                            <hr />
                            <div class="text-center d-flex flex-column">
                                <p
                                    style={{
                                        color: "#0D4F94",
                                    }}
                                >
                                    Already have an account?
                                </p>
                                <a
                                    href="/login"
                                    class="btn"
                                    style={{
                                        border: "2px solid #0D4F94",
                                        color: "#0D4F94",
                                    }}
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    class="container py-5 d-flex align-items-center justify-content-center"
                    style={{ height: "100vh" }}
                >
                    <div class="row">
                        <div class="col-md-6">
                            <h1 class="text-center mb-4">
                                Successful registration
                            </h1>
                            <div class="d-grid gap-2">
                                <a
                                    href="/login"
                                    type="submit"
                                    class="btn"
                                    style={{
                                        backgroundColor: "#0D4F94",
                                        border: "none",
                                        color: "white",
                                    }}
                                >
                                    Login
                                </a>
                            </div>
                            <hr />
                            <div class="text-center d-flex flex-column">
                                <p
                                    style={{
                                        color: "#0D4F94",
                                    }}
                                >
                                    <a href="/home">Go back to Home</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;
