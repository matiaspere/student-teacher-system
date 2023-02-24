import { createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import Student from './views/Student';
import Teacher from './views/Teacher';
import Listing from './views/Listing';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/NotFound';


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/student" />,
            },
            {
                path: "/student",
                element: <Student />,
            },
            {
                path: "/teacher",
                element: <Teacher />,
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
