import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";


const Profile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axiosPublic.get('/users')
            .then(res => {
                const data = res.data;
                // console.log(data);
                const findUser = data?.find(item => item.email == user?.email)
                setUserData(findUser)
                // console.log(findUser);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [axiosPublic, user])

    return (
        <div className="my-12">
            <Helmet>
                <title>Profile || Fitness Tracker</title>
            </Helmet>
            {!isLoading &&
                <div className="flex justify-center">
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            {!user?.photoURL ?
                                <img src={userData && userData.image ? userData?.image : 'https://i.ibb.co/2FngQt8/user.png'} className="rounded-xl h-[200px] w-[300px]" />
                                :
                                <img src={user && user?.photoURL ? user?.photoURL : 'https://i.ibb.co/2FngQt8/user.png'} className="rounded-xl h-[200px] w-[300px]" />
                            }
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title" data-aos="fade-left">Name: {userData?.name}</h2>
                            <p className="text-[#757575] font-bold" data-aos="fade-right">Email: {userData?.email}</p>
                            <div className="card-actions" data-aos="fade-down">
                                <Link to={`/dashboard/userProfile/${userData?._id}`}>
                                <button className="btn btn-primary">Update Profile</button></Link>
                            </div>
                        </div>
                    </div>
                </div>}
            {isLoading &&
                <div className='flex justify-center items-center'>
                    <div className="flex flex-col gap-4 w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>}
        </div>
    );
};

export default Profile;