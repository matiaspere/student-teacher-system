import React, { useEffect, useState } from "react";
import { CContainer, CRow, CCol } from "@coreui/bootstrap-react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const { user, setUser } = useStateContext();
    const [evaluations, setEvaluations] = useState([]);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    const getUserData = async () => {
        const { data } = await axiosClient.get("/auth/user");
        setUser(data);

        if (data.user_rols_id === 2) {
            const userEvaluations = await axiosClient.get(
                `/evaluations/${data.id}`
            );
            setEvaluations(userEvaluations.data.evaluations);
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

    return (
        <div className="row">
            <div className="col-4">
                <div className="mb-3">
                    <div>
                        {user?.name}
                        <div />
                    </div>
                    <div className="mb-3">
                        <div>
                            {user?.email}
                            <div />
                        </div>
                        <div class="mb-3">{rol}</div>
                    </div>
                    <div className="col-8"></div>
                </div>
            </div>
            <div>
                {user?.user_rols_id === 2 &&
                    evaluations.map((evaluation) => (
                        <div>{evaluation.nota}</div>
                    ))}
            </div>
        </div>
    );
};

export default User;
