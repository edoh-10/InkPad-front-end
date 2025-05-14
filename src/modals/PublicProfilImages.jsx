
import { UsePublicsNotes } from "../Context/PublicsNotesContext";
import { IoClose } from "react-icons/io5";
import React from 'react'

function PublicProfilImage() {

    const {publicsNotesData, setPublicNotesData} = UsePublicsNotes();
    const {publicsNotesState, setPublicNotesState} = UsePublicsNotes();

    if(!publicsNotesState){
        return null
    }

    const closeIt = () => {
        if(publicsNotesState){
            setPublicNotesState(false)
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
            <img src={publicsNotesData.user.avatar} alt="" className='w-full h-[100%] '/>
        </div>
    </div>
  )
}

export default PublicProfilImage;