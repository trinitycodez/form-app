import {createPortal} from 'react-dom';

const LoginPage = () => {
  
  return createPortal(
    <div className='flex absolute top-0 justify-center items-center min-w-full min-h-full'>
      <div className='flex flex-col absolute mx-auto min-w-[15rem] min-h-[10rem] bg-white p-4 border rounded-2xl'>
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
        <form action="" className='border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 pt-4 pb-4'>
          <label htmlFor="email" className='inline-block mb-2 font-semibold after:content-["*"] after:text-red-500'>Email</label> <br />
          <input type="email" id='email' className='border border-gray-200 rounded-lg focus:border-sky-400 outline-none' />
        </form>
      </div>
    </div>,
    document.getElementById('modal') as Element
  )
}

export default LoginPage
