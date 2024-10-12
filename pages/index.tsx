import React from "react"
import Head from "next/head"
import HomeHeader from "../components/Home/HomeHeader"
import AboutHome from "../components/Home/About/About"
import TrustSRL from "../components/Home/Trust"
import OurClients from "../components/Home/OurClients/OurClients"
import CarouselPrograme from "../components/fonduri/index"
import Rezultate from "../components/Rezultate"
import Proces from "../components/Proces"
import CTA from "../components/CTA"
import NewsLetter from "../components/global/newsletter"
import Garantii from "../components/Garantii"
import { Article, Product, Program, Slide } from "../types"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { formatDate } from "../utils/formatDate"
import News from "../components/Home/News/News"
import FeaturedProducts from "../components/Home/Why-Us/FeaturedProducts"

type Props = {
  programe: Program[]
  slides: Slide[]
  products: Product[]
  articles: Article[]
}

export default function Home({ slides, programe, articles, products }: Props) {
  return (
    <> 
      {/* pageSettings */}
      <Head>
        <title>Consultify | Acasă</title>
      </Head>
      <HomeHeader slides={slides} />
      <TrustSRL />
      <AboutHome />
      <CarouselPrograme programe={programe} />
      <Rezultate />
      <Garantii />
      <div id="proces"></div>
      <Proces />
      <div className="mt-16 md:mt-32 px-0 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
        <OurClients hasTitle={true} />
      </div>
      <CTA
        title="Acțiunea ta contează - Începe-ți <purple>proiectul<purple> de succes acum!"
        linkText="Completează formularul!"
        linkHref="/contact"
      />
      <FeaturedProducts 
        products={products}
      />
      <News 
        articles={articles}
      />
      <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
    </>
  )
}

export const getStaticProps = async () => {
  const slidesRef = query(collection(db, 'slides-homepage'), where('site', '==', process.env.SITE))
  const slidesSnap = await getDocs(slidesRef)

  const slides = slidesSnap.docs.map((doc) => (
    { id: doc.id, ...doc.data() }
  ))

  const programeRef = query(collection(db, 'programe-fonduri'), where('site', '==', process.env.SITE))
  const programeSnap = await getDocs(programeRef)

  const programe = programeSnap.docs.map((doc) => (
    { id: doc.id, ...doc.data() }
  ))

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
    props: { programe, slides, products, articles },
    revalidate: Number(process.env.REVALIDATE)
  }
}
