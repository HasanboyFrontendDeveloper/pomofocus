import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { changeColor, updateNotifyTimer, updateTimer } from '../../slices/settings'
import SettingsService from '../../service/settings'
import { toast } from 'react-toastify'

const colors = ['red', 'blue', 'yellow', 'green', 'pink', 'blue-gray']

const Settings = ({ setOpenSettings }) => {
  const { timers, currentColor, notifyTimer, timerId, colorId, notifyId } = useSelector(state => state.settings)
  const { userId } = useSelector(state => state.auth)

  const [timerValue, setTimerValue] = useState({
    'Pomodoro': timers[0].minute,
    'Short Break': timers[1].minute,
    'Long Break': timers[2].minute,
  })
  const [curColor, setCurColor] = useState(currentColor)
  const [notifyVal, setNotifyVal] = useState(notifyTimer)

  const dispatch = useDispatch()

  const closeHandler = (e) => {
    if (e.target.className.includes('settings')) {
      setOpenSettings(false)
    }
  }

  const changeTimerHandler = (e) => {
    const value = Number(e.target.value)

    if (value > 0) {
      setTimerValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleNotify = (e) => {
    const value = Number(e.target.value)

    if (value > 0) {
      setNotifyVal(value);
    }
  }

  const postTheme = async (color) => {
    dispatch(changeColor(color))

    const newTheme = {
      id: colorId,
      user_id: userId,
      color
    }
    try {
      if (colorId) {
        await SettingsService.updateThemes(newTheme)
        // await SettingsService.postThemes(newTheme)

      } else {
        await SettingsService.postThemes(newTheme)

      }


      toast.success('Theme updated Successfully', {
        theme: 'dark',
        closeOnClick: true,
        pauseOnHover: true,
      })

    } catch (error) {
      console.error(error);

      toast.error('Theme update Failure', {
        theme: 'dark',
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }

  const postNotify = async () => {

    const newNotify = {
      id: notifyId,
      user_id: userId,
      reminder_type: 'last',
      minute: notifyVal,
    }
    try {
      if (notifyId) {
        await SettingsService.updateNotify(newNotify)

      } else {
        await SettingsService.postNotify(newNotify)

      }

      toast.success('Notification updated Successfully', {
        theme: 'dark',
        closeOnClick: true,
        pauseOnHover: true,
      })

    } catch (error) {
      console.error(error);

      toast.error('Notification update Failure', {
        theme: 'dark',
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }

  const postTimer = async () => {

    const newTimer = {
      id: timerId,
      user_id: userId,
      pomodoro_time: Number(timerValue['Pomodoro']),
      short_break_time: Number(timerValue['Short Break']),
      long_break_time: Number(timerValue['Long Break']),
    }

    try {

      if (timerId) {
        await SettingsService.updateTimer(newTimer)

      } else {
        await SettingsService.postTimer(newTimer)

      }

      toast.success('Timer updated Successfully', {
        theme: 'dark',
        closeOnClick: true,
        pauseOnHover: true,
      })

    } catch (error) {
      console.error(error);

      toast.error('Timer update Failure', {
        theme: 'red',
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }

  const submitHandler = async () => {

    const newTimers = [
      { title: 'Pomodoro', minute: timerValue['Pomodoro'], second: 0 },
      { title: 'Short Break', minute: timerValue['Short Break'], second: 0 },
      { title: 'Long Break', minute: timerValue['Long Break'], second: 0 },
    ]


    dispatch(updateTimer(newTimers))
    dispatch(updateNotifyTimer(notifyVal))

    postTimer()
    postNotify()

    setOpenSettings(false)
  }

  return (
    <div className='settings fixed left-0 top-0 w-full h-[100vh] bg-lightBlack ' onClick={closeHandler}>
      <div className="w-[300px] bg-white rounded-lg mx-auto mt-20 px-5 py-5 ">
        <h1 className='font-semibold pb-3 text-[25px] '>Settings</h1>

        <div className="border rounded-lg  px-2 py-1 my-2">
          <h1>Time (minute) </h1>
          <div className="flex justify-between">

            {timers.map((time, index) => (

              <div key={index} className="pt-3">
                <h1 className='font-bold text-[13px] '>{time.title}</h1>
                <label>
                  <input type="number" name={time.title} value={timerValue[time.title]} onChange={(e) => changeTimerHandler(e)} className='w-[50px] bg-gray-300 text-black  rounded-lg pl-2  ' />
                </label>
              </div>
            ))}

          </div>
        </div>

        <div className="border rounded-lg px-2 py-1 my-2">
          <h1 className='font-bold'>Theme</h1>

          <div className="flex flex-wrap gap-5 ml-6 ">
            {colors.map((color, index) => (
              <Button key={index} className={`h-[50px] w-[50px] bg-${color}-400 rounded-lg relative `} onClick={() => postTheme(color)}>
                {color === currentColor &&
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                }

              </Button>
            ))}
            {/* <div className="bg-red-400 bg-green-400 bg-yellow-400 bg-pink-400 bg-blue-gray-400 bg-blue-400 "></div> */}
          </div>

        </div>

        <div className="border rounded-lg px-2 py-1 my-2">
          <h1 className='font-bold'>Notification </h1>
          <div className="flex justify-between ">
            <span>Last</span>
            <div className="">
              <input type="number" className='w-[50px] bg-gray-300 text-black  rounded-lg pl-2 ' value={notifyVal} onChange={handleNotify} />
              <span className='pl-2'>min</span>
            </div>
          </div>

        </div>

        <div className="w-full flex justify-between ">
          <Button variant='text' onClick={() => setOpenSettings(false)} >Cancel</Button>
          <Button onClick={submitHandler} >Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default Settings