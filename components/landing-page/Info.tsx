import Image from 'next/image'
import React from 'react'

const Info = () => {
  return (
    <div className='bg-admin-card mt-4'>
      <div className='max-w-xl mx-auto px-8 flex flex-col align-center text-center py-4'>
        <span className='text-lg font-semibold'>Plătești LA LIVRARE sau CU CARDUL</span>
        <span className='text-lg font-semibold mt-1'>Plată 100% SECURIZATĂ</span>
        <Image 
          src='/landing-page/images/card-providers.png'
          width={512}
          height={128}
          alt='card providers'
          unoptimized
          className='w-full mt-4'
        />
        <span className='text-lg font-semibold mt-4'>🎁 SURPRIZĂ din partea noastră la plata cu cardul</span>
      </div>
    </div>
  )
}

export default Info