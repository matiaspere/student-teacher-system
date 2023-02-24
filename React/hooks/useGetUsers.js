import axiosClient from "../src/axios-client";
import { useEffect, useState } from "react";

export const useGetUsers = (rol = 1, paginate = 5) => {
    const [usersData, setUsersData] = useState([]);

    const getData = async (rol, paginate) => {
        await axiosClient
            .get(`/users/${rol}/${paginate}`)
            .then((data) => {
                setUsersData(data.data.data);
                console.log(data.data.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData(rol, paginate);
    }, []);

    return usersData;
};
