import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext.jsx'

const App = () => {

  const { authUser } = useContext(AuthContext)

  return (
    <div className="bg-[url('https://tse4.mm.bing.net/th/id/OIP.1QqDgaKnSPmSIja6q24P0gHaEL?w=1360&h=768&rs=1&pid=ImgDetMain&o=7&rm=3')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser? <Home/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser? <Login/> : <Navigate to="/"/>}/>
        <Route path='/profile' element={authUser? <Profile/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App