import React from 'react'
import { Order } from '../../types'
import Link from 'next/link'

type Props = {
  order: Order
}

const OrderRow = ({ order }: Props) => { 
  const total = order.line_items.data.reduce((prev, curr) => (prev + curr.amount_total/100), 0)
  
  return (
    <tr className='border-[#EDF0FF] border-2 w-full'>
      <td className='py-4 pl-4'>{order.id}</td>
      <td className='py-4'>{order.createdAt}</td>
      <td className='py-4'>{Math.round(total*100)/100} lei</td>
      <td className='py-4 text-[#04D200]'>confirmată</td>
      <td className='py-4 pr-4'>
        <Link
          href={`/cont/comenzi/${order.id}`}
          className='text-[14px] font-semibold text-blue-600 underline underline-offset-1 self-center'
        >
          vezi detalii comandă
        </Link>
      </td>
    </tr>
)}

export default OrderRow