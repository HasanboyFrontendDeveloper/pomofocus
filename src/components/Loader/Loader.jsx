import { checked } from '../../assets'

const Loader = () => {
  return (
    <div className="w-full h-[100vh] bg-red-400 fixed top-0 left-0 flex justify-center items-center z-[2]">

      <img src={checked} alt="logo" className='loader' />

    </div>
  )
}

export default Loader