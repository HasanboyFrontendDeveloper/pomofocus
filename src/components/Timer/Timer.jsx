import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import addNotification from 'react-push-notification';  
import { plus } from '../../assets'; 

const titles = ['Pomodoro', 'Short Break', 'Long Break'];

const Timer = () => {
    const [active, setActive] = useState('Pomodoro');

    const notify = () => {
        addNotification({
            title: 'Start',
            duration: 5000,
            message: 'Time is Started',
            icon: plus,
            native: true
        });
    };

    return (
        <div className='w-full bg-red-300 rounded-lg py-5 px-2 flex flex-col justify-center items-center gap-5 '>
            <div className="flex gap-5">
                {titles.map(title => (
                    <h1
                        key={title}
                        className={`${active === title && 'bg-lightBlack'} cursor-pointer rounded-lg px-2 py-1 text-white duration-150`}
                        onClick={() => setActive(title)}
                    >
                        {title}
                    </h1>
                ))}
            </div>
            <span className='text-[100px] text-white '>25:00</span>
            <Button color='white' className='w-40 text-[20px] text-red-400 '>Start</Button>
        </div>
    );
};

export default Timer;
