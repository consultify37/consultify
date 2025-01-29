import React, { useCallback } from 'react'

type Props = {
  items: {
    handle?: string
    name: string
    image: string
    price: number
    quantity?: number
  }[]
}

const TotalPriceContainer = ({ items }: Props) => {
  const totalPrice = useCallback(() => {
    return items.reduce((prev, curr) => (prev+curr.price), 0)
  }, [items])
  return (
    <div className='bg-[#ebebeb] rounded-lg p-4 w-full text-sm mt-6 space-y-2'>
      <div className='flex w-full items-center justify-between'>
        <p>Subtotal</p>
        <p className='font-bold'>{items[0].price}lei</p>
      </div>
      <div className='flex w-full items-center justify-between'>
        <p>Transport</p>
        <p className='font-bold'>0lei</p>
      </div>
      { items.filter((item) => item.handle != 'agenda-start-up').map((item) => (
        <div key={item.name} className='flex w-full items-center justify-between'>
          <p>{item.name}</p>
          <p className='font-bold'>{item.price}lei</p>
        </div>
      ))}
      <div className='flex w-full items-center justify-between pt-4 border-t border-[#c8c8c8]'>
        <p className='font-bold text-base'>Total</p>
        <p className='font-bold text-[17px]'>{totalPrice()}lei</p>
      </div>
    </div>
  )
}

export default TotalPriceContainer