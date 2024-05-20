import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { checked, logout, more, settings, userIcon } from '../../assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="py-5 flex justify-between relative border-b-[1px] border-gray-500 ">

            <Link to={'/'}>
                <div className="flex justify-start items-center">
                    <img src={checked} alt="logo" className='w-8' />
                    <h1 className='capitalize text-[25px] pl-1 font-semibold text-white'>pomofocus</h1>
                </div>
            </Link>

            <div className="flex items-center gap-4">

                <Button variant="gradient" color='white' className='text-[10px] p-2 flex items-center ' >
                    <img src={settings} alt="settings" className='w-5' />
                    Settings
                </Button>

                <Link to={'/login'}>
                    <Button variant="gradient" color='white' className='text-[10px] p-2 flex items-center ' >
                        <img src={userIcon} alt="userIcon" className='w-5' />
                        Sing In
                    </Button>
                </Link>

                <Menu>

                    <MenuHandler>

                        <Button variant="gradient" color='white' className='text-[10px] p-2 '>
                            <img src={more} alt="more" className='w-5' />
                        </Button>

                    </MenuHandler>
                    <MenuList>
                        <MenuItem>
                            <Link className='flex items-center '>
                                <div className="text-gray-600 hover:text-gray-900 ">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                    </svg>

                                </div>

                                Login
                            </Link>
                        </MenuItem>
                    </MenuList>

                </Menu>
            </div>
        </nav>
    )
}

export default Navbar