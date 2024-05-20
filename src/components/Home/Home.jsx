import React from 'react'
import { Navbar, Tasks, Timer } from '../'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    return (
        <div className="text-center bg-red-400 w-[100%] ">
            <div className="w-[700px] mx-auto">
                <Navbar />
                <div className="w-[500px] mx-auto pt-10 pb-[200px] ">
                    <Timer />
                    <Tasks />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home