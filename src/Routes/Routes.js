import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login'
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import SignUp from "../Pages/SignUp/SignUp";
import About from '../Pages/About/About'
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard'
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/about',
                element: <About></About>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    }
])

export default router;