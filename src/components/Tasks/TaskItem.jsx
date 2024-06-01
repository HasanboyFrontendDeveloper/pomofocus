import { useState } from "react";
import { more } from "../../assets";
import { AddTask } from "../";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { reorderData } from "../../constants";
import { useDispatch } from "react-redux";
import { updateTasks } from "../../slices/tasks";
import { toast } from "react-toastify";
import TasksService from "../../service/tasks";

const TaskItem = ({ item, index }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const { tasks } = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const handleFinished = async () => {
        const newItem = { ...item, isFinished: !item.isFinished }

        let newData = []
        if (!newItem.isFinished) {
            newData = reorderData(tasks, index, newItem)
        } else {
            newData = [...tasks]
            newData.splice(index, 1)
            newData.push(newItem)
        }


        dispatch(updateTasks([...newData]))
        if (!item.isFinished) {

            toast.success('Task finished', {
                theme: 'dark',
                closeOnClick: true,
                pauseOnHover: true,
            })

        }


        try {
            await TasksService.updateTask(newItem)
        } catch (error) {
            console.error(error);
        }
    }

    const activeHandler = async (e) => {
        if (e.target.classList.value.includes('done')) {
            handleFinished()
        } else {

            const [oldItemFiltered] = tasks.filter(task => task.isActive)
            const oldItem = oldItemFiltered ? { ...oldItemFiltered, isActive: 0 } : null
            const newItem = { ...item, isActive: 1 }
            const newData = tasks.map(task => ({ ...task, isActive: 0 }))

            const orederedTasks = reorderData(newData, index, newItem)

            dispatch(updateTasks([...orederedTasks]))

            try {
                if (oldItem) {
                    await TasksService.updateTask(oldItem)
                }
                await TasksService.updateTask(newItem) // Order Number is required
            } catch (error) {
                console.error(error);
            }


        }


    }

    return (
        <>
            {!open ?
                <div className={`w-full p-2 rounded-lg bg-white border-l-8 ${item.isActive ? 'border-black' : 'border-lightBlack'}`} onClick={activeHandler}>
                    <div className=" flex justify-between items-center  ">

                        <div className="flex items-center gap-2  ">
                            <div className=" " >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${item.isFinished ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.4)'}`} className="w-8 h-10 cursor-pointer done ">
                                    <path className="done" fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>

                            </div>

                            <h1 className={`${item.isFinished && 'line-through'}`}>{item.content}</h1>
                        </div>

                        <div className="flex">

                            <Button variant="gradient" color='white' className='text-[10px] p-2 border-2 ' onClick={handleOpen}>
                                <img src={more} alt="more" className='w-5 ' />
                            </Button>

                        </div>

                    </div>
                    {item.note &&
                        <div className="p-2 my-1 w-[90%] bg-yellow-200 mx-auto rounded-lg ">
                            <p className="text-left">
                                {item.note}
                            </p>
                        </div>
                    }
                </div>
                :
                <AddTask handleOpen={handleOpen} item={item} index={index} />
            }
        </>
    );
}

export default TaskItem