import React, { useState } from 'react'
import { checked, google } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import AuthService from '../../service/auth'
import { useDispatch } from 'react-redux'
import { getUserFailure, getUserStart, getUserSuccess } from '../../slices/auth'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { updateTasks } from '../../slices/tasks'

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
      const userData = await AuthService.userLogin(user)
      console.log(userData);
      if (userData.user.email_verified_at !== null) {
        localStorage.setItem('Token', userData.token)
        dispatch(getUserSuccess(userData.user))

        const newTasks = userData.user.tasks.map(task => ({ ...task, id: String(task.id) }))

        dispatch(updateTasks(newTasks))

        console.log(newTasks);

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


  const handleGoogleLogin = async (res) => {
    const data = jwtDecode(res.credential)
    console.log(data);
    dispatch(getUserStart())
    const user = {
      email: data.email,
      password: 1,
    }
    try {
      const data = await AuthService.userLogin(user)
      localStorage.setItem('Token', data.token)
      dispatch(getUserSuccess(data.user))

    } catch (error) {
      dispatch(getUserFailure(error.message))
      console.error(error);
      setShowWrongMsg('You did not register with google as this email ')
    }
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

          {/* 
          <Button onClick={handleGoogleLogin} variant='outlined' className='w-full flex items-center justify-center gap-5 '>
            <img src={google} alt="google" />
            Sing In with Google
          </Button> 
          */}

          <div className="grid place-items-center">

            <GoogleLogin
              onSuccess={handleGoogleLogin}

              onError={(error) => console.error(error)}
            />
          </div>

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
            <span className='text-center text-red-500 pt-1 w-[250px] mx-auto '>{showWrongMsg}</span>
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