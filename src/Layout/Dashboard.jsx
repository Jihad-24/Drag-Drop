import { FaBook, FaEnvelope, FaHome, FaNewspaper, FaPeopleCarry, FaUser,  } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {
    
    return (
        <div className="flex max-w-screen-xl mx-auto">
            {/* dashboard side bar */}
            <div className="w-40 md:w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu">
                    {
                            (<>
                                {/* User Routes */}
                                <li>
                                    <NavLink to={"/dashboard/userHome"}>
                                        <FaHome></FaHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/Previoustask"}>
                                        <FaBook></FaBook>
                                        See Previous Tasks
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/newtask"}>
                                        <FaNewspaper></FaNewspaper>
                                        Create New Task 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/taskmanagement"}>
                                        <FaPeopleCarry></FaPeopleCarry>
                                        Task Management
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/userProfile"}>
                                        <FaUser></FaUser>
                                        Profile Settings
                                    </NavLink>
                                </li>

                            </>)
                    }
                    {/* shared navlinks  */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={"/"}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/gallery"}>
                            <FaEnvelope></FaEnvelope>
                            Gallary
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/*dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;