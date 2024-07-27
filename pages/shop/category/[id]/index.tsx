import React from 'react'
import { Product, ProductCategory } from '../../../../types'
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import Head from 'next/head'
import CategoryHeader from '../../../../components/shop/CategoryHeader'
import ProductList from '../../../../components/shop/ProductList'
import NewsLetter from '../../../../components/global/newsletter'

type Props = {
  category: ProductCategory
  products: Product[]
}

const CategoryPage = ({ category, products }: Props) => {
  return (
    <>
      <Head>
				<title>{`Consultify | ${category.category}`}</title>
			</Head>

      <div className='pt-[140px] lg:pt-40 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] min-h-screen'>
        <CategoryHeader 
          category={category}
        />
        
        <ProductList 
          products={products}
        />
      </div>

      <NewsLetter 
        headingText='Abonează-te la newsletter! Rămâi la curent cu cele mai bune oferte!'
      />
    </>
  )
}

export default CategoryPage


export const getServerSideProps = async (context: any) => {
  const id = context.params.id

  const categorySnap = await getDoc(doc(db, 'product-categories', id))

  throw 'salut'

  if ( !categorySnap.exists() ) {
    return {
      notFound: true
    }
  }
  
  const category = { id: categorySnap.id, ...categorySnap.data() } as ProductCategory
  
	const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('category', '==', category.category), orderBy('lastUpdated', 'desc'))
	const collectionSnap = await getDocs(collectionRef)
	
	const products: Product[] = collectionSnap.docs.map((doc) => {
		const { lastUpdated, ...data } = doc.data()
		return ({ id: doc.id, lastUpdated: lastUpdated.seconds, ...data } as Product)
	})

  return { props: { category, products }}
}