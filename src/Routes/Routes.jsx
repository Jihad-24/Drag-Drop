import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Gallery from "../Pages/Gallery/Gallery";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/UserProfile/UserProfile";
import HomePage from "../Pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import UpdateProfile from "../Pages/UserProfile/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Profile from "../components/Profile/Profile";
import PreviousTasks from "../Pages/Dashboard/PreviousTasks/PreviousTasks";
import AddNewTask from "../Pages/Dashboard/AddNewTask/AddNewTask";
import TaskManagement from "../Pages/Dashboard/TaskManagement/TaskManagement";
import UpdateTask from "../Pages/Dashboard/UpdateTask/UpdateTask";
import AllTasks from "../components/AllTasks/AllTasks";
import CreateTasks from "../components/CreateTasks/CreateTasks";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children:[
            {
                path:'/',
                element:<HomePage></HomePage>,
            },
            {
                path:'gallery',
                element:<PrivateRoute><Gallery></Gallery></PrivateRoute>,
            },
            {
                path:'createtask',
                element:<PrivateRoute><CreateTasks></CreateTasks></PrivateRoute>,
            },
            {
                path:'alltask',
                element:<PrivateRoute><AllTasks></AllTasks></PrivateRoute>,
            },
            {
                path:'profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path:'userProfile/:id',
                element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>,
            },
           
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path:'userHome',
                element:<UserHome></UserHome>,
            },
            {
                path:'Previoustask',
                element:<PreviousTasks></PreviousTasks>,
            },
            {
                path:'Previoustask/:id',
                element:<UpdateTask></UpdateTask>,
            },
            {
                path:'newtask',
                element:<AddNewTask></AddNewTask>,
            },
            {
                path:'taskmanagement',
                element:<TaskManagement></TaskManagement>,
            },
            {
                path:'userProfile',
                element:<UserProfile></UserProfile>,
            },
            {
                path:'userProfile/:id',
                element:<UpdateProfile></UpdateProfile>,
            },
            
        ]
    },
    {
        path:'/login',
        element:<Login></Login>,
    },
    {
        path:'/register',
        element:<Register></Register>,
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>,
    },
]);

export default router;