import {
    Button,
    Card,
    Input,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTasks } from "../../slices/tasks";
import { v4 } from 'uuid';
import { reorderData } from "../../constants";


const AddTask = ({ handleOpen, item = null, index }) => {
    const [openNote, setOpenNote] = useState(false)
    const [value, setvalue] = useState({
        title: item?.title || '',
        note: item?.note || '',
    })

    const scrollRef = useRef(null)

    useEffect(() => {
        const scrollToCenter = () => {
            const element = scrollRef.current;
            if (element) {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const viewportHeight = window.innerHeight;
                const scrollTo = elementTop - (viewportHeight / 2) + (elementHeight / 2);
                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        };

        scrollToCenter();
    }, []);

    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.tasks)


    const submitHandler = (e) => {
        e.preventDefault()
        if (value.title === '') {
            alert('Please fill the field');
            return;
        };

        const filterData = tasks.filter(task => task.id !== item?.id || '')
        let taskData;
        if (item) {
            taskData = {
                ...item,
                title: value.title,
                note: value.note
            }

            const reorderedData = reorderData(tasks, index, taskData)

            dispatch(updateTasks([...reorderedData]))

        } else {
            taskData = {
                title: value.title,
                note: value.note,
                id: v4(),
            }
            dispatch(updateTasks([...filterData, taskData]))
        }
        setvalue({
            title: '',
            note: '',
        })
        if (item) {
            handleOpen()
        }
    }

    const deleteHandler = () => {
        const filteredData = tasks.filter(task => task.id !== item.id)
        dispatch(updateTasks(filteredData))
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <Card className="w-full z-[2] " ref={scrollRef}>
                    <CardBody className="pb-0">
                        <Input variant="static" className="text-[25px] " placeholder="What are you working on"
                            onChange={(e) => setvalue(prev => ({ ...prev, title: e.target.value }))}
                            value={value.title}
                        />

                        {!openNote && !item?.note ?
                            <Button variant="text" color="blue-gray" className="float-start py-2 px-5 my-5 " onClick={() => setOpenNote(true)} >+Add Note</Button>
                            :
                            <textarea name="note" className="w-full outline-none border-2 my-5"
                                onChange={(e) => setvalue(prev => ({ ...prev, note: e.target.value }))}
                                value={value.note}
                            />
                        }
                    </CardBody>
                    <CardFooter className="flex justify-between items-center py-3 bg-gray-300 rounded-b-lg">
                        {item ?
                            <Button variant="text" color="red" onClick={deleteHandler} >Delete</Button>
                            :
                            <div></div>
                        }
                        <div className="flex gap-2">
                            <Button variant="outlined" color="red" onClick={handleOpen} >Cancel</Button>
                            <Button variant="gradient" type="submit" >Save</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>

            <div className={`fixed  top-0 left-0 w-[100%] h-[100%] z-[0]  `} onClick={handleOpen}></div>
        </>

    )
}

export default AddTask