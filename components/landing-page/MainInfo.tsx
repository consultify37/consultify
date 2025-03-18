import React from 'react'
import CTAButton from './CTAButton'

type Props = {
  availableForSale: boolean
}

const MainInfo = ({ availableForSale }: Props) => {
  return (
    <div className='mt-6'>
      <h1 className='font-semibold text-xl'>AGENDA START-UP NATION + ȘEDINȚĂ GRATUITĂ DE CONSULTANȚĂ</h1>
      <p className='mt-2 text-sm font-base'><span className='text-yellow-500'>★★★★★</span> Peste 850 de clienți mulțumiți</p>
      <div className='flex items-center mt-4 gap-x-4 mb-6'>
        <p className='font-bold text-[28px]'>89lei <span className='text-[#E4E4E4] line-through'>199lei</span></p>
        <div className='rounded-md text-sm h-fit bg-landing-green-400 text-white p-2 py-1 font-semibold'>
          SALVEZI 56%
        </div>
      </div>

      <CTAButton />
    </div>
  )
}

export default MainInfo