import Head from "next/head"
import React, { useState } from 'react'
import FeaturedProducts from "../../../components/Home/Why-Us/FeaturedProducts"
import { Product } from "../../../types"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import NewsLetter from "../../../components/global/newsletter"
import CartInfo from "../../../components/shop/CartInfo"
import { useCartContext } from "../../../context/CartContext"
import Products from "../../../components/shop/cart/Products"
import NoProducts from "../../../components/shop/cart/NoProducts"

type Props = {
  products: Product[]
}

const Cart = ({ products: featuredProducts }: Props) => {
  const { cart } = useCartContext()

  return (
    <>
      <Head>
				<title>Consultify | Coș de cumpărături</title>
			</Head>

      <div className="pt-[158px] lg:pt-48 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
        <h1 className='text-[18px] lg:text-[32px] font-bold text-secondary'>Coșul tău de produse</h1>

        { cart.length && cart.length != 0 ?
          <Products 
            products={cart}
          /> :
          <NoProducts />
        }
      </div>
      <FeaturedProducts 
        products={featuredProducts}
        title={cart.length && cart.length != 0 ? "Clienții noștri recomandă și următoarele produse:" : "Optimizează-ți afacerea cu ajutorul soluțiilor digitale propuse de Consultify!"}
      />

      <div className="px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
        <CartInfo />
      </div>

      <NewsLetter headingText={cart.length && cart.length != 0 ? 'Abonează-te la newsletter! Rămâi la curent cu cele mai bune oferte!' : 'Abonează-te la newsletter! Rămâi la curent cu cele mai bune oferte!'} />
    </>
  )
}

export default Cart

export const getServerSideProps = async () => {

  const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(7))
	const collectionSnap = await getDocs(collectionRef)
	
	const products: Product[] = collectionSnap.docs.map((doc) => {
		const { lastUpdated, ...data } = doc.data()

		return ({ id: doc.id, ...data } as Product)
	})

  return { props: { products }}
}