import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import Pagination from "../components/Pagination";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
    const { user, token } = useStateContext();
    const [usersData, setUsersData] = useState([]);
    const [value, setValue] = useState(null);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    const onInputChange = (e) => {
        setPage(1);
        setPaginate(10);
        setValue(e.target.value);
    };
    const getUsers = async (value, paginate, page) => {
        if (value === "") {
            await axios
                .get(
                    `http://localhost:8000/api/home/null/${paginate}?page=${page}`
                )
                .then((data) => {
                    setUsersData(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await axios
                .get(
                    `http://localhost:8000/api/home/${value}/${paginate}?page=${page}`
                )
                .then((data) => {
                    setUsersData(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        getUsers(value, paginate, page);
    }, [value, paginate, page]);

    console.log(user);
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary px-2">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        Logo
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#rightButtons"
                        aria-controls="rightButtons"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="rightButtons">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <div>
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    {!token && (
                                        <a
                                            class="nav-link signup text-center"
                                            href="/signup"
                                        >
                                            Sign up
                                        </a>
                                    )}
                                </li>
                                <li class="nav-item">
                                    {token ? (
                                        <a
                                            class="nav-link text-center"
                                            href="/user"
                                        >
                                            Profile
                                        </a>
                                    ) : (
                                        <a
                                            class="nav-link text-center"
                                            href="/login"
                                        >
                                            Login
                                        </a>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container-fluid mt-5 p-4">
                <h1>Students and teachers</h1>
                <hr />
                <div class="input-group">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                    >
                        Name or email
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={onInputChange}
                    />
                </div>
                <div className="mt-3">
                    <Pagination
                        usersData={usersData}
                        setPaginate={setPaginate}
                        paginate={paginate}
                        setPage={setPage}
                        page={page}
                    />
                </div>
                <div className="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData?.users?.data?.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.name}</th>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.user_rols_id === 1
                                            ? "Teacher"
                                            : "Student"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Home;
