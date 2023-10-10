import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { memo, FormEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GooglePerson from "../signup/GoogleSubmit";
import {createPortal} from 'react-dom';
import jwtDecode from "jwt-decode";

export type user = {
  name:string,
  email:string,
  pwd:string,
  loggedIn:boolean
}
export type propsType = {
  loginUser: (val:string) => void
}

// component login
const LoginPage = ({loginUser}:propsType) => {
  const [isVisible, setVisible] = useState(true);
  const [isName, setName] = useState("");
  const [isPwd, setPwd] = useState("");
  const namref = useRef<HTMLInputElement>(null);
  const pwdref = useRef<HTMLInputElement>(null);
  const checkedref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const oneTapLogin = async (tokenResponse:CredentialResponse) => {
    const onlineGoogle = await jwtDecode(`${tokenResponse.credential}`) as Response;
    // console.log(onlineGoogle);
    const personGoogle = new GooglePerson(onlineGoogle);
    await personGoogle.sendGms();
    const {gms} = personGoogle;
    if (gms.email_verified && !gms.message) {
      // console.log(gms.given_name);
      localStorage.setItem("GooglePersonVerified", JSON.stringify(
        {
          given_name:gms.given_name, 
          picture:gms.picture, 
          email_verified:gms.email_verified
        }));
      navigate("../../app", { replace: true });
    }
  }
  useGoogleOneTapLogin({
    onSuccess: (tokenResponse) => oneTapLogin(tokenResponse),
    onError: () => {
      console.error("Login failed");
    }
  })

  const loginUserFunc:FormEventHandler = (e) => {
    e.preventDefault();
    const userLogin = window.localStorage.getItem("userLogin");
    if (userLogin !== null) {
      const holder:user = JSON.parse(userLogin);
      const {name, email, pwd} = holder;
      if ((isName === email) && (isPwd === pwd)) {
        if (checkedref.current?.checked) localStorage.setItem("userLogin", `${JSON.stringify({...holder, loggedIn: true})}`);
        loginUser(name);
        setName("");
        setPwd("");
        setTimeout(() => {
          navigate('../', { replace: true });
        }, 1000);
        return;
      }
      navigate('../../app/signup', { replace: true });
      return;
    }
    navigate('../../app/signup', { replace: true });
  }
  
  useEffect(() => {
    document.title = "Login - Form App";
    namref.current?.focus();
  }, [])

  useEffect(() => {
    if (isPwd !== "") {
      document.querySelector(".seer")?.classList.replace("hidden", "flex");
      return
    } 
    document.querySelector(".seer")?.classList.replace("flex", "hidden");
  }, [isPwd])
  
  return createPortal(
    <div className='login-cont flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto bg-layout/30 backdrop-blur-sm'>
      <div className='flex flex-col relative mx-auto mt-8 mb-8 min-w-[18rem] min-h-[10rem] bg-white p-5 pt-6 pb-6 border rounded-2xl shadow-lg leading-7 md:min-w-[22rem] md:p-7 md:pt-9 md:pb-9 md:leading-10'>
        {/* first line */}
        <div className="flex flex-row justify-between items-center mb-8">
          <span className='text-black font-semibold text-2xl'>Login</span>
          <div className='flex text-center h-[1.6rem] w-[1.6rem] rounded-full border border-gray-300 text-gray-500 md:h-[2rem] md:w-[2rem]'>
            <a href="/app" className="inline-flex w-full outline-none h-full justify-center items-center ">
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center rotate-45'></span>
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center -rotate-45'></span>
            </a>
          </div>
        </div>
        
        {/* second line */}
        <form onSubmit={loginUserFunc} className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
          {/* E-Mail session */}
          <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
          <input type="email" id='email' placeholder='trinitydev001@gmail.com' value={isName} onChange={(val)=>setName(val.target.value)} ref={namref} className='border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 placeholder:tracking-wider outline-none mb-4 w-full' required /> <br />
          {/* Password session */}
          <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
          <div className="flex w-full min-h-max items-center relative mb-4">
            <input type={`${isVisible? "password": "text"}`} id='password' value={isPwd} onChange={(val)=>setPwd(val.target.value)} placeholder="*********" ref={pwdref} className='peer/pwd border border-gray-200 rounded-lg placeholder:tracking-widest focus:border-sky-400 outline-none pr-9 w-full' required />
            <div className="seer hidden items-center w-6 h-full absolute right-2 cursor-pointer" onClick={()=>setVisible(!isVisible)} >
            {
              (isVisible) ? 
                <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
              : 
                <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"/></svg>
              }
            </div>
          </div>
          <div className="flex flex-row-reverse items-center justify-end mb-4">
            <label htmlFor="remind_me" className='text-gray-400 font-semibold'>Remind me</label>
            <input type="checkbox" name="remind_me" id="remind_me" ref={checkedref} className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' />
          </div>
          <input type="submit" value="Log in" className='w-full bg-sky-400 text-white font-medium rounded-md p-1 mb-4 lg:text-xl lg:!leading-[3rem]' />
          <span className="inline-block w-full text-sky-400 text-center font-medium">Forgot Password?</span>
        </form>
        <div className="flex flex-col pt-4 justify-center items-center text-center">
          <span className='text-gray-400 w-fit'>Do not have an account?</span>
          <span className="text-sky-400 w-fit">
            <a href="/app/signup" className="outline-none underline lg:text-xl">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element
  )
}

export default memo(LoginPage)
