import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { more } from '../../assets'

const Tasks = () => {
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
                        <MenuItem>Login</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

export default Tasks