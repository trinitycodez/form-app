import { useEffect, useRef } from "react";
import {createPortal} from 'react-dom';

type propsType = {
  statelogin:boolean,
  setPropsLogin:(val:boolean)=> void
}
const LoginPage = ({statelogin, setPropsLogin}:propsType) => {
  const ref = useRef<HTMLInputElement>(null);
  const signUpClicker = () => {
    setPropsLogin(!statelogin);
  }

  useEffect(() => {
    document.title = "Login - Form App";
    ref.current?.focus();
  }, [])
  

  return createPortal(
    <>
      {statelogin &&
        (<div className='login-cont flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto bg-red-100/40'>
          <div className='flex flex-col relative mx-auto mt-8 mb-8 min-w-[18rem] min-h-[10rem] bg-white p-4 pt-5 pb-5 border rounded-2xl shadow-lg'>
          {/* first line */}
          <div className="flex flex-row justify-between items-center mb-5">
            <span className='text-black font-semibold text-2xl'>Login</span>
            <div className='flex justify-center items-center text-center h-[1.6rem] w-[1.6rem] rounded-full border border-gray-300 text-gray-500'>
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center rotate-45'></span>
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center -rotate-45'></span>
            </div>
          </div>
          <div className="flex justify-center w-full min-h-[2rem] border border-gray-200 rounded-lg p-3 mb-5">
            <a href="https://" className='flex items-center'>
              <div className="w-8 h-8">
                <img src="" alt="google link" className='text-xs' />
              </div>
              <span className='font-semibold'>Log in with Google</span>
            </a>
          </div>
          {/* second line */}
          <form action="#" className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
            <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
            <input type="email" id='email' placeholder='trinitydev001@gmail.com' ref={ref} className='border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 outline-none mb-4 w-full' required /> <br />
            <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
            <div className="flex w-full min-h-max items-center relative mb-4">
            <input type="password" id='password' className='border border-gray-200 rounded-lg focus:border-sky-400 outline-none pr-9 w-full' required />
            <div className="flex items-center w-6 h-full absolute right-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-700 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                </div>
              </div>
            <div className="flex flex-row-reverse items-center justify-end mb-4">
              <label htmlFor="remind_me" className='text-gray-400 font-semibold'>Remind me</label>
              <input type="checkbox" name="remind_me" id="remind_me" className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' />
            </div>
            <input type="submit" value="Log in" className='w-full bg-sky-400 text-white font-medium rounded-md p-1 mb-4' />
            <span className="inline-block w-full text-sky-400 text-center font-medium">Forgot Password?</span>
          </form>
          <div className="flex flex-col pt-4 justify-center items-center text-center">
            <span className='text-gray-400 w-fit'>Do not have an account?</span>
            <span className="text-sky-400 w-fit" onClick={signUpClicker}>
              <a href="/app/signup" className="underline">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>)}
    </>,
    document.getElementById('modal') as Element
  )
}

export default LoginPage
