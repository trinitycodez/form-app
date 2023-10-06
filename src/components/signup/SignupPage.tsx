import React, { useReducer, useState, FormEventHandler, useEffect, useRef } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { createPortal } from "react-dom";
import { Submit } from "./Submit";
import { useNavigate } from "react-router-dom";

interface initialType {
  name:string,
  email:string,
  password:string,
  message?:string
  pwd_message?:string
}

interface actionType {
  type:"NAME" | "EMAIL" | "PASSWORD" | "ALL",
  payload:string
}

const initialState:initialType = {
  name:"",
  email:"",
  password:""
}
const reducer = (state:initialType, action:actionType):initialType => {
  switch (action.type) {
    case "ALL":
      return {...initialState};
    case "NAME":
      return {
        ...state,
        name: action.payload
      }
    case "PASSWORD":
      const holdVal = action.payload.length;
      if ((holdVal < 8) && (holdVal !== 0)) {
        document.querySelector("#password")!.ariaInvalid = "true";
        return {
          ...state,
          password: action.payload,
          pwd_message: "Enter minimum of 8 digits"
        }
      }

      document.querySelector("#password")!.ariaInvalid = "false";
      return {
        ...state,
        password: action.payload,
        pwd_message: ""
      }
    case "EMAIL":
      const chk = action.payload;
      const ol = chk.match(/([a-z0-9]+)([_.-{1}])?([a-z0-9]+)@([a-z0-9]+)([.])([a-z.]+)/g);
      if (ol !== null) {
        // compare the pattern and that on the input field
        if (ol[0].slice(ol[0].length-1) !== chk.slice(chk.length-1)) {
          document.querySelector("#email")!.ariaInvalid = "true";
          return {
            ...state,
            email: action.payload.toLocaleLowerCase(),
            message: "Wrong domain email address after @ character"
          }
        }
      } else if ((ol === null) && chk) {
        console.log(ol);
        document.querySelector("#email")!.ariaInvalid = "true";
        return {
          ...state,
          email: action.payload.toLocaleLowerCase(),
          message: "Wrong input of email address"
        }        
      }
      // when met all requirement
      document.querySelector("#email")!.ariaInvalid = "false";
      return {
        ...state,
        email: action.payload.toLocaleLowerCase(),
        message: ""
      }

    default:
      // wysiwyg... all state maintained
      return {...state}
  }
}

// component
const SignupPage = () => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [isVisible, setVisible] = useState(true);
  const [isPerson, setPerson] = useState("");
  const navigate = useNavigate();
  const namRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  
  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const dataHolder = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Data ${tokenResponse.access_token}`
          }
        })
        console.log(dataHolder);
        return dataHolder;

      } catch (error) {
        console.error(error);
      }
    },
    onError: (responseError) => console.error(responseError)
  });

  const submitHandler:FormEventHandler = async(e)=> {
    e.preventDefault();
    
    if ((!values.message && !values.pwd_message ) && ((emailRef.current!.ariaInvalid === "false") && (pwdRef.current!.ariaInvalid === "false"))) {
      const {name, email, password} = values;
      const person = new Submit(name, email, password, "checked");
      await person.send();
      if (person.sms.name && !person.sms.message) {
        dispatch({type:"ALL", payload:""});
        // namRef.current!.value = "";
        // emailRef.current!.value = "";
        // pwdRef.current!.value = "";
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setPerson(`Dear ${person.sms.name}, you successfully submitted this form`);
        isPerson && setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else  {
        alert("An error occur submitting this form");
      }
    }
    return;
  }
  

  useEffect(() => {
    document.title = "Signup - Form App";
    namRef.current?.focus();
    return ()=> setPerson("");
  }, [])
  

  return createPortal(
    <div className='sign-cont flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto selection:bg-sky-600 selection:text-white bg-layout/30 backdrop-blur-sm'>
      {isPerson && <div className="alert absolute top-0 mx-auto text-green-700 bg-green-300/40 w-[17rem] p-5 z-10 backdrop-blur-[2px] shadow-md">{isPerson}</div>}
      <div className="flex flex-col relative mx-auto mt-8 mb-8 min-w-[18rem] min-h-[10rem] bg-white p-5 pt-6 pb-6 border rounded-2xl shadow-lg leading-7 md:min-w-[22rem] md:p-7 md:pt-9 md:pb-9 md:leading-10">
        {/* first line */}
        <div className="flex flex-row justify-between items-center mb-5">
          <span className='text-black font-semibold text-2xl'>Sign up</span>
          <div className='flex text-center h-[1.6rem] w-[1.6rem] rounded-full border border-gray-300 text-gray-500 md:h-[2rem] md:w-[2rem]'>
            <a href="/app" className="inline-flex w-full h-full justify-center items-center outline-none">
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center rotate-45'></span>
              <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center -rotate-45'></span>
            </a>
          </div>
        </div>
        <div className="flex justify-center w-full min-h-[2rem] border border-gray-200 rounded-lg p-3 mb-5">
          <div role="button" aria-roledescription="this button is to sign in with a google account" className="flex items-center outline-none cursor-pointer" onClick={() => signup()}>
            <div className="w-8 h-fit mr-4">
              <svg fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 h-auto w-full">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z"/>
              </svg>
            </div>
            <span className='font-semibold'>Sign up with Google</span>
          </div>
        </div>

        {/* second line */}
        <form method="POST" onSubmit={submitHandler} id="form_signup" noValidate={false} className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>

          <label htmlFor="name" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Name </label> <br />
          <input type="text" id="name" placeholder="surname name" value={values.name} ref={namRef} onChange={
            () => {dispatch({
              type:"NAME",
              payload:`${namRef.current!.value}`
              })}
          } className="border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 outline-none mb-4 w-full" required /> <br />

          <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
          <input type="email" id='email' placeholder='trinitydev001@gmail.com' value={values.email} ref={emailRef} onChange={
            () => {dispatch({
              type:"EMAIL",
              payload:`${emailRef.current!.value}`
              })}
          } className='peer/email border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 outline-none mb-3 w-full' aria-invalid="false" required /> <br />
          {/* wrong input message prompted */}
          <span className="flex invisible h-0 peer-aria-[invalid]/email:visible peer-aria-[invalid]/email:h-fit text-xs text-red-500 w-full -mt-2 ml-[0.15rem] mb-3">
            {values.message}
          </span>

          <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
          <div className="flex w-full min-h-max items-center relative mb-5">
            <input type={`${isVisible? "password": "text"}`} id='password' minLength={8} value={values.password} placeholder="*********" ref={pwdRef} onChange={
              () => {dispatch({
                type:"PASSWORD",
                payload:`${pwdRef.current!.value}`
                })}
            } className='border border-gray-200 rounded-lg placeholder:tracking-widest focus:border-sky-400 outline-none pr-9 w-full' aria-invalid="false" required />
            <div className="flex items-center w-6 h-full absolute right-2 cursor-pointer" onClick={()=>setVisible(!isVisible)}>
              {
                (isVisible) ? 
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"/></svg>                    
              }
            </div>
          </div>
          <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{values.pwd_message}</span>

          <div className="flex flex-row-reverse items-center justify-end mb-4">
            <label htmlFor="agreement" className='text-gray-400 font-semibold'>I agree with <a href="https://" className="outline-none text-sky-400 underline">Terms<span className=" text-gray-400">&nbsp;and&nbsp;</span>Privacy</a></label>
            <input type="checkbox" name="agreement" id="agreement" className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' checked readOnly required />
          </div>
          <input type="submit" value="Submit" className='w-full lg:text-xl lg:!leading-[3rem] bg-sky-400 text-white outline-none font-medium rounded-md p-1 mb-4' />

        </form>

        <div className="flex flex-col pt-4 justify-center items-center text-center">
          <span className='text-gray-400 w-fit'>Already have an account?</span>
          <span className="text-sky-400 w-fit">
            <a href="/app/login" className="outline-none underline lg:text-xl">
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element
  )
}
export default React.memo(SignupPage)