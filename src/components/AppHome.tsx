import { Link } from 'react-router-dom'
import profile from "../images/Profile Pic.jpg"
import noAccount from "../images/no-account.svg"
import { memo, useState, useEffect, useRef } from 'react'
import { user } from './login/LoginPage'

type googleType = {
  given_name:string,
  picture:string,
  email_verified:boolean
}
type propsType = {login:string}

const AppHome = ({login}:propsType) => {
  const [isName, setName] = useState("");
  const [isImg, setImg] = useState("");
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const verify = localStorage.getItem("GooglePersonVerified");
    const localDomain = localStorage.getItem("userLogin");
    if (verify !== null ) {
      console.log(verify);
      const person:googleType = JSON.parse(verify);
      setName(person.given_name);
      setImg(person.picture);
    } else if ( localDomain !== null) {
      displayRef.current!.style.display = "none";
      const {name, loggedIn}:user = JSON.parse(localDomain);
      if (loggedIn) {
        setName(name);
        return;
      }
      setName(login);
    }
  }, [login])
  

  return (
    <div className='flex flex-col text-blue-400 min-h-[100vh] text-xl min-w-full bg-layout absolute justify-center items-center'>
      <div className="flex absolute justify-end w-full h-12 bg-[#434c5e] top-0 mb-4 shadow-xl">
        <div className="flex flex-row items-center bg-sky-800/30 pr-8 pl-4  w-fit h-full right-0">
          {isName && <span className="mx-4 font-semibold text-xs tracking-wider">{isName}</span>}
          <div className="h-8 w-8 ring ring-gray-900/30 rounded-full" ref={displayRef}>
            <img src={isImg?profile:noAccount} alt="profile" className='h-full w-full rounded-full' />
          </div>
        </div>
      </div>
      <div className="flex flex-col relative w-full items-center">
        <Link to="/app/login" className='inline-flex mb-3 font-bold hover:scale-110 tracking-wide shadow-xl hover:bg-slate-700 rounded-full p-2 pl-8 pr-8 transition-colors ease-linear duration-300'>Login</Link>
        <Link to="/app/signup" className='inline-flex font-bold hover:scale-110 tracking-wide shadow-xl hover:bg-slate-700 rounded-full p-2 pl-8 pr-8 transition-colors ease-linear duration-300'>SignUp</Link>
      </div>
    </div>
  )
}

export default memo(AppHome)