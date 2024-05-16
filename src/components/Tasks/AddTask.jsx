import {
    Button,
    Card,
    Input,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";


const AddTask = ({handleOpen}) => {
    const [openNote, setOpenNote] = useState(false)

    const scrollRef = useRef(null)
    useEffect(() => {
        window.scroll({top: scrollRef.current.offsetTop , behavior: 'smooth'})
    }, [])
    

    return (
        <Card className="w-full  " ref={scrollRef}>
            <CardBody className="pb-0">
                <Input variant="static" className="text-[23px] "  placeholder="What are you working on" />

                {!openNote ?
                    <Button variant="text" color="blue-gray" className="float-start py-2 px-5 my-5 " onClick={() => setOpenNote(true)} >+Add Note</Button>
                    :
                    <textarea name="note" className="w-full outline-none border-2 my-5" />
                }
            </CardBody>
            <CardFooter className="flex justify-between items-center py-3 bg-gray-300 rounded-b-lg">
                <Button variant="text" color="red" >Delete</Button>
                <div className="flex gap-2">
                    <Button variant="outlined" color="red" onClick={()=> handleOpen()} >Cancel</Button>
                    <Button variant="gradient" >Save</Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default AddTask