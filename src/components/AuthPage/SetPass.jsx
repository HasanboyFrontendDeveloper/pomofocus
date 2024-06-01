import React, { useState, useEffect } from 'react';
import axiosClient from '../../service/api';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { checked } from '../../assets';
import AuthService from '../../service/auth';

const setPass = () => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [token, setToken] = useState('');
    const [showWrongMsg, setShowWrongMsg] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    useEffect(() => {
        const tokenFromUrl = query.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl.toString()); // Convert token to string
        }
    }, [query]);


    const handleValue = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const user = {
            email: value.email,
            token,
            password: value.password,
            password_confirmation: value.password_confirmation,
        }


        try {

            await AuthService.resetPossword(user);

            setIsSuccess(true)
            setIsLoading(false)

        } catch (error) {
            setIsSuccess(false)
            setIsLoading(false)

            if (error.response && error.response.data) {
                if (error.response.data.errors?.email) {
                    setShowWrongMsg(error.response.data.errors?.email)
                } else if (error.response.data.errors?.password) {
                    setShowWrongMsg(error.response.data.errors?.password[0])
                }
            } else {
                setShowWrongMsg('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            {!isSuccess ?
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

                            <form className='flex flex-col' onSubmit={handleSubmit}>

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


                                <label className='py-3'>
                                    Password (Confirmation) <br />
                                    <input
                                        type="password"
                                        className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full'
                                        required
                                        name='password_confirmation'
                                        onChange={handleValue}
                                        value={value.password_confirmation} />
                                </label>
                                <span className='text-center text-red-500 pt-1'>{showWrongMsg}</span>

                                <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 duration-200 ' disabled={isLoading} >{isLoading ? 'Loading...' : 'Set Password'}</Button>


                            </form>

                        </div>

                    </div>
                </div>
                :
                <div className="w-full h-[90vh] flex flex-col justify-center items-center down-to-up">
                    <Link to={'/'}>
                        <img src={checked} alt="logo" className='w-40' />
                    </Link>
                    <h1 className='text-[25px] font-semibold text-white '>Password reset successfully </h1>
                    <Link to={'/'}>
                        <Button type='submit' color='white' className='mt-5  duration-200 ' >Please return to the Login page</Button>
                    </Link>
                </div>
            }
        </>
    );
};

export default setPass;
