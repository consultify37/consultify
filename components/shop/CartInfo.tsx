import Image from 'next/image'
import React from 'react'
import { getColorForWhyChoose } from '../../utils/getColorForWhyChoose'

const data = [
  { 
    title: 'Documente disponibile non stop!',
    svg: '/images/Shop/cart-info/time-twenty-four.svg' 
  },
  { 
    title: 'Plăți securizate!',
    svg: '/images/Shop/cart-info/shield-check.svg' 
  },
  { 
    title: 'Procedură simplă de folosire!',
    svg: '/images/Shop/cart-info/rocket-lunch.svg' 
  },
]

const CartInfo = () => {
  return (
    <div className='relative p-8 lg:p-12 py-12 lg:py-16 mt-12 lg:mt-24 bg-secondary rounded-[20px] lg:rounded-[35px] flex flex-col items-center'>
      <h1 className='text-[20px] lg:text-[35px] font-bold text-onSecondary '>La inspirely te bucuri de:</h1>

      <div className='flex flex-col lg:flex-row justify-between gap-16 mt-16 max-w-[960px] w-full'>
        <div className='flex flex-col items-center'>
          <div className='relative flex items-center justify-center h-[100px] w-[100px]'>
            <Image
              src={data[0].svg}
              width={128}
              height={128}
              alt='.'
              className='w-[39px] h-auto z-10'
            />

            <div className={`absolute h-full w-full inset-0 rounded-[20px] rotate-[20deg]`} style={{background: getColorForWhyChoose(0)[0]}}></div>
          </div>

          <p className='text-[16px] lg:text-[20px] font-semibold text-onSecondary mt-8 text-center'>{data[0].title}</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative flex items-center justify-center h-[100px] w-[100px]'>
            <Image
              src={data[1].svg}
              width={128}
              height={128}
              alt='.'
              className='w-[39px] h-auto z-10'
            />

            <div className={`absolute h-full w-full inset-0 rounded-[20px] rotate-[33deg]`} style={{background: getColorForWhyChoose(3)[0]}}></div>
          </div>

          <p className='text-[16px] lg:text-[20px] font-semibold text-onSecondary mt-8 text-center'>{data[1].title}</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative flex items-center justify-center h-[100px] w-[100px]'>
            <Image
              src={data[2].svg}
              width={128}
              height={128}
              alt='.'
              className='w-[39px] h-auto z-10'
            />

            <div className={`absolute h-full w-full inset-0 rounded-[20px] rotate-[-10deg]`} style={{background: getColorForWhyChoose(2)[0]}}></div>
          </div>

          <p className='text-[16px] lg:text-[20px] font-semibold text-onSecondary mt-8 text-center'>{data[2].title}</p>
        </div>
      </div>

      <Image 
        src='/images/Shop/cart-info/Polygon 6.svg'
        width={128}
        height={128}
        alt='.'
        className='absolute -top-12 -left-6 lg:-left-10 w-[90px] lg:w-[120px] h-auto'
      />
      <Image 
        src='/images/Shop/cart-info/Rectangle 392.svg'
        width={128}
        height={128}
        alt='.'
        className='absolute -bottom-8 lg:-bottom-16 -right-6 lg:-right-12 w-[90px] lg:w-[120px] h-auto'
      />
    </div>
  )
}

export default CartInfo