import React from 'react'
import { Product } from '../../../types'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import toast from 'react-hot-toast'
import { deleteFile } from '../../../utils/b2_storage/delete_file'
import OrderRow from './OrderRow'

type Props = {
  orders: any[]
  setOrders: React.Dispatch<React.SetStateAction<Product[]>>
}

const OrdersTable = ({ orders, setOrders }: Props) => {
  return (
    <div>
      <table className='w-full mt-3 text-left border-separate border-spacing-y-5'>
        <thead className='bg-admin-header'>
          <tr>
            <th className='pl-8 py-4 rounded-s-lg'>Nume client</th>
            <th className='py-4'>Id Tranzacție</th>
            <th className='py-4'>Adresă</th>
            <th className='py-4'>Status</th>
            <th className='py-4 rounded-e-lg'></th>
          </tr> 
        </thead>
        <tbody className=''>
          { orders.map((order) => (
            <OrderRow 
              key={order.id}
              order={order}
            />
          )) }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable