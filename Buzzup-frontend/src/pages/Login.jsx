import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {

  const [currentSt, setCurrentSt] = useState("SignUp")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentSt === 'SignUp' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currentSt === 'SignUp'? 'signup' : 'login', {fullName, email, password, bio})
    
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left */}
      <img src={assets.logo} alt="" className='hidden md:flex w-[min(30vw,250px)]' />

      {/* Right */}
      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center'>{currentSt}
            {
              currentSt === 'SignUp' && isDataSubmitted && (
                <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow} alt="" className='w-5 cursor-pointer' />
              )
            }
          
          </h2>
        
        {
          currentSt === 'SignUp' && !isDataSubmitted && (
            <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder='Fullname' className='p-2 border border-gray-500 rounded-md focus:outline-none' required />
          )
        } 

        {
          !isDataSubmitted && (
            <>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
            </>
          )
        }

        {
          currentSt === 'SignUp' && isDataSubmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} placeholder='Enter Bio..' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required ></textarea>
          )
        }

       <button type='submit' className='cursor-pointer bg-violet-600 py-2 px-10 rounded-full'>
        {currentSt === 'SignUp'? "Create Account" : "Login"}
       </button>

       <div className='flex items-center text-xs gap-2'>
        <input type="checkbox" />
        <p>Agree to the terms and conditions</p>
       </div>

       <div className='flex flex-col gap-2'>
        {currentSt === 'SignUp'? (
          <p className='text-sm text-gray-400'>Already have an account? <span onClick={() => {setCurrentSt("Login"); setIsDataSubmitted(false)}} className='font-medium text-blue-600 hover:underline cursor-pointer'>Login here</span></p>
        ) : (
          <p className='text-sm text-gray-400'>Create an account <span onClick={() => setCurrentSt("SignUp")} className='font-medium text-blue-600 hover:underline cursor-pointer'>Sign Up</span></p>
        )}
       </div>
        
      </form>
    </div>
  )
}

export default Login