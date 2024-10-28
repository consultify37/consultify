import Image from 'next/image'
import React from 'react'

type Props = {
  profilePic: File | null
  setProfilePic: React.Dispatch<React.SetStateAction<File | null>>
}

const ProfileImageComponent = ({ profilePic, setProfilePic}: Props) => {
  return (
    <div>
      <h2 className='text-[14px] font-semibold text-secondary'>Adaugă poza de profil</h2>
        <div className='mt-4 flex flex-row items-center'>
          <input 
            hidden
            type='file'
            id='imagine'
            onChange={(e) => e.target.files && setProfilePic(e.target.files[0]) }
          />
          <label 
            htmlFor='imagine'
            className='w-28 h-28 rounded-full bg-admin-card hover:scale-105 transition-all cursor-pointer flex items-center justify-center mr-6'
          >
            <Image 
              src='/images/admin/plus-in-circle.svg'
              alt='plus'
              width={16}
              height={16}
              className='w-6 h-auto'
            />
          </label>

          { profilePic &&
            <div className='relative'>
              <Image 
                src={typeof profilePic === 'string' ? profilePic : ( profilePic ? URL.createObjectURL(profilePic) : '')}
                width={112}
                height={112}
                alt='profile pic'
                className='w-28 h-28 rounded-full object-cover'
              />
              <div 
                className='absolute top-0 right-0 w-8 h-8 bg-red-500 flex items-center justify-center rounded-full cursor-pointer transition-all hover:scale-105'
                onClick={() => setProfilePic(null) }
              >
                <Image 
                  src='/images/admin/x-in-circle.svg'
                  alt='plus'
                  width={16}
                  height={16}
                  className='w-6 h-auto'
                />
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default ProfileImageComponent