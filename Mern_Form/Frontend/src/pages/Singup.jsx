import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../Utils'

const Signup = () => {
    const [signupinfo, setsignupinfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handlChange = (e) => {
        const { name, value } = e.target;
        const copysignupInfo={...signupinfo};
        copysignupInfo[name]=value;
        setsignupinfo(copysignupInfo);
        console.log(name, value);
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupinfo;
        if (!name || !email || !password) {
            return handleError('All data are Required');
        }
        try {
            const url = "http://localhost:4000/auth/signup";
            const response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupinfo)
                
            });
            const result= await response.json();
            const {success, Message,error} = result;
            if(success){
                handleSuccess(Message)
                setTimeout(()=>{
                    navigate('/login');
                },2000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(Message);
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

                <form onSubmit={handleSignup}
                className='flex flex-col'>

                    <input
                        type="text"
                        name='name'
                        value={signupinfo.name}
                        onChange={handlChange}
                        className='border border-gray-400 text-white font-medium m-4 rounded-2xl p-2'
                        placeholder='Enter Name'
                    />

                    <input
                        type="email"
                        name='email'
                        value={signupinfo.email}
                        onChange={handlChange}
                        className='border border-gray-400 text-white font-medium m-4 rounded-2xl p-2'
                        placeholder='Enter Email'
                    />

                    <input
                        type="password"
                        name='password'
                        value={signupinfo.password}
                        onChange={handlChange}
                        className='border border-gray-400 text-white font-medium m-4 rounded-2xl p-2'
                        placeholder='Enter Password'
                    />

                    <button
                        type="submit"
                        className='bg-blue-500 p-2 rounded-md cursor-pointer mb-3'
                    >
                        Sign Up
                    </button>

                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup
