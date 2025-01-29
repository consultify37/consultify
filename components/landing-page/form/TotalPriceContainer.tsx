import React, { useCallback } from 'react'

type Props = {
  items: {
    handle?: string
    name: string
    image: string
    price: number
    quantity?: number
  }[]
  discountCode: string | null
}

const TotalPriceContainer = ({ items, discountCode }: Props) => {
  const subTotal = useCallback(() => {
    return items.reduce((prev, curr) => (prev+curr.price*100), 0)
  }, [items])()

  const discount = discountCode ? Math.round(subTotal*0.05) : 0
  const total = (subTotal - discount)/100

  return (
    <div className='bg-[#ebebeb] rounded-lg p-4 w-full text-sm mt-6 space-y-2'>
      <div className='flex w-full items-center justify-between'>
        <p>Subtotal</p>
        <p className='font-bold'>{items.find((item) => item.handle == 'agenda-start-up')?.price}lei</p>
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
      { discountCode && 
        <div className='flex w-full items-center justify-between'>
          <p>Discount 5% 🏷️</p>
          <p className='font-bold'>-{discount/100}lei</p>
        </div>
      }
      <div className='flex w-full items-center justify-between pt-4 border-t border-[#c8c8c8]'>
        <p className='font-bold text-base'>Total</p>
        <p className='font-bold text-[17px]'>{total}lei</p>
      </div>
    </div>
  )
}

export default TotalPriceContainer