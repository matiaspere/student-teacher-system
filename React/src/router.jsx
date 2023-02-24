import { createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import User from './views/User';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/NotFound';
import Listing from './views/Listing';


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/user" />,
            },
            {
                path: "/user",
                element: <User />,
            },
            {
                path: "/listing",
                element: <Listing />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
