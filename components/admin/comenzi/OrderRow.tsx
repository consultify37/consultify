import Link from 'next/link'
import React from 'react'

type Props = {
  order: any
}

const OrderRow = ({ order }: Props) => {
  return (
    <tr className='bg-admin-card'>
      <td className='py-4 font-bold text-secondary pl-8 rounded-s-lg'>{order.name}</td>
      <td className='py-4 font-bold text-secondary' >{ order.paymentIntentId }</td>
      <td className='py-4 font-bold text-secondary' >{ `${order.shipping.line1}, ${order.shipping.line2 ? order.shipping.line2 + ', ' : ''}${order.shipping.city}...` }</td>
      <td className='py-4 font-bold' style={{color: order.fullfilled ? '#04D200' : '#FFCC00'}} >{ order.fullfilled ? 'fullfilled' : 'în așteptare' }</td>
      <td className='rounded-e-lg'>
        <div className='flex flex-row items-center'>
          <Link
            href={`/admin/comenzi-shop-fizic/edit/${order.id}`}
            className='bg-[#EAEDFF] rounded-lg p-2 px-4 mr-2 hover:scale-105 transition-all'
          >
            <p className='text-[16px] font-semibold text-secondary'>detalii comandă</p>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default OrderRow