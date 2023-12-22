import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateTasks = () => {
    const { user } = useAuth();
    // console.log(user.email);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const imageFile = { image: data.taskImage[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const postItem = {
                titleName: data.titleName,
                status: "todo",
                email: user.email,
                priority: data.priority,
                deadlines: data.deadlines,
                authorName: data.authorName,
                description: data.description,
                taskImage: res.data.data.display_url
            }
            const postRes = await axiosPublic.post('/tasks', postItem)
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `added to the classes`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };
    return (
        <div className="mb-12 mx-10">
            <Helmet>
                <title>Create Task || Task Management</title>
            </Helmet>
            <div className="divider"></div>
            <h1 className="text-center text-2xl md:text-3xl font-bold my-2 text-[#B58130]" data-aos="fade-down">Create New Task</h1>
            <div className="divider"></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex md:flex-row flex-col gap-6">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-medium text-[#B58130]">Title Name*</span>
                            </label>
                            <input {...register("titleName", { required: true })}
                                data-aos="flip-left"
                                type="text" placeholder="Enter Title Name"
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium text-[#B58130]">Select Task Priority*</span>
                            </label>
                            <select defaultValue={'default'} {...register("priority", { required: true })} data-aos="flip-right"
                                className="select select-bordered w-full ">
                                <option disabled value={'default'}>Select a Priority?</option>
                                <option value="Low">Low</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-6 my-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium text-[#B58130]">Select Deadline*</span>
                            </label>
                            <input {...register("deadlines", { required: true })}
                                data-aos="fade-down-left"
                                type="date" placeholder="Enter Deadline"
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium text-[#B58130]">Author Name*</span>
                            </label>
                            <input {...register("authorName", { required: true })}
                                data-aos="fade-down-right"
                                type="text" placeholder="Enter Author Name"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-medium text-[#B58130]">Description About Task*</span>                        </label>
                        <textarea {...register("description", { required: true })}
                            data-aos="zoom-in"
                            className="textarea textarea-bordered h-24"
                            placeholder="Write a short description about the Task"></textarea>
                    </div>
                    <div className="form-control my-6 justify-center items-center">
                        <label className="label">
                            <span className="label-text font-medium text-[#B58130]">Provide Author Image*</span>                        </label>
                        <input {...register("taskImage", { required: true })}

                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs" />

                    </div>
                    <div className="flex items-center justify-center">
                        <button className="btn bg-[#B58130]">
                            <span className="text-white flex gap-2"><FaStar />  Create Task</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTasks;