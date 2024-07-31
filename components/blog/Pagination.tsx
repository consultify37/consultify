import React, { MouseEventHandler } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import ReactLoading from 'react-loading'

type Props = {
  next: MouseEventHandler<HTMLButtonElement>
  previous: MouseEventHandler<HTMLButtonElement>
  page: number
  lastPage: boolean
  isLoading?: boolean
}

const Pagination = ({ page, lastPage, next, previous, isLoading=false }: Props) => {
  return (
    <div className='w-full flex mt-6 md:mt-12 items-center justify-center'>
      <div className='relative w-fit flex items-center justify-center gap-2'>
        { page == 1 ?
          <RiArrowLeftSLine size={24} className='text-[#CDCDCD]' /> :
          <button onClick={previous} className='cursor-pointer hover:scale-105 transition-all'>
            <RiArrowLeftSLine size={24} className='text-secondary' />
          </button>
        }
        <p className='bg-secondary text-white h-8 w-8 rounded-full flex items-center justify-center'>{page}</p>
        {
          lastPage ?
          <RiArrowRightSLine size={24} className='text-[#CDCDCD]' /> :
          <button onClick={next} className='cursor-pointer hover:scale-105 transition-all'>
            <RiArrowRightSLine size={24} className='text-secondary' />
          </button>
        }
        
        { isLoading &&
          <div className='absolute -right-8'>
            <ReactLoading type="spin" color="#8717F8" width={20} height={20} />
          </div>
        }
      </div>
    </div>
  )
}

export default Pagination