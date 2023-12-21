import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import icon from '../../assets/react.svg';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const NavBar = () => {

    const { user, logOut, setLoading } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const email = user?.email;
    const axiosPublic = useAxiosPublic();
    // console.log(user);
    useEffect(() => {
        setLoading(true)
        if (email) {
            axiosPublic.get('/users')
                .then(res => {
                    const data = res.data;
                    // console.log(data);
                    const findUser = data?.find(item => item.email == user?.email)
                    setUserData(findUser)
                    // console.log(findUser);
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    }, [email, axiosPublic, setLoading, user?.email])

    const handleSignOut = async () => {
        await logOut()
        if (!user) {
            navigate('/');
        }


    };

    const loggedOut = () => {
        // success alert
        Swal.fire({
            icon: 'success',
            title: 'Sign Out Successfull'
        })
    }

    const navLinks = <>
        <li className="font-semibold"><NavLink to={"/"}>Home</NavLink></li>
        {
            !user && <>
                <li className="font-semibold"><NavLink to={"/register"}>Register</NavLink></li>
                <li className="font-semibold"><NavLink to={"/login"}>Login</NavLink></li>
            </>
        }
        {user?.email && <>
            <li className="font-semibold"><NavLink to="/gallery">Gallery</NavLink></li>
            <li className="font-semibold"><NavLink to="/createtask">Create Task</NavLink></li>
            <li className="font-semibold"><NavLink to="/alltask">All Tasks</NavLink></li>
            {
                user && <li><NavLink to={'/dashboard/userHome'}>Dashboard</NavLink></li>
            }
            <li className="font-semibold"><NavLink to="/profile">Profile</NavLink></li>
            <li className="font-semibold"><NavLink to="/error">Error</NavLink></li>
        </>
        }
    </>


    return (
        <div>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to={"/"}>
                        <div className="hidden md:flex md:items-center md:gap-2">
                            <img src={icon} alt="" />
                            <p className=" md:font-semibold md:text-2xl">TaskManagement</p>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div>

                </div>
                <div className="navbar-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user ? (!user?.photoURL ? (
                                <img
                                    src={
                                        userData && (userData.image || userData.photo)
                                            ? userData.image || userData.photo
                                            : 'https://i.ibb.co/2FngQt8/user.png'
                                    }
                                    alt=""
                                    className="rounded-xl h-[200px] w-[300px]"
                                />
                            ) : (
                                <img
                                    src={user && user.photoURL ? user.photoURL : 'https://i.ibb.co/2FngQt8/user.png'}
                                    alt=""
                                    className="rounded-xl h-[200px] w-[300px]"
                                />
                            )) : ''}

                        </div>
                    </label>
                    <div className="hidden md:block">
                        <Link to={"/profile"}>
                            {user ? <p className="px-1 font-medium">
                                {user && user?.displayName ? user?.displayName : (userData && userData?.name)}
                            </p> : ''}
                        </Link>
                    </div>
                    {
                        !user ?
                            <Link to={"/login"}>
                                <button className="btn bg-[#403F3F] text-white">Login</button>
                            </Link>
                            :
                            <button onClick={() => { handleSignOut(); loggedOut(); }} className="btn bg-[#403F3F] text-white" >Sign Out</button>
                    }
                </div>
            </div>

        </div>
    );
};

export default NavBar;