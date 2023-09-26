import {createPortal} from 'react-dom';

const LoginPage = () => {
  
  return createPortal(
    <div className='flex absolute top-0 justify-center items-center min-w-full min-h-full overflow-y-auto bg-red-100/40'>
      <div className='flex flex-col relative mx-auto mt-8 mb-8 min-w-[15rem] min-h-[10rem] bg-white p-4 border rounded-2xl'>
        {/* first line */}
        <div className="flex flex-row justify-between items-center mb-5">
          <span className='text-black font-semibold text-2xl'>Login</span>
          <div className='flex justify-center items-center h-[1.6rem] w-[1.6rem] rounded-full border-2 border-gray-300 text-gray-500'>
            X
          </div>
        </div>
        <div className="flex justify-center w-full min-h-[2rem] border-2 border-gray-200 rounded-lg p-3 mb-5">
          <a href="https://">
            <div className="">
              <img src="" alt="google link" className='text-xs' />
            </div>
            <span className='font-semibold'>Log in with Google</span>
          </a>
        </div>
        {/* second line */}
        <form action="#" className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
          <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email </label> <br />
          <input type="email" id='email' placeholder='trinitydev001@gmail.com' className='peer/email border border-gray-200 rounded-lg focus:border-sky-400 outline-none mb-3' /> <br />
          <span className="flex invisible h-0 peer-invalid/email:visible peer-invalid/email:h-fit text-xs text-red-500 w-full -mt-2 ml-[0.15rem] mb-3">Wrong input of email username</span>
          <label htmlFor="password" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Password </label> <br />
          <input type="password" id='password' className='border border-gray-200 rounded-lg focus:border-sky-400 outline-none mb-4' />
          <div className="flex flex-row-reverse items-center justify-end mb-4">
            <label htmlFor="remind_me" className='text-gray-500 font-semibold'>Remind me</label>
            <input type="checkbox" name="remind_me" className='mr-3 border rounded-sm focus:ring-0 text-sky-400' id="remind_me" />
          </div>
          <input type="submit" value="Log in" className='w-full bg-sky-400 text-white font-medium rounded-md p-1 mb-4' />
          <span className="inline-block w-full text-sky-400 text-center font-medium">Forgot Password?</span>
        </form>
        <div className="flex flex-col pt-4 text-center">
          <span className='text-gray-400'>Do not have an account?</span>
          <span className="text-sky-400">
            <a href="/signup">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element
  )
}

export default LoginPage
