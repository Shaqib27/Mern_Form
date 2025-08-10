import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Utils';
import { toast, ToastContainer } from 'react-toastify';
const Home = () => {
  const [LoggedInuser,setloggedInUser] = useState('');
  useEffect(()=>{
    setloggedInUser(localStorage.getItem('LoggedInuser'));
  },[])

  const navigate = useNavigate();
  const handleLogout =(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInuser');
    handleSuccess('User Logout');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }
  return (
    <div className='flex flex-col items-center pt-[30%] gap-3'>
      <h1>{LoggedInuser}</h1>
      <button className='bg-red-500 p-2 rounded-md cursor-pointer'
       onClick={handleLogout}>Logout</button>
       <ToastContainer/>
    </div>
    
  )
}

export default Home