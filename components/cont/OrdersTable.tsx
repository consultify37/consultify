import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { formatDate } from '../../utils/formatDate'
import OrderCard from './OrderCard'
import { Order } from '../../types'
import ReactLoading from 'react-loading'
import OrderRow from './OrderRow'

const OrdersTable = () => {
  const { currentUser } = useAuthContext()
  const [orders, setOrders] = useState< Order[] >([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)

    try {
      const docsRef = query(collection(db, 'orders'), where('customer_email', '==', currentUser?.email), orderBy('createdAt', 'desc'))
      const docsSnap = await getDocs(docsRef)

      const orders: Order[] = docsSnap.docs.map((doc) => {
        const createdAt = formatDate(new Date(doc.data().createdAt.seconds*1000))

        return ({ ...doc.data(), id: doc.id, createdAt } as Order)
      })
      
      setOrders(orders)
    } catch (e) {
      toast.error('Ceva nu a mers bine. Reîmprospătează pagina.')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [currentUser])

  return (
    <div className='w-full lg:ml-12'>
      <h1 className='text-base mt-6 lg:mt-0 lg:text-[20px] font-bold text-secondary'>Istoric comenzi</h1>

      { !isLoading &&
        <div className='w-full flex lg:hidden flex-col'>
          { orders.map((order) => (
            <OrderCard 
              key={order.id}
              order={order}
            />
          )) }
        </div>
      }

      { !isLoading && orders.length == 0 &&
        <div className='h-[33vh] w-full flex items-center justify-center'>
          <p className='text-secondary font-bold sm:text-[20px]'>Nu ai făcut nicio comandă până acum.</p>
        </div>
      }

      <div className='hidden lg:block'>
        { !isLoading && orders.length != 0 &&
          <table className='mt-6 w-full'>
            <thead className='w-full'>
              <tr className='bg-[#EDF0FF] border-2 border-[#EDF0FF] w-full'>
                <th className='py-4 pl-4 text-start'>comanda</th>
                <th className='py-4 text-start'>data</th>
                <th className='py-4 text-start'>total</th>
                <th className='py-4 text-start'>status</th>
                <th className='py-4 text-start pr-4'></th>
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
        }
      </div>

      { isLoading &&
        <div className='h-[40vh] w-full flex items-center justify-center'>
          <ReactLoading type="spin" color="#8717F8" width={32} height={32} /> 
        </div>
      }
    </div>
  )
}

export default OrdersTable