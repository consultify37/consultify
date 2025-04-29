import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Product } from '../../../types'
import OrdersTable from '../../../components/admin/comenzi/OrdersTable'
import Header from '../../../components/admin/comenzi/Header'

type Props = {
  categories: string[]
}

const Products = ({ }: Props) => {
  const [orders, setOrders] = useState< any[] >([])

  const fetchOrders = async () => {
    const collectionRef = query(collection(db, 'physicalOrders'), orderBy('created', 'desc'))
    const collectionSnap = await getDocs(collectionRef)
    
    const orders: any[] = collectionSnap.docs.map((doc) => (
      { id: doc.id, ...doc.data() }
    ))

    setOrders(orders)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  console.log(orders)

  return (
    <AdminLayout>
      <Header />

      <OrdersTable 
        orders={orders}
        setOrders={setOrders}
      />
    </AdminLayout>
  )
}

export default Products