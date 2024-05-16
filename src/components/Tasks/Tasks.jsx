import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { more, plus } from '../../assets'
import { AddTask, TaskItem } from '../'
import { useRef, useState } from 'react';

const Tasks = () => {

    const addTaskRef = useRef(null)
    

    const [open, setOpen] = useState(false);

    const handleOpen = (ref) => {
        setOpen(!open)
        console.log(ref.current);
        // window.scroll({top: ref.current.offset.top, behavior: 'smooth'})
    }

    return (
        <div className='py-3'>
            <span className='text-gray-400 hover:text-gray-600 cursor-pointer duration-150'>#1</span>
            <h2 className='text-white' >Time to focus</h2>
            <div className="flex justify-between border-b-2 py-2 ">
                <span className='text-[20px] text-white '>Tasks</span>

                <Menu>
                    <MenuHandler>
                        <Button variant="gradient" color='white' className='text-[10px] p-2 '>
                            <img src={more} alt="more" className='w-5' />
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>Clear Finished Tasks</MenuItem>
                        <MenuItem>Clear All Tasks</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="">
                <div className="py-5">
                    <TaskItem />
                </div>
                {!open ?
                    <Button
                        variant='outlined'
                        className='w-full border-dashed border-2 bg-lightBlack text-white flex items-center justify-center gap-2 '
                        onClick={handleOpen}
                    >
                        <img src={plus} alt="plus" className='w-8 text-white ' />
                        Add Task
                    </Button>
                    :
                    <div ref={addTaskRef}>
                        <AddTask handleOpen={handleOpen} />

                    </div>

                }
            </div>
        </div>
    )
}

export default Tasks