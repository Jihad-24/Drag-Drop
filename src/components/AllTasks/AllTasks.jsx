import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";


const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const {user}=useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axiosPublic.get('/tasks')
            .then(res => {
                const data = res.data;
                // console.log(data);
                const findTask = data?.filter(item => item.email == user?.email)
                setTasks(findTask)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [axiosPublic,user])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result?.isConfirmed) {
                fetch(`http://localhost:3001/tasks/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data?.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your task has been deleted.',
                                'success'
                            )
                            const remaining = tasks?.filter(prod => prod._id !== id)
                            setTasks(remaining);
                        }
                    })
            }
        })
    }
    return (
        <div>
            <Helmet>
                <title>All Tasks || Task Management</title>
            </Helmet>
            <div className="divider"></div>
            <h1 className="text-center text-2xl md:text-3xl font-bold my-2" data-aos="fade-down">All Tasks</h1>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-center mb-10">
                {!isLoading && !tasks.length ?
                    (<div className="text-center mx-auto md:w-[700px] lg:w-[1100px]">
                        <h1 className="font-bold loading-10  text-3xl" data-aos="fade-down">
                            <span className="font-extrabold text-red-600" > Oops, </span> <br />
                            it seems like there are currently no <br /> tasks has been Created. Please <br /> Create tasks to see them.
                        </h1>
                    </div>)
                        :
                        (tasks.map(task => <div key={task._id}
                            className="card bg-base-100 shadow-xl">
                            <figure><img src={task.taskImage} className="h-40" alt="Shoes" /></figure>
                            <div className="card-body ">
                                <h2 className="card-title">
                                    {task.titleName}
                                    <div className="badge badge-primary">{task.status}</div>
                                </h2>
                                <p><span className="font-medium">Author :</span> <div className="badge badge-accent">{task.authorName}</div></p>
                                <p><span className="font-medium">Priority :</span> <div className="badge badge-secondary">{task.priority}</div></p>
                                <p><span className="font-medium">Deadlines :</span> <div className="badge badge-warning">{task.deadlines}</div></p>
                                <p><span className="font-medium">Description :</span> {task.description}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/dashboard/Previoustask/${task._id}`}>
                                        <button className=" btn btn-secondary btn-outline">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(task._id)} className=" btn btn-error btn-outline">Delete</button>
                                </div>
                            </div>
                        </div>))
                }
            </div>
            {isLoading &&
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6'>
                    <div className="flex flex-col gap-4 w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
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

export default AllTasks;