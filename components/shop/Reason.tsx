import React from 'react'
import { getColorForWhyChoose } from '../../utils/getColorForWhyChoose'

type Props = {
  index: number
  reason: string
}

const Reason = ({ index, reason }: Props) => {
  return (
    <div className='flex flex-row mt-2 lg:mt-4 items-start'>
      <div className={`w-[30px] min-w-[30px] h-[30px] lg:w-[32px] lg:min-w-[32px] lg:h-[32px] flex items-center justify-center rounded-full bg-[${getColorForWhyChoose(index)[0]}]`}>
        <p className={`text-[14px] lg:text-[16px] font-semibold text-[${getColorForWhyChoose(index)[1]}]`}>{ index + 1 }</p>
      </div>

      <p className='text-[14px] lg:text-[16px] font-semibold ml-3 lg:pr-2'>{ reason }</p>
    </div>
  )
}

export default Reason