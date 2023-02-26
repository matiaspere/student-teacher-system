import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const { user, setUser } = useStateContext();
    const [evaluations, setEvaluations] = useState([]);
    const [students, setStudents] = useState([]);

    const getUserData = async () => {
        const { data } = await axiosClient.get("/auth/user");
        setUser(data);

        if (data.user_rols_id === 2) {
            const userEvaluations = await axiosClient.get(
                `/evaluations/${data.id}`
            );
            setEvaluations(userEvaluations.data);
            console.log(userEvaluations.data);
        }
        if (data.user_rols_id === 1) {
            const studentsData = await axiosClient.get(`/students`);
            setStudents(studentsData.data);
            console.log(studentsData);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    let rol;
    if (user?.user_rols_id === 1) {
        rol = "Teacher";
    } else {
        rol = "Student";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // axiosClient.post('')
    };

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Profile</h5>
                            </div>
                            <div className="card-body">
                                <p>
                                    <strong>Name:</strong> {user?.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user?.email}
                                </p>
                                <p>
                                    <strong>Rol:</strong> {rol}
                                </p>
                            </div>
                        </div>
                    </div>
                    {user?.user_rols_id === 2 ? (
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Scores</h5>
                                    <p>
                                        <strong>Average: </strong>
                                        {evaluations?.average?.toFixed(2)}
                                    </p>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Score</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user?.user_rols_id === 2 &&
                                                evaluations?.evaluations?.map(
                                                    (evaluation) => (
                                                        <tr key={evaluation.id}>
                                                            <td>
                                                                {
                                                                    evaluation.nota
                                                                }
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    evaluation.created_at
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">
                                        Create a new score
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div class="mb-3">
                                            <label
                                                for="exampleDataList"
                                                class="form-label"
                                            >
                                                Student
                                            </label>
                                            <input
                                                class="form-control"
                                                list="datalistOptions"
                                                id="exampleDataList"
                                                placeholder="Type to search..."
                                            />
                                            <datalist id="datalistOptions">
                                                {students.map((student) => (
                                                    <option
                                                        value={student.name}
                                                    >
                                                        {student.name}
                                                    </option>
                                                ))}
                                            </datalist>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="exampleInputPassword1"
                                                class="form-label"
                                            >
                                                Score (from 1 to 10)
                                            </label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="exampleInputPassword1"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default User;
