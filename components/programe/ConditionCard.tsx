import React from 'react'
import { Condition } from '../../types'

type Props = {
  index: number
  condition: Condition
}

const ConditionCard = ({ index, condition }: Props) => {
  return (
    <div className='flex flex-row p-6 mt-4 lg:mt-1 bg-secondary rounded-2xl w-full'>
      <div className='bg-primary w-10 min-w-[40px] h-10 md:w-12 md:min-w-[48px] md:h-12 flex items-center justify-center rounded-[10px] mr-4'>
        <p className='text-onPrimary text-[22px] md:text-[28px] font-bold'>{index+1}</p>
      </div>
      <div className='flex flex-col'>
        <p className='text-onSecondary font-bold text-[18px] md:text-[24px]'>{ condition.condition }</p>
        <p className='text-onSecondary text-[14px] md:text-[16px] mt-3'>{ condition.description }</p>
      </div>
    </div>
  )
}

export default ConditionCard