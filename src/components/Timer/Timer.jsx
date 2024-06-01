import { Button } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateTasks } from '../../slices/tasks';
import { toast } from 'react-toastify';
import { checked, notify, radar } from '../../assets';

const Timer = () => {
    const [active, setActive] = useState('Pomodoro');
    const [isStart, setIsStart] = useState(false);

    const { timers, currentColor, notifyTimer } = useSelector(state => state.settings);

    const [curColor, setCurColor] = useState(currentColor)
    const { tasks } = useSelector(state => state.tasks);

    const dispatch = useDispatch()
    const audioRef = useRef()
    const notifyRef = useRef()

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

    const finishTaskHandler = () => {
        clearInterval(timerRef.current);
        setIsStart(false)

        if (active === 'Pomodoro') {

            setActive('Short Break')

            const finishedTask = tasks.filter(task => task.isActive);

            if (finishedTask[0]) {
                const filteredData = tasks.filter(task => !task.isActive);

                const newTask = {
                    ...finishedTask[0],
                    isFinished: true
                }
                filteredData.push(newTask)

                dispatch(updateTasks([...filteredData]))
            }

        } else {
            setActive('Pomodoro')
        }

        toast.success('Timer finished', {
            theme: 'dark',
            closeOnClick: true,
            pauseOnHover: true,
        })

        audioRef.current.play()

    }

    useEffect(() => {
        if (isStart) {
            const tick = () => {
                setTimer(prevTimer => {
                    if (prevTimer.minute === notifyTimer && prevTimer.second === 0) {
                        notifyRef.current.play()
                    }

                    if (prevTimer.minute === 0 && prevTimer.second === 0) {
                        finishTaskHandler()

                        audioRef.current.play()

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

    useEffect(() => {
        setCurColor(currentColor)
    }, [currentColor])

    return (
        <div className={`w-full bg-${curColor}-300 rounded-lg py-5 px-2 flex flex-col justify-center items-center gap-5`}>
            <div className="flex gap-5  ">
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
            <Button color='white' className={`w-40 text-[20px] text-${curColor}-400`} onClick={() => setIsStart(!isStart)}>
                {isStart ? 'Stop' : 'Start'}
            </Button>

            {/* <div className="bg-red-300 bg-green-300 bg-yellow-300 bg-blue-300 bg-pink-300 bg-blue-gray-300 text-blue-400 text-red-400 text-green-400 text-yellow-400 text-pink-400 text-blue-gray-400 text-blue-400 "></div> */}

            <audio src={radar} ref={audioRef} ></audio>
            <audio src={notify} ref={notifyRef} ></audio>
        </div>
    );
};

export default Timer;
