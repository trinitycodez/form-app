import { memo, useReducer, useState, FormEventHandler, useEffect, useRef } from "react";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { createPortal } from "react-dom";
import { Submit } from "./Submit";
import { useNavigate } from "react-router-dom";
import GooglePerson from "./GoogleSubmit";
import jwtDecode from "jwt-decode";

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
  const {name, email, password, message, pwd_message} = values;
  const [isVisible, setVisible] = useState(true);
  const [isPerson, setPerson] = useState("");
  const navigate = useNavigate();
  const namRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  
  const loginGoogle = async (credentialResponse:CredentialResponse) => {
    const onlineGoogle = await jwtDecode(`${credentialResponse.credential}`) as Response;
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
      navigate("../../app", {replace:true});
    }
  }

    
  const submitHandler:FormEventHandler = async(e)=> {
    e.preventDefault();
    
    if ((!values.message && !values.pwd_message ) 
    && ((emailRef.current!.ariaInvalid === "false") 
    && (pwdRef.current!.ariaInvalid === "false"))) {

      const {name, email, password} = values;
      const person = new Submit(name, email, password, "checked");
      await person.send();

      if (person.sms.name && !person.sms.message) {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
        dispatch({type:"ALL", payload:""});
        window.localStorage.setItem("userLogin", `${JSON.stringify({
          name: person.sms.name,
          email: person.sms.email,
          pwd: person.sms.password,
          loggedIn: false
        })}`)
        // console.log("signup ", localStorage.getItem("userLogin"));
        setPerson(`Dear ${person.sms.name}, you successfully submitted this form`);
        setTimeout(() => {
          navigate("../../app/login", {replace:true});
        }, 2500);    
      } else  {
        alert("An error occur submitting this form");
      }
    }
    return;
  }
  
  useEffect(() => {
    if (password !== "") {
      document.querySelector(".seer")?.classList.replace("hidden", "flex")
      return
    } 
    document.querySelector(".seer")?.classList.replace("flex", "hidden")
  
  }, [password])
  

  useEffect(() => {
    document.title = "Signup - Form App";
    namRef.current?.focus();
    
    return ()=> {
      isPerson && 
      setPerson("");
    }
  }, [isPerson])
  

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
          <GoogleLogin
            onSuccess={(credentialResponse) => loginGoogle(credentialResponse)}
            onError={() => console.error('Login Failed')}
          />
        </div>

        {/* second line */}
        <form method="POST" onSubmit={submitHandler} id="form_signup" noValidate={false} className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
          {/* Name session */}
          <label htmlFor="name" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Name </label> <br />
          <input type="text" id="name" placeholder="surname name" value={name} ref={namRef} onChange={
            () => {dispatch({
              type:"NAME",
              payload:`${namRef.current!.value}`
              })}
          } className="border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 placeholder:tracking-wider outline-none mb-4 w-full" required /> <br />
          {/* E-Mail session */}
          <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
          <input type="email" id='email' placeholder='trinitydev001@gmail.com' value={email} ref={emailRef} onChange={
            () => {dispatch({
              type:"EMAIL",
              payload:`${emailRef.current!.value}`
              })}
          } className='peer/email border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 placeholder:tracking-wider outline-none mb-3 w-full' aria-invalid="false" required /> <br />
          {/* wrong input message prompted */}
          <span className="flex invisible h-0 peer-aria-[invalid]/email:visible peer-aria-[invalid]/email:h-fit text-xs text-red-500 w-full -mt-2 ml-[0.15rem] mb-3">
            {message}
          </span>
          {/* Password session */}
          <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
          <div className="flex w-full min-h-max items-center relative mb-5">
            <input type={`${isVisible? "password": "text"}`} id='password' minLength={8} value={password} placeholder="*********" ref={pwdRef} onChange={
              () => {dispatch({
                type:"PASSWORD",
                payload:`${pwdRef.current!.value}`
                })}
            } className='border border-gray-200 rounded-lg placeholder:tracking-widest focus:border-sky-400 outline-none pr-9 w-full' aria-invalid="false" required />
            <div className="seer hidden items-center w-6 h-full absolute right-2 cursor-pointer" onClick={()=>setVisible(!isVisible)}>
              {
                (isVisible) ? 
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-500 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"/></svg>                    
              }
            </div>
          </div>
          <span className="flex h-fit aria-[invalid]:visible aria-[invalid]:h-fit text-xs text-red-500 w-full -mt-3 ml-[0.15rem] mb-3">{pwd_message}</span>
          {/* Terms and Privacy session */}
          <div className="flex flex-row-reverse items-center justify-end mb-4">
            <label htmlFor="agreement" className='text-gray-400 font-semibold'>I agree with <a href="https://" className="outline-none text-sky-400 underline">Terms<span className=" text-gray-400">&nbsp;and&nbsp;</span>Privacy</a></label>
            <input type="checkbox" name="agreement" id="agreement" className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' checked readOnly required />
          </div>
          <input type="submit" value="Submit" className='w-full lg:text-xl lg:!leading-[3rem] bg-sky-400 text-white outline-none font-medium rounded-md p-1 mb-4 cursor-pointer' />

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
export default memo(SignupPage)