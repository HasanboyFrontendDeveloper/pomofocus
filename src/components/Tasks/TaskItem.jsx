import { useState } from "react";
import { more } from "../../assets";
import { AddTask } from "../";
import { Button } from "@material-tailwind/react";

const TaskItem = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div className="my-3">
            {!open ?
                <div className="w-full flex justify-between items-center bg-white-500 p-2 rounded-lg bg-white ">

                    <div className="flex items-center gap-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0, 0, 0, 0.4)" className="w-8 h-10 ">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>

                        <h1>Tasks</h1>
                    </div>

                    <div className="flex">

                        <Button variant="gradient" color='white' className='text-[10px] p-2 border-2 ' onClick={handleOpen}>
                            <img src={more} alt="more" className='w-5 ' />
                        </Button>

                    </div>

                </div>
                :
                <AddTask handleOpen={handleOpen} />
            }
        </div>
    );
}

export default TaskItem