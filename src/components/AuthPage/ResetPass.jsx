import React, { useState } from 'react'
import { checked } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import AuthService from '../../service/auth'

const ResetPass = () => {

    const [email, setEmail] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await AuthService.sendResetLinkEmail(email)

            setIsSuccess(true)
        } catch (error) {
            console.error(error);
            setIsSuccess(false)
        }
    }

    return (
        <>
            {
                !isSuccess ?
                    <div className='w-full h-[100vh] f  lex justify-between items-center '>
                        < div className="w-[400px] h-[500px] px-8 mx-auto flex flex-col items-center gap-5 " >

                            <Link to={'/'}>
                                <div className="flex justify-start items-center">
                                    <img src={checked} alt="logo" className='w-16' />
                                    <h1 className='capitalize text-[40px] pl-1 font-semibold text-white'>pomofocus</h1>
                                </div>
                            </Link>

                            <h1 className='text-[20px] font-semibold text-gray-300  '>Reset Password</h1>

                            <div className="bg-white border-4 w-full py-4 px-5 rounded-lg " >

                                <form className='flex flex-col' onSubmit={submitHandler}>

                                    <label className='py-3'>
                                        Email <br />
                                        <input
                                            type="email"
                                            className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full'
                                            placeholder='example@gmail.com'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>

                                    <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 duration-200 ' >Sing up with Email</Button>
                                </form>

                            </div>

                            <div className="">

                                <h1 className='text-gray-400'>Try other methods?</h1>
                                <h1 className='text-center underline text-gray-200 cursor-pointer'>
                                    <Link to={'/login'} >Log in</Link>
                                </h1>

                            </div>

                        </div >
                    </div >
                    :
                    <div className="w-full h-[90vh] flex flex-col justify-center items-center down-to-up">
                        <Link to={'/'}>
                            <img src={checked} alt="logo" className='w-40' />
                        </Link>
                        <h1 className='text-[25px] font-semibold text-white '>Activation link have been sent</h1>
                        <p className='text-gray-300 text-[20px] max-w-[350px] text-center '>Activation link have been sent to your email address. To start using Pomofocus, please activate your account from the link.</p>
                    </div>
            }
        </>
    )
}

export default ResetPass