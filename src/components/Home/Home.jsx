import React from 'react'
import { Navbar, Tasks, Timer } from '../'

const Home = () => {

    return (
        <div className="text-center bg-red-400 w-[100%] h-[100vh] ">
            <div className="w-[700px] mx-auto">
                <Navbar />
                <div className="w-[500px] mx-auto pt-10 ">
                    <Timer />
                    <Tasks />
                </div>
            </div>
        </div>
    )
}

export default Home