import { Link } from 'react-router-dom'

const AppHome = () => {
  return (
    <div className='flex flex-col text-blue-400 min-h-[100vh] text-xl min-w-full bg-layout absolute justify-center items-center'>
        <Link to="/app/login" className='inline-flex mb-3 font-bold tracking-wide shadow-xl hover:bg-slate-700 rounded-full p-2 pl-8 pr-8'>Login</Link>
        <Link to="/app/signup" className='inline-flex font-bold tracking-wide shadow-xl hover:bg-slate-700 rounded-full p-2 pl-8 pr-8'>SignUp</Link>
    </div>
  )
}

export default AppHome