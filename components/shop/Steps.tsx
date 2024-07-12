import React from 'react'
import { theme } from '../../utils/theme'

type Props = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Steps = ({ step, setStep }: Props) => {

  return (
    <div className='relative flex w-full flex-row px-6 sm:px-12 max-w-[700px]'>
      <div className='w-1/2 h-[3px] bg-[#A6A6A6]' style={{backgroundColor: step < 2 ? '#A6A6A6' : theme.primary}}></div>
      <div className='w-1/2 h-[3px] bg-[#A6A6A6]' style={{backgroundColor: step < 3 ? '#A6A6A6' : theme.primary}}></div>

      <div className='absolute left-6 z-10 -top-[30px] cursor-pointer' onClick={() => step > 1 && setStep(1)}>
        <div className='flex items-center justify-center border-[3px] rounded-full h-[60px] w-[60px]' style={{borderColor: theme.primary, backgroundColor: theme.primary}}>
          <p className='text-[20px] font-bold' style={{ color: 'white' }}>1</p>
        </div>
        <p className='relative text-center lg:-left-6 mt-2 -left-4 text-[11px] lg:text-[14px] text-secondary font-semibold'>Adresa ta de email</p>
      </div>

      <div className='absolute left-[calc(50%-30px)] z-10 -top-[30px] cursor-pointer' onClick={() => step > 2 && setStep(2)}>
        <div className='flex items-center justify-center border-[3px] rounded-full h-[60px] w-[60px]' style={{borderColor: step < 2 ? '#A6A6A6' : theme.primary, backgroundColor: step < 2 ? 'white' : theme.primary}}>
          <p className='text-[20px] font-bold' style={{ color: step < 2 ? '#A6A6A6' : 'white' }}>2</p>
        </div>
        
        <p className='text-center relative -left-4 lg:-left-6 mt-2 text-[11px] lg:text-[14px] text-secondary font-semibold'>Detalii comandă</p>
      </div>

      <div className='absolute -right-[2px] z-10 -top-[30px] cursor-pointer'>
        <div className='flex items-center justify-center border-[3px] rounded-full h-[60px] w-[60px]' style={{borderColor: step < 3 ? '#A6A6A6' : theme.primary, backgroundColor: step < 3 ? 'white' : theme.primary}}>
          <p className='text-[20px] font-bold' style={{ color: step < 3 ? '#A6A6A6' : 'white' }}>3</p>
        </div>

        <p className='text-center relative -left-4 lg:-left-6 mt-2 text-[11px] lg:text-[14px] text-secondary font-semibold'>Sumar comandă</p>
      </div>
    </div>
  )
}

export default Steps