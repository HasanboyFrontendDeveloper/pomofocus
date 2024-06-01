import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { more, plus } from '../../assets'
import { AddTask, TaskItem } from '../'
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateTasks } from '../../slices/tasks';
import TasksService from '../../service/tasks';

const Tasks = () => {
    const [open, setOpen] = useState(false);
    const [activeTask, setActiveTask] = useState('')

    const { tasks } = useSelector(state => state.tasks)

    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleDrapAndDrop = async (result) => {
        const { destination, source } = result

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const reorderedData = [...tasks]
        const sourceIndex = source.index
        const destinationIndex = destination.index

        const [removedItem] = reorderedData.splice(sourceIndex, 1)
        reorderedData.splice(destinationIndex, 0, removedItem)

        dispatch(updateTasks(reorderedData))

        // const oldItem = { ...removedItem, orderNumber: destinationIndex }
        // const newItem = { ...tasks[destinationIndex], orderNumber: sourceIndex }

        // console.log(oldItem.orderNumber);
        // console.log(newItem.orderNumber);

        // console.log(oldItem.id);
        // console.log(newItem.id);
        
        
        // try {

        //     await TasksService.updateTask(oldItem)
        //     await TasksService.updateTask(newItem)
        // } catch (error) {
        //     console.error(error);
        // }
    }

    const clearAllTasksHandler = () => {
        dispatch(updateTasks([]))

        tasks.forEach(async item => {
            TasksService.deleteTask(item.id)
        })
    }

    const clearFinishedTasksHandler = () => {
        const filteredTasks = tasks.filter(task => !task.isFinished)
        dispatch(updateTasks(filteredTasks))

        tasks.forEach(async item => {
            if (item.isFinished) {
                TasksService.deleteTask(item.id)
            }
        })
    }

    useEffect(() => {
        if (tasks) {
            tasks.map(task => {
                if (task.isActive) {
                    setActiveTask(task.content)
                }
            })
        }
        if (!tasks[0]) {
            setActiveTask('Choose task')
        }
    }, [activeTask, tasks])



    return (
        <div className='py-3'>
            <span className='text-gray-300 cursor-pointer duration-150'>Active Task</span>
            <h2 className='text-white' >{activeTask}</h2>
            <div className="flex justify-between border-b-2 py-2 ">
                <span className='text-[20px] text-white '>Tasks</span>

                <Menu>
                    <MenuHandler>
                        <Button variant="gradient" color='white' className='text-[10px] p-2 '>
                            <img src={more} alt="more" className='w-5' />
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={clearFinishedTasksHandler}>Clear Finished Tasks</MenuItem>
                        <MenuItem onClick={clearAllTasksHandler}>Clear All Tasks</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="">

                <DragDropContext onDragEnd={handleDrapAndDrop}>
                    <Droppable droppableId="ROOT" type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className='py-5 '>
                                {tasks.map((item, index) => (
                                    <Draggable
                                        draggableId={item.id}
                                        index={index}
                                        key={item.id}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                className='my-2'
                                            >
                                                <TaskItem item={item} index={index} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

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
                    <div>
                        <AddTask handleOpen={handleOpen} />

                    </div>

                }
            </div>

        </div>
    )
}

export default Tasks