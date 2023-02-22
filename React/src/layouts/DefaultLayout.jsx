import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useStateContext} from '../../context/ContextProvider';

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

  return (
    <div>
        Defalut
        <Outlet/>
    </div>
  )
}

export default DefaultLayout
