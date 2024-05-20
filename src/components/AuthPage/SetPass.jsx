import React from 'react'
import { checked, google } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const SetPass = () => {
    return (
        <div className='w-full h-[100vh] flex justify-between items-center '>
            <div className="w-[400px] h-[500px] px-8 mx-auto flex flex-col items-center gap-5 ">

                <Link to={'/'}>
                    <div className="flex justify-start items-center">
                        <img src={checked} alt="logo" className='w-16' />
                        <h1 className='capitalize text-[40px] pl-1 font-semibold text-white'>pomofocus</h1>
                    </div>
                </Link>

                <h1 className='text-[20px] font-semibold text-gray-300  '>Set New Password</h1>

                <div className="bg-white border-4 w-full py-4 px-5 rounded-lg " >

                    <form className='flex flex-col gap-5 '>

                        <label>
                            Password <br />
                            <input type="password" className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full ' required />
                        </label>

                        <label>
                            Password (Confirm) <br />
                            <input type="password" className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full ' required />
                        </label>

                        <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 duration-200 ' >Set Password</Button>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default SetPass