import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import ProductsTable from '../../../components/admin/produse/ProductsTable'
import { Product } from '../../../types'
import Header from '../../../components/admin/produse/Header'

type Props = {
  categories: string[]
}

const Products = ({ categories }: Props) => {
  const [onlySales, setOnlySales] = useState(false)
  const [category, setCategory] = useState('Toate')
  const [products, setProducts] = useState< Product[] >([])

  const fetchProducts = async () => {
    const collectionRef = query(collection(db, 'products'), orderBy('lastUpdated', 'desc'))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => (
      { id: doc.id, price: doc.data().price , ...doc.data() } as Product
    ))

    setProducts(products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <AdminLayout>
      <Header
        categories={categories}
        category={category}
        onlySales={onlySales}
        setCategory={setCategory}
        setOnlySales={setOnlySales}
      />

      <ProductsTable 
        products={products}
        category={category}
        onlySales={onlySales}
        setProducts={setProducts}
      />
    </AdminLayout>
  )
}

export default Products

export const getServerSideProps = async () => {
  const docsRef = query(collection(db, 'product-categories'), where('site', '==', process.env.SITE))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( doc.data().category ))

  return { props: { categories }}
}