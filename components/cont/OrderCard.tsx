import React from 'react'
import { Order } from '../../types'
import Link from 'next/link'

type Props = {
  order: Order
}

const OrderCard = ({ order }: Props) => {
  const total = order.line_items.data.reduce((prev, curr) => (prev + curr.amount_total/100), 0)

  return (
    <div className='w-full border-2 rounded-[12px] border-[#EDF0FF] p-6 mt-6 flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-[14px] font-semibold text-secondary'>comanda</p>
        <p className='text-[14px] font-semibold text-secondary'>{order.id}</p>
      </div>

      <div className='flex flex-row items-center justify-between mt-3'>
        <p className='text-[14px] font-semibold text-secondary'>data</p>
        <p className='text-[14px] font-semibold text-secondary'>{order.createdAt}</p>
      </div>

      <div className='flex flex-row items-center justify-between mt-3'>
        <p className='text-[14px] font-semibold text-secondary'>total</p>
        <p className='text-[14px] font-semibold text-secondary'>{Math.round(total*100)/100} lei</p>
      </div>

      <div className='flex flex-row items-center justify-between mt-3 mb-4'>
        <p className='text-[14px] font-semibold text-secondary'>status</p>
        <p className='text-[14px] font-semibold text-[#04D200]'>confirmată</p>
      </div>

      <Link
        href={`/cont/comenzi/${order.id}`}
        className='text-[14px] font-semibold text-blue-600 underline underline-offset-1 self-center'
      >
        vezi detalii comandă
      </Link>
    </div>
  )
}

export default OrderCard