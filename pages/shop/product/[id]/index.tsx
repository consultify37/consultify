import Head from 'next/head'
import React from 'react'
import { Product } from '../../../../types'
import { NextPageContext } from 'next'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import Image from 'next/image'
import HowWorks from '../../../../components/shop/HowWorks'
import Reason from '../../../../components/shop/Reason'
import CuiIseAdreseaza from '../../../../components/programe/CuiIseAdreseaza'
import ProductCTA from '../../../../components/shop/ProductCTA'
import Faq from '../../../../components/programe/Faq'
import FeaturedProducts from '../../../../components/Home/Why-Us/FeaturedProducts'
import NewsLetter from '../../../../components/global/newsletter'
import HeartButton from '../../../../components/shop/HeartButton'
import Button from '../../../../components/shop/Button'
import { useCartContext } from '../../../../context/CartContext'
import FormatText2 from '../../../../utils/FormatText2'

const items = [
  {
    title: 'Adaugă Produsul în Coș', 
    description: '🛍️ Selectează produsul sau serviciul dorit din oferta noastră și adaugă-l în coșul de cumpărături. Poți verifica detaliile înainte de a continua.'
  },
  {
    title: 'Finalizează Plată', 
    description: '💳 După ce ai verificat coșul de cumpărături, finalizează procesul de plată. Introdu datele necesare și alege metoda de plată preferată. Plata este securizată și rapidă.'
  },
  {
    title: 'Primește Produsul', 
    description: '🎉 După confirmarea plății, vei primi produsul direct pe email și în contul tău de utilizator. Urmărește instrucțiunile din email pentru a accesa și utiliza produsul achiziționat.🙏🏻'
  }
]

type Props = {
  product: Product
  featuredProducts: Product[]
}

const ProductPage = ({ product, featuredProducts }: Props) => {
  const { handleAddProduct } = useCartContext()

  return (
    <>
      <Head>
				<title>{`Consultify | ${product.name}`}</title>
			</Head>

      <div className='pt-[140px] lg:pt-40 px-7 md:px-[80px] xl:px-[180px] 2xl:px-[276px] flex flex-col lg:flex-row items-center'>
        <Image 
          src={product.image.image}
          width={512}
          height={512}
          alt={product.name}
          className='w-full h-[320px] lg:max-w-[400px] lg:h-[360px] xl:max-w-[440px] xl:h-[400px] 2xl:max-w-[420px] 2xl:h-[460px] p-4 object-contain bg-[#F2F4FF] rounded-[22px] lg:mr-8 xl:mr-16'
        />

        <div className='flex flex-col self-start lg:self-center'>
          <h1 className='text-[24px] font-bold text-secondary mt-8 lg:mt-0 lg:text-[32px]'>{product.name}</h1>
          <FormatText2 
            text={product.description}
            className='text-[14px] text-secondary mt-2 lg:mt-4 lg:text-[16px]'
          />
          {/* <p className='text-[14px] text-secondary mt-2 lg:mt-4 lg:text-[16px]'>{ product.description}</p> */}
          <div className='flex flex-row items-center mt-4 lg:mt-6'>
            <p className='text-[24px] lg:text-[36px] font-bold text-price mr-2' >{ product.price } lei</p>
            { product.onSale &&
              <p className="text-[#7C9EF8] text-[14px] lg:text-[16px] font-base opacity-90 line-through font-semibold">
                {product.oldPrice} lei
              </p>
            }
          </div>
          <div className='flex flex-row items-center mt-4'>
            <Button 
              onClick={() => handleAddProduct(product) }
            />

            <HeartButton 
              product={product}
            />
          </div>
        </div>
      </div>

      <div className='px-7 md:px-[80px] xl:px-[180px] 2xl:px-[276px] flex flex-col items-center'>
        <p className='text-[18px] font-bold text-secondary mt-8 lg:mt-16 lg:text-[32px] self-start mb-2 lg:mb-6'>Descrierea produsului:</p>
        <FormatText2 
          className='text-[14px] text-secondary lg:text-[16px] self-start pt-1 lg:pt-[6px]'
          text={product.description2}
        />
        {/* <p className='text-[14px] text-secondary mt-2 lg:mt-6 lg:text-[16px] self-start mb-8 lg:mb-16'>{ product.description2 }</p> */}
        <div className='mb-8 lg:mb-16'></div>
        <HowWorks 
          items={items}
          title='Cum funcționează?'
          buttonTitle='Adaugă în coș'
          buttonAction={() => handleAddProduct(product)}
        />

        <p className='text-[18px] font-bold text-secondary mt-8 lg:mt-16 lg:text-[32px] self-start'>De ce să alegi produsul?</p>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-4 lg:mt-6 -mb-8 lg:mb-0'>
          <div className='flex flex-col'>
            { product.reasons.slice(0, Math.floor(product.reasons.length/2)).map((reason, index) => (
              <Reason 
                key={index}
                index={index}
                reason={reason}
              />
            )) }
          </div>
          <div className='flex flex-col'>
            { product.reasons.slice(Math.floor(product.reasons.length/2)).map((reason, index) => (
              <Reason 
                key={index}
                index={index+Math.floor(product.reasons.length/2)}
                reason={reason}
              />
            )) }
          </div>
        </div>

        <CuiIseAdreseaza title={product.title3} description={product.description3}  />

      </div>

      <div className='px-7 md:px-[80px] lg:px-0'>
        <ProductCTA 
          product={product}
        />
      </div>

      <div className='px-7 md:px-[80px] xl:px-[180px] 2xl:px-[276px] flex flex-col items-center'>
        <Faq
          faqs={product.faqs}
        />
      </div>

      <FeaturedProducts 
        products={featuredProducts}
        title='Alți clienți au vizionat și următoarele produse:'
      />

      <NewsLetter headingText={'Oferte și noutăți direct în inbox-ul tău: Abonează-te acum!'} />
    </>
  )
}

export default ProductPage

export const getServerSideProps = async (context: NextPageContext) => {

  const id = context.query.id as string
  const productSnap = await  getDoc(doc(db, 'products', id))

  if (!productSnap.exists()) {
    return {
      notFound: true
    }
  }

  const product = { id: productSnap.id, ...productSnap.data(), lastUpdated: null }

  const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(7))
	const collectionSnap = await getDocs(collectionRef)
	
	const products: Product[] = collectionSnap.docs.map((doc) => {
		const { lastUpdated, ...data } = doc.data()

		return ({ id: doc.id, ...data } as Product)
	})

  return { props: { product, featuredProducts: products }}
}