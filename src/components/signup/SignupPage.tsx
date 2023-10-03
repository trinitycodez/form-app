import { useReducer, FormEventHandler, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Submit } from "./Submit";

type propsType = {
  stateSignup:boolean,
  setPropsSignup:(val:boolean) => void
}

interface initialType {
  name:string,
  email:string,
  password:string,
  message?:string
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
      return {
        ...state,
        password: action.payload
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
const SignupPage = ({stateSignup, setPropsSignup}:propsType) => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const namRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  

  const loginClicker = () => {
    setPropsSignup(!stateSignup);
  }

  const submitHandler:FormEventHandler = async(e)=> {
    e.preventDefault()
    if (!values.message && (emailRef.current!.ariaInvalid === "false")) {
      const {name, email, password} = values;
      const person = new Submit(name, email, password, "checked");
      await person.send();
      if (person.sms.name && !person.sms.message) {
        dispatch({type:"ALL", payload:""})
        alert(`Dear ${person.sms.name}, you successfully submitted this form`)
      } else  {
        alert("An error occur submitting this form")
      }
      
    }
    return;
  }

  useEffect(() => {
    document.title = "Signup - Form App";
    namRef.current?.focus();
  }, [])
  

  return createPortal(
    <>
      {stateSignup &&
        (<div className='sign-cont flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto bg-red-100/40 selection:bg-sky-600 selection:text-white'>
          <div className="flex flex-col relative mx-auto mt-8 mb-8 min-w-[18rem] min-h-[10rem] bg-white p-5 pt-6 pb-6 border rounded-2xl shadow-lg">
            {/* first line */}
            <div className="flex flex-row justify-between items-center mb-5">
              <span className='text-black font-semibold text-2xl'>Sign up</span>
              <div className='flex justify-center items-center h-[1.6rem] w-[1.6rem] rounded-full border border-gray-300 text-gray-500'>
                <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center rotate-45'></span>
                <span className='inline-flex border border-gray-400 rounded-full h-4 origin-center -rotate-45'></span>
              </div>
            </div>
            <div className="flex justify-center w-full min-h-[2rem] border border-gray-200 rounded-lg p-3 mb-5">
              <a href="https://" className="flex items-center">
                <div className="w-8 h-8">
                  <img src="" alt="google link" className='text-xs' />
                </div>
                <span className='font-semibold'>Sign up with Google</span>
              </a>
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
              <div className="flex w-full min-h-max items-center relative mb-4">
                <input type="password" id='password' minLength={8} value={values.password} ref={pwdRef} onChange={
                  () => {dispatch({
                    type:"PASSWORD",
                    payload:`${pwdRef.current!.value}`
                    })}
                } className='border border-gray-200 rounded-lg focus:border-sky-400 outline-none pr-9 w-full' required />
                <div className="flex items-center w-6 h-full absolute right-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-gray-700 h-auto w-full" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                </div>
              </div>
              <div className="flex flex-row-reverse items-center justify-end mb-4">
                <label htmlFor="agreement" className='text-gray-400 font-semibold'>I agree with <a href="https://" className=" text-sky-400 underline">Terms<span className=" text-gray-400">&nbsp;and&nbsp;</span>Privacy</a></label>
                <input type="checkbox" name="agreement" id="agreement" className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' checked readOnly required />
              </div>
              <input type="submit" value="Submit" className='w-full bg-sky-400 text-white font-medium rounded-md p-1 mb-4' />
            </form>
            <div className="flex flex-col pt-4 justify-center items-center text-center">
              <span className='text-gray-400 w-fit'>Already have an account?</span>
              <span className="text-sky-400 w-fit" onClick={loginClicker}>
                <a href="/app/login" className="underline">
                  Log in
                </a>
              </span>
            </div>
          </div>
        </div>)}
    </>,
    document.getElementById('modal') as Element
  )
}
export default SignupPage