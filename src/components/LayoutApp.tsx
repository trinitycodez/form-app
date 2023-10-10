import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { propsType, user } from './login/LoginPage';

const LayoutApp = ({loginUser}:propsType) => {
    const navigate = useNavigate();

    useEffect(()=>{
        const store = localStorage.getItem("userLogin");
        const timer = setTimeout(() => {
            if (store !== null) {
                const {name, loggedIn}:user = JSON.parse(store);
                if (loggedIn) { 
                    loginUser(name);
                    navigate("/app", { replace:true });
                    return;
                }
            }
            navigate("/app/login", { replace:true });
        }, 2500);
        
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