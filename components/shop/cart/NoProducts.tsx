import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NoProducts = () => {
  return (
    <div className="p-8 py-16 border-2 border-[#F2F4FF] rounded-[10px] mt-8 lg:mt-12 flex flex-col items-center">
      <Image 
        src='/images/Shop/cart.svg'
        width={512}
        height={512}
        alt='.'
        className="w-full max-w-[300px] h-auto px-8"
      />

      <p className="text-secondary text-[18px] lg:text-[32px] font-semibold mt-8">Nu ai produse în coș!</p>
      <div className="flex flex-col lg:flex-row mt-8 lg:mt-6 items-center lg:items-start">
        <p className="text-secondary text-[14px] lg:text-[18px] font-semibold mr-[5px]">Pentru a adăuga produse in coș te rugăm</p>
        <Link
          href='/shop'
          className="text-blue-600 underline underline-offset-1 text-[14px] lg:text-[18px]  font-semibold"
        >
          să te întorci la magazin.
        </Link>
      </div>
    </div>
  )
}

export default NoProducts