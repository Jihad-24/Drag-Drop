import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
    const { register, handleSubmit, reset } = useForm()
    const { id } = useParams();
    const { user } = useAuth();
    const [userData, setUserData] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    // console.log(id);
    // console.log(userData);


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

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const patchItem = {
                name: data.name,
                image: res.data.data.display_url
            }
            const patchRes = await axiosPublic.put(`/user/${id}`, patchItem)
            // console.log(patchRes.data);
            if (patchRes.data.modifiedCount) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Update Successfull`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/userProfile')

            }
        }
        // console.log('with image url', res.data);
    };


    return (
        <div>
            <Helmet>
                <title>UpdateProfile || Fitness Tracker</title>
            </Helmet>
            <div className="divider"></div>
            <h1 className="text-center text-2xl md:text-3xl font-bold my-2">Update Your Profile</h1>
            <div className="divider"></div>
            <div className="">
                {!isLoading &&
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
                        <div className="form-control w-full items-center">
                            <label className="label">
                                <span className="label-text font-medium">Your Name*</span>
                            </label>
                            <input {...register("name", { required: true })}

                                type="text" defaultValue={userData.name}
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full items-center">
                            <label className="label">
                                <span className="label-text font-medium">Your Email*</span>
                            </label>
                            <input readOnly
                                type="email" defaultValue={userData.email}
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control my-6">
                            <label className="label">
                                <span className="label-text font-medium">Your Image*</span>
                            </label>
                            <input {...register("image", { required: true })}

                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs" />

                        </div>
                        <button type="submit" className="btn bg-[#B58130]">
                            <span className="text-white flex gap-2"> Update<FaStar /></span>
                        </button>
                    </form>

                }
            </div>
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

export default UpdateProfile;