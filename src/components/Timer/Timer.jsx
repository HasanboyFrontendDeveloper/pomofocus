import { Button } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Timer = () => {
    const [active, setActive] = useState('Pomodoro');
    const [isStart, setIsStart] = useState(false);
    const { timers } = useSelector(state => state.timer);

    const [timer, setTimer] = useState({
        minute: 0,
        second: 0,
    });

    const timerRef = useRef(null);

    useEffect(() => {
        const selectedTimer = timers.find(time => time.title === active);
        if (selectedTimer) {
            setTimer({
                minute: selectedTimer.minute,
                second: selectedTimer.second,
            });
        }
    }, [active, timers]);

    useEffect(() => {
        if (isStart) {
            const tick = () => {
                setTimer(prevTimer => {
                    if (prevTimer.minute === 0 && prevTimer.second === 0) {
                        clearInterval(timerRef.current);
                        setIsStart(false)
                        return prevTimer;
                    } else if (prevTimer.second === 0) {
                        return { minute: prevTimer.minute - 1, second: 59 };
                    } else {
                        return { ...prevTimer, second: prevTimer.second - 1 };
                    }
                });
            };

            timerRef.current = setInterval(tick, 1000);

            return () => clearInterval(timerRef.current);
        } else {
            clearInterval(timerRef.current);
        }
    }, [isStart]);

    const changeTimer = (time) => {
        setActive(time.title)
        setIsStart(false)
    }

    return (
        <div className='w-full bg-red-300 rounded-lg py-5 px-2 flex flex-col justify-center items-center gap-5'>
            <div className="flex gap-5">
                {timers.map((time) => (
                    <h1
                        key={time.title}
                        className={`${active === time.title && 'bg-lightBlack'} cursor-pointer rounded-lg px-2 py-1 text-white duration-150`}
                        onClick={() => changeTimer(time)}
                    >
                        {time.title}
                    </h1>
                ))}
            </div>
            <span className='text-[100px] text-white'>
                {String(timer.minute).padStart(2, '0')}:{String(timer.second).padStart(2, '0')}
            </span>
            <Button color='white' className='w-40 text-[20px] text-red-400' onClick={() => setIsStart(!isStart)}>
                {isStart ? 'Stop' : 'Start'}
            </Button>
        </div>
    );
};

export default Timer;
