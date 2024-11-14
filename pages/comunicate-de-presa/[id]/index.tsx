import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import Head from 'next/head'
import React from 'react'
import { db } from '../../../firebase'
import { formatDate } from '../../../utils/formatDate'
import { Article, PressRealease, Product } from '../../../types'
import Link from 'next/link'
import Image from 'next/image'
import CTA from '../../../components/CTA'
import FeaturedProducts from '../../../components/Home/Why-Us/FeaturedProducts'
import News from '../../../components/Home/News/News'
import NewsLetter from '../../../components/global/newsletter'
import ReactLoading from 'react-loading'
import { theme } from '../../../utils/theme'

type Props = {
  release: PressRealease
  articles: Article[]
  products: Product[]
}

const Comunicat = ({ release, articles, products }: Props) => {
  return (
    <>
      <Head>
          <title>{`${process.env.SITE} | ${release.title}`}</title>
      </Head>
      <section className="flex flex-col w-full pt-[156px] md:pt-44 md:pb-10 items-center md:px-[110px] xl:px-[160px] 2xl:px-[276px]">
        <div className='flex flex-col gap-2 items-center px-7'>
          <p className='text-secondary lg:text-2xl font-semibold'>Comunicate de presă</p>
          <p className='text-primary text-sm lg:text-base font-semibold'>{ release.category }</p>
          <p className='text-secondary text-lg lg:text-4xl text-center font-semibold'>{ release.title }</p>
        </div>
        
        <div className='flex flex-col sm:flex-row items-center justify-between mt-10 md:mt-16 mb-4 w-full'>
          <div className='flex flex-row gap-4'>
            <Link 
              href={release.file.url}
              download
              target='_blank'
              className='text-sm lg:text-base p-2 px-8 text-secondary rounded-full font-semibold border-primary border-2 hover:scale-105 transition-all'
            >
              Descarcă
            </Link>
            <Link 
              href='https://wa.link/0a4lnx'
              className='text-sm lg:text-base p-2 px-8 text-white rounded-full font-semibold bg-primary border-primary border-2 hover:scale-105 transition-all'
            >
              Vreau și eu
            </Link>
          </div>

          <div className='hidden md:flex flex-row gap-4 mt-4 sm:mt-0'>
            <Link href='https://www.facebook.com/consultify.ro' target="_blank">
                <Image
                    src="/images/contact/facebook.svg"
                    alt="facebook"
                    width={60}
                    height={60}
                    className="z-[5] w-[30px] h-[30px]"
                />
            </Link>

            <Link href='https://www.instagram.com/consultify.ro?igshid=MzMyNGUyNmU2YQ%3D%3D' target="_blank">
                <Image
                    src="/images/contact/instagram.svg"
                    alt="instagram"
                    width={60}
                    height={60}
                    className="z-[5] w-[30px] h-[30px]"
                />
            </Link>

            <Link href='https://www.tiktok.com/@consultify.ro?_t=8oJfgBL3I01&_r=1' target="_blank">
                <Image
                    src="/images/contact/tiktok.svg"
                    alt="tiktok"
                    width={60}
                    height={60}
                    className="z-[5] w-[30px] h-[30px]"
                />
            </Link>
        </div>
        </div>
        <iframe 
          src={release.file.url}
          width="100%" 
          height="100%"
          loading='eager'
          className='hidden sm:block w-full h-[645px] sm:h-[700px] md:h-800px lg:h-[900px] xl:h-[1000px] 2xl:h-[1100px]'
        />

        <div className='relative sm:hidden w-full h-[645px] sm:h-[700px] md:h-800px lg:h-[900px] xl:h-[1000px] 2xl:h-[1100px]'>
          <div className='absolute my-auto top-[25%] bottom-[50%] -z-10 flex flex-col items-center'>
            <ReactLoading width={22} height={22} type="spin" color={theme.primary} />
            <p className='text-center px-7 p-2 text-[15px] text-black text-opacity-[67%]'>Dacă timpul de încărcare depașește 3 secunde, reîncarcați pagina sau utilizați butonul {`"Descarcă"`}.</p>
          </div>
          <iframe 
            src={`https://docs.google.com/gview?url=${release.file.url}&embedded=true`}
            width="100%" 
            height="100%"
            className='w-full'
            onLoad={() => console.log('loaded')}
          />
        </div>
      </section>
      
      <CTA
        title="Aplică acum și transformă-ți proiectele în <purple>realitate<purple> cu Consultify!"
        linkText="Completează formularul!"
        linkHref="/contact"
      />
      <FeaturedProducts 
          products={products}
          title="Optimizează-ți afacerea cu ajutorul soluțiilor digitale propuse de Consultify!"
      />
      <News
        articles={articles}
        title='Explorează tendințele actuale din lumea antreprenoriatului și nu numai:'
      />
      <NewsLetter headingText={'Abonează-te la newsletter pentru informații actualizate despre afaceri!'} />
    </>
  )
}

export default Comunicat

export const getStaticPaths = async () => {
  const articlesRef = collection(db, 'press-releases')
  const articlesSnap = await getDocs(articlesRef)

  const paths = articlesSnap.docs.map((doc) => ({ params: { id: doc.id }}))
  return {
      paths,
      fallback: 'blocking'
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const releaseSnap = await  getDoc(doc(db, 'press-releases', id))
  if ( !releaseSnap.exists() ) {
    return { notFound: true }
  }

  const { createdAt, ...data } = releaseSnap.data()
  const release = { id: releaseSnap.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }

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
    props: { release, articles, products }, 
    revalidate: Number(process.env.REVALIDATE )
  }
}