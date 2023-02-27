import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";

const Login = () => {
    const form = useRef(null);
    const [errors, setErrors] = useState([]);
    const { setUser, setToken, token, user } = useStateContext();

    if (token) {
        return <Navigate to="/user" />;
    }

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
                        return <Navigate to="/teacher" />;
                    } else {
                        return <Navigate to="/student" />;
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
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h1 class="text-center mb-4">Login</h1>
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
                                Login
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
                            Don't have an account?
                        </p>
                        <a
                            href="/signup"
                            class="btn"
                            style={{
                                border: "2px solid #0D4F94",
                                color: "#0D4F94",
                            }}
                        >
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
