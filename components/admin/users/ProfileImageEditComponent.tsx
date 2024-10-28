import Image from 'next/image'
import React from 'react'

type Props = {
  profilePic: string | File | null
  setProfilePic: React.Dispatch<React.SetStateAction< string | File | null>>
}

const ProfileImageEditComponent = ({ profilePic, setProfilePic}: Props) => {
  return (
    <div>
        <div className='flex flex-row items-center'>
          { profilePic &&
            <div className='relative'>
              <Image 
                src={typeof profilePic === 'string' ? profilePic : ( profilePic ? URL.createObjectURL(profilePic) : '')}
                width={512}
                height={512}
                alt='profile pic'
                className='w-28 h-28 min-w-[112px] rounded-full object-cover mr-4'
              />
            </div>
          }
          
          <input 
            hidden
            type='file'
            id='imagine'
            onChange={(e) => e.target.files && setProfilePic(e.target.files[0]) }
          />
          <label 
            htmlFor='imagine'
            className="bg-primary cursor-pointer text-[14px] font-semibold flex items-center px-5 justify-center py-[10px] text-onPrimary rounded-lg hover:scale-[1.05] transition-all"
          >
            { profilePic ? 'Schimbă fotografia' : 'Adaugă fotografie' }
          </label> 
        </div>
    </div>
  )
}

export default ProfileImageEditComponent