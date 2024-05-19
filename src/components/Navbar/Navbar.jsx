import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { checked, more, settings, userIcon } from '../../assets'
import { useState } from 'react'

const Navbar = () => {

    return (
            <nav className="py-5 flex justify-between relative border-b-[1px] border-gray-500 ">
                <div className="flex justify-start items-center">
                    <img src={checked} alt="logo" className='w-8' />
                    <h1 className='capitalize text-[20px] pl-1 font-semibold text-white'>pomofocus</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="gradient" color='white' className='text-[10px] p-2 flex items-center ' >
                        <img src={settings} alt="settings" className='w-5' />
                        Settings
                    </Button>
                    <Button variant="gradient" color='white' className='text-[10px] p-2 flex items-center ' >
                        <img src={userIcon} alt="userIcon" className='w-5' />
                        Sing In
                    </Button>

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
            </nav>
    )
}

export default Navbar