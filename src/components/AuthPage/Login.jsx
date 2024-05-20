import React from 'react'
import { checked, google } from '../../assets'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const Login = () => {
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

          <Button variant='outlined' className='w-full flex items-center justify-center gap-5 '>
            <img src={google} alt="google" />
            Login with Google
          </Button>

          <div className='flex items-center justify-center gap-3  ' >

            <div className='w-[40%] h-[1px] bg-lightBlack '></div>
            <h1 className='text-lightBlack'>or</h1>
            <div className='w-[40%] h-[1px] bg-lightBlack '></div>

          </div>


          <form className='flex flex-col '>

            <label className='py-3'>
              Email <br />
              <input type="email" className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full' placeholder='example@gmail.com' required />
            </label>

            <label>
              Password <br />
              <input type="password" className='bg-gray-300 outline-none rounded-md px-2 py-2 w-full ' required />
            </label>

            <Button type='submit' className='mt-5 bg-gray-800 hover:bg-gray-900 duration-200 ' >Login with Email</Button>
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