/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setToDos] = useState([]);
    const [inPrograss, setInPrograss] = useState([]);
    const [completes, setCompletes] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter(task => task.status == 'todo')
        const fInPrograss = tasks.filter(task => task.status == 'inprograss')
        const fCompletes = tasks.filter(task => task.status == 'completes')
        setToDos(fTodos)
        setInPrograss(fInPrograss)
        setCompletes(fCompletes)
    }, [tasks])

    const statuses = ["todo", "inprograss", "completes"]

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 lg:gap-10">
            {
                statuses.map((status, index) =>
                    <Section key={index}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        inPrograss={inPrograss}
                        completes={completes}
                    />
                )
            }
        </div>
    );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inPrograss, completes }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item._id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "todo";
    let bg = "bg-slate-500"
    let taskToMap = todos

    if (status == 'inprograss') {
        text = "In Prograss"
        bg = "bg-purple-500"
        taskToMap = inPrograss
    }

    if (status == 'completes') {
        text = "Completes"
        bg = "bg-green-500"
        taskToMap = completes
    }

    const addItemToSection = (_id) => {
        const updatedTask = {
            status: status,
        };
        fetch(`http://localhost:3001/tasks/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    setTasks((prevTasks) => {
                        const updatedTasks = prevTasks.map((task) => {
                            if (task._id == _id) {
                                return { ...task, status: status };
                            }
                            return task;
                        });
                        return updatedTasks;
                    });
                    toast.success('Status Updated')
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };


    return <div ref={drop} 
    className={`w-full md:w-44 lg:w-72 rounded-md p-2 ${isOver ? "bg-slate-300" : "bg-slate-100"}`}>
        <Header text={text} bg={bg} count={taskToMap?.length} />
        {taskToMap?.length > 0 && taskToMap.map((task) => <Task key={task._id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
        />)}
    </div>
}

const Header = ({ text, bg, count }) => {
    return <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>{text} <div className="ml-2 bg-white text-black rounded-full w-5 h-5 flex justify-center items-center">{count}</div> </div>
}
const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

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

    return <div ref={drag} className={`relative p-4 h-24 mt-8 shadow-md rounded-xl cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`} onClick={() => handleDelete(task._id)}>
        <div className="flex gap-3 items-center">
            <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <img src={task.taskImage} className="text-xs" alt="" />
                </div>
            </div>
            <div>
            <div className="badge badge-secondary">{task.priority}</div>
            <p>{task.titleName}</p>
            {/* <p>{task.authorName}</p> */}
            </div>

        </div>
        <button className="absolute bottom-1 right-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

        </button>
    </div>
}