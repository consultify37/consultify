import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
  setItems: React.Dispatch<React.SetStateAction<{
    handle?: string
    name: string
    price: number
    image: string
    merchandiseId: string
    quantity?: number
  }[]>>
}

const ProductElementForm = ({ setItems}: Props) => {
  const [selected, setSelected] = useState(1)
  const handleClick = (newQuantity: number) => {
    setSelected(newQuantity)
    setItems((items) => {
      return items.map((item) => {
        if (item.handle == 'agenda-start-up') {
          if (newQuantity == 1) {
            return ({
              handle: 'agenda-start-up',
              name: 'FLASHCARDS START UP NATION + SEDINTA CONSULTANTA',
              merchandiseId: "gid://shopify/ProductVariant/54299416691032",
              price: 89,
              image: '/landing-page/images/1.png',
              quantity: 1
            })
          } else {
            return ({
              handle: 'agenda-start-up',
              name: 'FLASHCARDS START UP NATION + SEDINTA CONSULTANTA',
              merchandiseId: "gid://shopify/ProductVariant/54299416691032",
              price: 178,
              image: '/landing-page/images/2.png',
              quantity: 2
            })
          }
        } else {
          return item
        }
      })
    })
  }
  return (
    <>
      <div onClick={() => handleClick(1)} className={`flex mt-8 p-4 hover:cursor-pointer border-2 rounded-md items-center gap-x-2 w-full justify-between ${selected == 1 ? 'border-secondary bg-admin-background' : 'border-[#E4E4E4]'}`}>
        <Image 
          src="/landing-page/images/1.png"
          width={256}
          height={256}
          alt='Consultanta Start-Up Nation'
          className='w-16 h-16 rounded-md objec-cover'
        />
        <p className='font-bold text-xs'>1x FLASHCARDS START UP NATION + Ședință de consultanță</p>
        <div className='flex flex-col items-end'>
          <p className='font-bold'>89lei</p>
          <p className='font-bold text-[#E4E4E4] line-through text-sm'>199lei</p>
        </div>
      </div>
      <p className='py-4 font-bold self-center text-center text-[15px]'> 🤝 Începeți afacerea cu un prieten! 🚀</p>
      <div onClick={() => handleClick(2)} className={`flex hover:cursor-pointer p-4 border-2 rounded-md items-center gap-x-2 w-full justify-between ${selected == 2 ? 'border-secondary bg-admin-background' : 'border-[#E4E4E4]'}`}>
        <Image 
          src="/landing-page/images/2.png"
          width={256}
          height={256}
          alt='Consultanta Start-Up Nation'
          className='w-16 h-16 rounded-md object-cover'
        />
        <div>
          <p className='font-bold text-xs'>2x FLASHCARDS START UP NATION + 2x Ședințe de consultanță</p>
          {/* <div className='p-1 px-2 rounded-md bg-green-500 text-xs text-white font-semibold w-fit'>
            Salvezi 15lei
          </div> */}
        </div>
        <div className='flex flex-col items-end'>
          <p className='font-bold'>178lei</p>
          <p className='font-bold text-[#E4E4E4] line-through text-sm'>398lei</p>
        </div>
      </div>
    </>
  )
}

export default ProductElementForm