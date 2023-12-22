import { useEffect, useState } from "react";
import ListTasks from "./ListTasks";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";


const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const {user}=useAuth();

    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                const data = res.data;
                // console.log(data);
                const findTask = data?.filter(item => item.email == user?.email)
                setTasks(findTask)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [axiosPublic,user])

    return (
        <DndProvider backend={HTML5Backend}>
            <Toaster />
            <Helmet>
                <title>Prograss Management || Task Management</title>
            </Helmet>
            <div className="divider"></div>
            <h1 className="text-center text-2xl md:text-3xl font-bold my-2" data-aos="fade-down">Task Management</h1>
            <div className="divider"></div>
            <div className=" w-full h-screen flex flex-col items-center gap-16 p-3">
                <ListTasks tasks={tasks} setTasks={setTasks} />
            </div>
        </DndProvider>
    );
};

export default TaskManagement;