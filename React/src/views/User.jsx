import React, { useEffect, useState, useRef } from "react";
import { CToast, CToastHeader, CToastBody } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const User = () => {
    const { user, setUser } = useStateContext();
    const [evaluations, setEvaluations] = useState([]);
    const [students, setStudents] = useState([]);
    const form = useRef(null);
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    console.log(user)

    const getUserData = async () => {
        const { data } = await axiosClient.get("/auth/user");
        setUser(data);

        if (data.user_rols_id === 2) {
            const userEvaluations = await axiosClient.get(
                `/evaluations/${data.id}`
            );
            setEvaluations(userEvaluations.data);
        }
        if (data.user_rols_id === 1) {
            const studentsData = await axiosClient.get(`/students`);
            setStudents(studentsData.data);
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
            teacher_id: parseFloat(user.id),
            student_id: parseFloat(formData.get("student_id")),
            nota: parseFloat(formData.get("nota")),
        };

        axiosClient
            .post("/evaluations", payload)
            .then((data) => {
                if (data.data.errors) {
                    const errorJson = JSON.parse(data.data.errors);
                    setErrors(errorJson);
                } else {
                    setErrors(null);
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 1500);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 500) {
                    const errorObjet = {
                        error: ["Student does not exists"],
                    };
                    setErrors(errorObjet);
                }
            });
    };

    return (
        <>
            <div className="toast-container">
                <CToast
                    title="Bootstrap React"
                    autohide={false}
                    visible={show}
                    placement="top-center"
                >
                    <CToastHeader close>
                        <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect
                                width="100%"
                                height="100%"
                                fill="#007aff"
                            ></rect>
                        </svg>
                        <strong className="me-auto">
                            Score created succesfully
                        </strong>
                        <small>Recently</small>
                    </CToastHeader>
                    <CToastBody>
                        The student will be able to view this score shortly
                    </CToastBody>
                </CToast>
            </div>

            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor:"#0D4F94" }}>
                                <h5 className="card-title text-white" >Profile</h5>
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
                                <div className="card-header" style={{ backgroundColor: "#0D4F94" }}>
                                    <h5 className="card-title text-white">Scores</h5>
                                    <p className="text-white">
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
                                <div className="card-header" style={{ backgroundColor: "#0D4F94" }}>
                                    <h5 className="card-title text-white">
                                        Create a new score
                                    </h5>
                                </div>
                                <div className="card-body">
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
                                    <form ref={form}>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="student_id"
                                                className="form-label"
                                            >
                                                Student
                                            </label>
                                            <input
                                                className="form-control"
                                                list="datalistOptions"
                                                id="student"
                                                name="student_id"
                                                placeholder="Type to search..."
                                            />
                                            <datalist id="datalistOptions">
                                                {students.map((student) => (
                                                    <option
                                                        value={student.id}
                                                        key={student.id}
                                                    >
                                                        {student.name}
                                                    </option>
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="nota"
                                                className="form-label"
                                            >
                                                Score (from 1 to 10)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="nota"
                                                name="nota"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={onSubmit}
                                            style={{ backgroundColor: "#e04cd8", border: 'none' }}
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
