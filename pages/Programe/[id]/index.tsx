import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import PriceCTA from '../../../components/programe/PriceCTA'
import CuiIseAdreseaza from '../../../components/programe/CuiIseAdreseaza'
import Conditions from '../../../components/programe/Conditions'
import WhyUs from '../../../components/programe/WhyUs'
import Faq from '../../../components/programe/Faq'
import CTA from '../../../components/programe/CTA'
import NewsLetter from '../../../components/global/newsletter'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Article, Product, Program } from '../../../types'
import FormatText from '../../../utils/FormatText'
import News from '../../../components/Home/News/News'
import FeaturedProducts from '../../../components/Home/Why-Us/FeaturedProducts'
import { formatDate } from '../../../utils/formatDate'

type Props = {
  program: Program
  products: Product[]
  articles: Article[]
}

const ProgramPage = ({ program, products, articles }: Props) => {
  return (
    <>
      <Head>
          <title>{`${process.env.SITE} | ${program.title2}`}</title>
      </Head>
      <section className="flex flex-col w-full pt-[140px] md:pt-40 pb-20 items-center px-7 md:px-[110px] xl:px-[160px] 2xl:px-[276px]">
        <Image 
          src={program.imaginePrincipala.image}
          height={363}
          width={1066}
          alt='Imagine fonduri'
          className='w-full h-auto rounded-3xl md:rounded-[38px]'
        />

        <h1 className='text-primary text-[28px] md:text-[35px] font-extrabold pt-10 text-center'>
          { program.title2 }
        </h1>

        <div className='flex flex-col w-full items-center mt-10 px-2 md:px-12'>
          <FormatText text={program.descriere} className='text-[13px] md:text-[16px] text-[#393939] text-justify' />
          <PriceCTA suma={program.suma2} />
          <CuiIseAdreseaza title={program.title3} description={program.descriere3}  />
          <Conditions conditions={program.conditions} />
        </div>
        <WhyUs />
        <Faq faqs={program.faqs} />
        <CTA
          title="Transformă-ți ideile în realitate prin <purple>fonduri europene!<purple>"
          linkText="Completează formularul!"
          linkHref="/contact"
        />
      </section>
      <FeaturedProducts 
        products={products}
      />
      <News
        articles={articles}
      />
      <NewsLetter headingText={'Fii la curent cu cele mai recente informații despre fonduri europene!'} />
    </>
  )
}

export default ProgramPage

export const getStaticPaths = async () => {
  const programeRef = query(collection(db, 'programe-fonduri'), where('site', '==', process.env.SITE))
  const programeSnap = await getDocs(programeRef)

  const paths = programeSnap.docs.map((doc) => ({ params: { id: doc.id }}))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const programSnap = await  getDoc(doc(db, 'programe-fonduri', id))
  const program = { id: programSnap.id, ...programSnap.data() }

  const articlesSnap = await  getDocs(query(collection(db, 'articles'), where('active', '==', true), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(8)))
    var articles = articlesSnap.docs.map((doc) => {
        const { lastUpdated, createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })
    
    const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(8))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => {
      const { lastUpdated, ...data } = doc.data()
  
      return ({ id: doc.id, ...data } as Product)
    })

  return { 
    props: { program, articles, products }, 
    revalidate: Number(process.env.REVALIDATE )
  }
}