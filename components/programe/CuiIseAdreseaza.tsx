import Image from 'next/image'
import React from 'react'
import FormatText from '../../utils/FormatText'
import FormatText2 from '../../utils/FormatText2'

type Props = {
  title: string
  description: string
}

const CuiIseAdreseaza = ({ title, description }: Props) => {
  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-between items-center mt-12 md:mt-24 w-full'>
      <Image 
        alt='Cui i se adreseaza'
        src='/images/PaginaProgram/Cui-adreseazaz.png'
        width={387}
        height={387}
        className='w-full h-full md:w-[25vw] max-w-[300px] max-h-[300px] md:h-[25vw] md:mr-10'
        unoptimized={true}
      />
      <div className='flex flex-col items-center'>
        <p className='text-secondary text-[18px] md:text-[32px] font-extrabold'>{ title }</p>
        <div className='mt-4 md:mt-8'>
          <FormatText2 text={description} className='text-[#00103C] text-[14px] lg:text-[16px] text-justify'/>
        </div>
      </div>
    </div>
  )
}

export default CuiIseAdreseaza