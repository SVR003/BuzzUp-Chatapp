import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectImage, SetSelectImage] = useState(null)
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)
  const navigate = useNavigate()

  
 
  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!selectImage){
      await updateProfile({fullName: name, bio}); 
      navigate('/')
      return
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/')

    }
  }
  
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl border-2 border-gray-600 backdrop-blur-2xl flex items-center justify-between max-sm:flex-col-reverse rounded-lg text-gray-300'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h1 className='text-lg'>Profile details</h1>
          <label htmlFor="avatar" className='flex items-center cursor-pointer gap-3'>
            <input onChange={(e) => SetSelectImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpeg, .jpg' hidden />
            <img src={selectImage? URL.createObjectURL(selectImage) : assets.avatar} alt="" className={`w-12 h-12 ${selectImage && 'rounded-full'}`} />
            {selectImage? "Change Profile Pic" : "Choose a profile Pic"}
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name' className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ' />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} placeholder='Short Bio...' className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 '></textarea>

          <button type='submit' className='w-50 py-2 px-10 bg-violet-500 text-white rounded-md cursor-pointer'>
            Save
          </button>
        </form>

        <img src={authUser?.profilePic || assets.logo} alt="" className={`max-w-40 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectImage && 'rounded-full'}`} />

      </div>

    </div>
  )
}

export default Profile