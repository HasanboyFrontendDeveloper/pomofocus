import { Button, Input } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AuthService from '../../service/auth'
import { useDispatch } from 'react-redux'
import { editProfile } from '../../slices/auth'
import { toast } from 'react-toastify'

const Account = ({ setOpenAccount }) => {
    const { user } = useSelector(state => state.auth)

    const [username, setUsername] = useState(user.name)

    const dispatch = useDispatch()

    const closeHandler = (e) => {
        if (e.target.className.includes('account')) {
            setOpenAccount(false)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const user = {
            name: username
        }

        try {
            await AuthService.editProfile(user)

            dispatch(editProfile(username))


            toast.success('Profile updated Successfully', {
                theme: 'dark',
                closeOnClick: true,
                pauseOnHover: true,
            })

        } catch (error) {
            console.error(error);
            
            toast.error('Profile update Failure', {
                theme: 'dark',
                closeOnClick: true,
                pauseOnHover: true,
            })
        }
    }

    return (

        <div className='account fixed left-0 top-0 w-full h-[100vh] bg-lightBlack ' onClick={closeHandler}>
            <div className="w-[400px] bg-white rounded-lg mx-auto mt-20 px-5 py-5 ">
                <h1>Account</h1>

                <form className="border rounded-lg p-3 my-2" onSubmit={submitHandler} >
                    <span className='text-left '>Username: </span>
                    <Input variant='static' type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full capitalize text-[26px] ' />

                    <div className="flex mt-5 ">
                        <h1 className='text-left'>Email: </h1>
                        <h1 className='ml-2'> {user.email}</h1>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant='text' className='mt-5 ' onClick={() => setOpenAccount(false)} >cancel</Button>
                        <Button type='submit' className='mt-5 ' >Save</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Account