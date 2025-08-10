import { useState } from 'react'
import {Navigate, Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Home from './pages/Home'
import { RefreshHandler } from './RefreshHandler'

function App() {
  const [isAuth, setisAuth] = useState(false)
  const PrivateRoute = ({element})=>{
    return isAuth ? element : <Navigate to="/login"/>
  }



  return (
    <>
    <div className='min-h-screen w-full bg-gray-500'>
      <RefreshHandler setisAuth2={setisAuth}/>
       <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
       </Routes>
    </div>
    </>
  )
}

export default App
