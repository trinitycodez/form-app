import { createPortal } from "react-dom";

type propsType = {
  stateSignup:boolean,
  setPropsSignup:(val:boolean) => void
}
const SignupPage = ({stateSignup, setPropsSignup}:propsType) => {
  const loginClicker = () => {
    setPropsSignup(!stateSignup);
  }
  return createPortal(
    <>
      {stateSignup &&
        (<div className='sign-cont flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto bg-red-100/40'>
          <div className="flex flex-col relative mx-auto mt-8 mb-8 min-w-[18rem] min-h-[10rem] bg-white p-4 pt-5 pb-5 border rounded-2xl shadow-lg">
            {/* first line */}
            <div className="flex flex-row justify-between items-center mb-5">
              <span className='text-black font-semibold text-2xl'>Sign up</span>
              <div className='flex justify-center items-center h-[1.6rem] w-[1.6rem] rounded-full border border-gray-300 text-gray-500'>
                X
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
            <form action="#" className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
              <label htmlFor="name" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Name </label> <br />
              <input type="text" id="name" placeholder="surname name" className="border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 outline-none mb-4 w-full" required /> <br />
              <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
              <input type="email" id='email' placeholder='trinitydev001@gmail.com' className='peer/email border border-gray-200 rounded-lg focus:border-sky-400 placeholder:text-gray-400 outline-none mb-3 w-full ' required /> <br />
              {/* wrong input message prompted */}
              <span className="flex invisible h-0 peer-invalid/email:visible peer-invalid/email:h-fit text-xs text-red-500 w-full -mt-2 ml-[0.15rem] mb-3">Wrong input of email username</span>
              <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
              <input type="password" id='password' minLength={8} className='border border-gray-200 rounded-lg focus:border-sky-400 outline-none mb-4 w-full' required />
              <div className="flex flex-row-reverse items-center justify-end mb-4">
                <label htmlFor="agreement" className=' text-gray-400 font-semibold'>I agree with <a href="https://" className=" text-sky-400 underline">Terms<span className=" text-gray-400">&nbsp;and&nbsp;</span>Privacy</a></label>
                <input type="checkbox" name="agreement" id="agreement" className='mr-3 border border-gray-300 rounded-sm focus:ring-0 text-sky-400' checked required />
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