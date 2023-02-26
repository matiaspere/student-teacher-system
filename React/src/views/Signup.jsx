import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import image from "../images/pexels-polina-zimmerman-3747140.jpg";

const Signup = () => {
    const form = useRef(null);
    const { setUser } = useStateContext();
    const [userCreated, setUserCreated] = useState(false);
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState([]);

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
        getRoles()
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

        axiosClient
            .post("/auth/signup", payload)
            .then(({ data }) => {
                if (data.errors) {
                    const errorJson = JSON.parse(data.errors);
                    console.log(errorJson)
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
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <img
                                src={image}
                                className="img-fluid mx-auto d-block w-50 rounded"
                            />
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-start">
                            <form onSubmit={onSubmit} ref={form}>
                                <h4 className="mb-3">Register for free</h4>
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="emailRegister"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="emailRegister"
                                        aria-describedby="emailHelp"
                                    />
                                    <div id="emailHelp" className="form-text">
                                        We'll never share your email with anyone
                                        else.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="passwordRegister"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="passwordRegister"
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
                                        <option selected>- Select - </option>
                                        {roles.map((rol) => (
                                            <option value={rol.id}>
                                                {rol.description}
                                            </option>
                                        ))}
                                        {/* <option value={"student"}>
                                            Student
                                        </option>
                                        <option value={"teacher"}>
                                            Teacher
                                        </option> */}
                                    </select>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-25"
                                    >
                                        Submit
                                    </button>
                                    <Link to="/login">already registered?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>User created</p>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </>
    );
};

export default Signup;
