import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const LayoutApp = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const timer = setTimeout(() => {
            navigate("/app/login");
        }, 3000);
        
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className='flex min-h-[100vh] min-w-full bg-layout absolute justify-center items-center'>
            <p className='text-blue-400'>Redirecting...</p>
        </div>
    )
}

export default LayoutApp