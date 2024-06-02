import React, { useState } from 'react'
import { checked, google } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import AuthService from '../../service/auth'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { getUserFailure, getUserStart, getUserSuccess } from '../../slices/auth'

const Register = () => {
    const [value, setValue] = useState({
        email: '',
        password: '',
    })
    const [isSuccess, setIsSuccess] = useState(false)
    const [showWrongMsg, setShowWrongMsg] = useState('')

    const dispatch = useDispatch()

    const handleValue = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (value.password.length >= 8) {

            try {
                const user = {
                    name: 'Pomofocus user',
                    email: value.email,
                    password: value.password,
                    password_confirmation: value.password,
                }
                await AuthService.userRegister(user)
                setIsSuccess(true)
                setShowWrongMsg('')
            } catch (error) {
                console.error(error);
                setIsSuccess(false)
                setShowWrongMsg(error?.response?.data?.message)
            }
        } else {
            setShowWrongMsg('Password should be at least 8 characters ')
        }
    }

    const handleGoogleRegister = async (res) => {
        const data = jwtDecode(res.credential)
        console.log(data);
        dispatch(getUserStart())

        const user = {
            name: data.name,
            email: data.email,
            email_verified_at: data.email_verified,
            password: 1,
            password_confirmation: 1,
        }

        try {
            const data = await AuthService.userRegister(user)

            localStorage.setItem('Token', data.token)
            dispatch(getUserSuccess(data.user))

            setShowWrongMsg('Your account already registered, please login')
        } catch (error) {
            dispatch(getUserFailure(error.message))

            setShowWrongMsg('Your account already registered, \n please login')

        }
    }


    return (
        <>
            {!isSuccess ?
                <div className='w-full h-[100vh] flex justify-center items-center '>
                    <div className="w-[400px] h-[500px] px-8 mx-auto flex flex-col items-center gap-5 ">

                        <Link to={'/'}>
                            <div className="flex justify-start items-center">
                                <img src={checked} alt="logo" className='w-16' />
                                <h1 className='capitalize text-[40px] pl-1 font-semibold text-white'>pomofocus</h1>
                            </div>
                        </Link>

                        <h1 className='text-[20px] font-semibold text-gray-300  '>Create Account</h1>

                        <div className="bg-white border-4 w-full py-4 px-5 rounded-lg " >

                            <div className="grid place-items-center">

                                <GoogleLogin
                                    onSuccess={handleGoogleRegister}

                                    onError={(error) => console.error(error)}
                                />
                            </div>

                            <h2 className='text-center text-[13px] mt-2  '>If you register with Google, <br /> You can only login with Google </h2>

                            {/* 
                            <Button onClick={handleGoogleRegister} variant='outlined' className='w-full flex items-center justify-center gap-5 '>
                                <img src={google} alt="google" />
                                Sing up with Google
                            </Button> 
                            */}

                            <div className='flex items-center justify-center gap-3  ' >

                                <div className='w-[40%] h-[1px] bg-lightBlack '></div>
                                <h1 className='text-lightBlack'>or</h1>
                                <div className='w-[40%] h-[1px] bg-lightBlack '></div>

                            </div>


                            <form className='flex flex-col' onSubmit={submitHandler}>

                                <label className='py-3'>
                                    Email <br />
                                    <input
                                        type="email"
                                        className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full'
                                        placeholder='example@gmail.com'
                                        required
                                        name='email'
                                        onChange={handleValue}
                                        value={value.email}
                                    />
                                </label>

                                <label className='py-3'>
                                    Password <br />
                                    <input
                                        type="password"
                                        className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full'
                                        required
                                        name='password'
                                        onChange={handleValue}
                                        value={value.password}
                                    />
                                </label>

                                <span className='text-center text-red-500 pt-1 w-[250px] mx-auto '>{showWrongMsg}</span>

                                <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 duration-200 ' >Sing up with Email</Button>
                            </form>

                        </div>

                        <div className="">

                            <h1 className='text-gray-400'>Already have an Account?</h1>
                            <h1 className='text-center underline text-gray-200 cursor-pointer'>
                                <Link to={'/login'} >Log in</Link>
                            </h1>

                        </div>

                    </div>

                </div>

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

export default Register