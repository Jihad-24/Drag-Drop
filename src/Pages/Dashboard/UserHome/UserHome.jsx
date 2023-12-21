import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import UserProfile from "../../UserProfile/UserProfile";


const UserHome = () => {
    const {user}=useAuth();

    return (
        <div>
            <Helmet>
                <title>UserHome || Task Management</title>
            </Helmet>
            <h1 className="md:text-3xl text-center text-xl">
                <span className='text-blue-900'>Hi, Welcome {user?.displayName ? user.displayName : 'Back'}!</span>
            </h1>
            <div className="mt-12">
                <UserProfile/>
            </div>
        </div>
    );
};

export default UserHome;