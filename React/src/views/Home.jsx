import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
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

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="mt-5 d-flex flex-column w-50">
                <div className="input-group mb-3">
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
                <Pagination
                    usersData={usersData}
                    setPaginate={setPaginate}
                    paginate={paginate}
                    setPage={setPage}
                    page={page}
                />
            </div>

            <table className="table w-50">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
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
    );
};

export default Home;
