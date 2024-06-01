import React, { useState } from 'react'
import { checked, google } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import AuthService from '../../service/auth'
import { useDispatch } from 'react-redux'
import { getUserFailure, getUserStart, getUserSuccess } from '../../slices/auth'
import { toast } from 'react-toastify'

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  })
  const [showWrongMsg, setShowWrongMsg] = useState('')

  const handleValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(getUserStart())
    try {
      const user = {
        email: value.email,
        password: value.password
      }
      const data = await AuthService.userLogin(user)
      if (data.user.email_verified_at !== null) {
        localStorage.setItem('Token', data.token)
        dispatch(getUserSuccess(data.user))
        setShowWrongMsg('logged in')
      } else {
        dispatch(getUserFailure(''))
        setShowWrongMsg('Please verify your email')


        toast.error('Please verify your email', {
          theme: 'dark',
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
    } catch (error) {
      dispatch(getUserFailure(error.message))
      console.error(error);
      setShowWrongMsg('Email or Password is Incorrect')
    }
  }


  const handleGoogleRegister = () => {
    const redirectUrl = encodeURIComponent("http://localhost:5173/");
    window.location.href = `http://refotib6.beget.tech/api/auth/google?redirect=${redirectUrl}`;
  }

  return (
    <div className='w-full h-[100vh] flex justify-between items-center '>
      <div className="w-[400px] h-[500px] px-8 mx-auto flex flex-col items-center gap-5 ">

        <Link to={'/'}>
          <div className="flex justify-start items-center">
            <img src={checked} alt="logo" className='w-16' />
            <h1 className='capitalize text-[40px] pl-1 font-semibold text-white'>pomofocus</h1>
          </div>
        </Link>

        <h1 className='text-[20px] font-semibold text-gray-300  '>Login</h1>

        <div className="bg-white border-4 w-full py-4 px-5 rounded-lg " >


          <Button onClick={handleGoogleRegister} variant='outlined' className='w-full flex items-center justify-center gap-5 '>
            <img src={google} alt="google" />
            Sing In with Google
          </Button>


          <div className='flex items-center justify-center gap-3  ' >

            <div className='w-[40%] h-[1px] bg-lightBlack '></div>
            <h1 className='text-lightBlack'>or</h1>
            <div className='w-[40%] h-[1px] bg-lightBlack '></div>

          </div>


          <form className='flex flex-col ' onSubmit={submitHandler} >

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

            <label>
              Password <br />
              <input
                type="password"
                className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full '
                required
                name='password'
                onChange={handleValue}
                value={value.password}
              />
            </label>
            <span className='text-center text-red-500 pt-1'>{showWrongMsg}</span>
            <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 z-[0] ' >Login with Email</Button>
          </form>

          <Link to={'/reset-password'}>
            <h1 className='text-center mt-5 underline text-gray-500 cursor-pointer '>Forgot Password</h1>
          </Link>

        </div>

        <div className="">

          <h1 className='text-gray-400'>Do not have an Account?</h1>
          <h1 className='text-center underline text-gray-200 cursor-pointer'>
            <Link to={'/register'} >Create Account</Link>
          </h1>

        </div>

      </div>
    </div>
  )
}

export default Login