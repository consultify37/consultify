import React from 'react'
import CTAButton from './CTAButton'

const MainInfo = () => {
  return (
    <div className='mt-6'>
      <h1 className='font-semibold text-xl'>FLASHCARDS START UP NATION + SEDINTA CONSULTANTA</h1>
      <p className='mt-2 text-sm font-base'><span className='text-yellow-500'>★★★★★</span> 1283 de clienți mulțumiți</p>
      <div className='flex items-center mt-4 gap-x-4 mb-6'>
        <p className='font-bold text-[28px]'>199lei <span className='text-[#E4E4E4] line-through'>399lei</span></p>
        <div className='rounded-md text-sm h-fit bg-landing-green-400 text-white p-2 py-1 font-semibold'>
          SALVEZI 50%
        </div>
      </div>

      <CTAButton />
    </div>
  )
}

export default MainInfo