import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateTask = () => {
    const [task, setTask] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                const data = res.data;
                const fTask = data?.filter(ft => ft._id == id)
                // console.log(res.data);
                setTask(fTask)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [axiosPublic, id])

    // console.log(task[0]?.taskImage);  

    const onSubmit = async (data) => {
        const imageFile = { image: data.taskImage[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const updatedTask = {
                titleName: data.titleName || task[0]?.titleName,
                priority: data.priority || task[0]?.priority,
                deadlines: data.deadlines || task[0]?.deadlines,
                authorName: data.authorName || task[0]?.authorName,
                description: data.description || task[0]?.description,
                taskImage: res.data.data.display_url 
            }
            const postRes = await axiosPublic.put(`/tasks/${task[0]?._id}`, updatedTask)
            console.log(postRes.data);
            if (postRes.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `added to the classes`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/Previoustask')
            }
        }
        console.log('with image url', res.data);
    };
    return (
        <div>
            <Helmet>
                <title>Edit Task || Task Management</title>
            </Helmet>
            <div className="divider"></div>
            <h1 className="text-center text-2xl md:text-3xl font-bold my-2">Edit Existing Task</h1>
            <div className="divider"></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex md:flex-row flex-col gap-6">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-medium">Title Name*</span>
                            </label>
                            <input defaultValue={task[0]?.titleName} {...register("titleName")}

                                type="text" 
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Select Task Priority*</span>
                            </label>
                            <select defaultValue={task[0]?.priority} {...register("priority")}
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
                                <span className="label-text font-medium">Select Deadline*</span>
                            </label>
                            <input {...register("deadlines")}

                                type="date" defaultValue={task[0]?.deadlines}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Author Name*</span>
                            </label>
                            <input {...register("authorName")}

                                type="text" defaultValue={task[0]?.authorName}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-medium">Description About Task*</span>                        </label>
                        <textarea {...register("description")}

                            className="textarea textarea-bordered h-24"
                            defaultValue={task[0]?.description}></textarea>
                    </div>
                    <div className="form-control my-6 justify-center items-center">
                        <label className="label">
                            <span className="label-text font-medium">Update Author Image*</span>                        </label>
                        <input {...register("taskImage", { required: true })}

                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs" />

                    </div>
                    <div className="flex items-center justify-center">
                        <button className="btn bg-[#B58130]">
                            <span className="text-white flex gap-2"><FaStar /> Save Edit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;