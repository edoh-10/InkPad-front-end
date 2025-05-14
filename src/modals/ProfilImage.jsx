
import { useUserProfil } from '../Context/UserProfileContext'
import { IoClose } from "react-icons/io5";


import React from 'react'

function ProfilImage() {
    const {user} = useUserProfil();
    const {profilImage, setProfilImage} = useUserProfil();
    if(!profilImage){
        return null
    }

    const closeIt = () => {
        if(profilImage){
            setProfilImage(false)
        }
    }
  return (
    <div className='fixed z-[100] w-full h-full bg-[#000000A0] backdrop-blur-[6px] flex flex-col items-center justify-center'>
        <div className='rounded-xl shadow-2xl  flex items-center justify-center flex-col h-auto w-[90%] lg:h-[80%]  lg:w-[80%] mx-auto bg-white relative'>
            <div className='fixed top-[10vh] right-[11vw]'>
                <button onClick={closeIt} className='text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    <IoClose size={40} />
                </button>
            </div>
            {/* image du profil */}
            <img src={user[2]} alt="" className='w-auto h-[100%] '/>
        </div>
    </div>
  )
}

export default ProfilImage;