import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../Utils'

const Login = () => {
    const [logininfo, setLogininfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handlChange = (e) => {
        const { name, value } = e.target;
        const copyloginInfo={...logininfo};
        copyloginInfo[name]=value;
        setLogininfo(copyloginInfo);
        console.log(name, value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logininfo;
        if ( !email || !password) {
            return handleError('All data are Required');
        }
        try {
            const url = "http://localhost:4000/auth/login";
            const response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logininfo)
                
            });
            const result= await response.json();
            const {success,jwtToken,name, message,error} = result;
            if(success){
                handleSuccess(message)
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('LoggedInuser',name);
                setTimeout(()=>{
                    navigate('/home');
                },2000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <div className='p-[30%]'>
            <div className='border border-gray-600 w-[380px] rounded-2xl mx-auto p-6'>

                <h1 className='font-bold text-2xl ml-[100px]'>Sign Up</h1>

                <form onSubmit={handleLogin}
                className='flex flex-col'>  
                  <input
                        type="email"
                        name='email'
                        value={logininfo.email}
                        onChange={handlChange}
                        className='border border-gray-400 text-white font-medium m-4 rounded-2xl p-2'
                        placeholder='Enter Email'
                    />

                    <input
                        type="password"
                        name='password'
                        value={logininfo.password}
                        onChange={handlChange}
                        className='border border-gray-400 text-white font-medium m-4 rounded-2xl p-2'
                        placeholder='Enter Password'
                    />

                    <button
                        type="submit"
                        className='bg-blue-500 p-2 rounded-md cursor-pointer mb-3'
                    >
                        Login
                    </button>

                    <span>
                        Does't have an account? <Link to="/signup">Sing up</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
