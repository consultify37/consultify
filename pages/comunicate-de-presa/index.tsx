/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsLetter from "../../components/global/newsletter"
import Head from "next/head"
import TabsComponent from "../../components/TabsComponent"
import PageHeader from "../../components/Header/PageHeader"
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { db } from "../../firebase"
import { formatDate } from "../../utils/formatDate"
import { Article, ArticleCategory, PressRealease, Product } from "../../types"
import LatestReleases from "../../components/press/LatestReleases"
import Pagination from "../../components/blog/Pagination"
import FeaturedProducts from "../../components/Home/Why-Us/FeaturedProducts"
import ReleaseComponent from "../../components/press/RealeaseComponent"
import CTA from "../../components/CTA"
import News from "../../components/Home/News/News"

type Props = {
  articles: Article[]
  categories: ArticleCategory[]
  products: Product[]
  releases: PressRealease[]
}

let articlesPerPage = 9

export default function Testimoniale({ articles, categories, products, releases: initialReleases }: Props) {
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const [selectedCategory, setSelectedCategory] = useState<string>('toate')
    const [releases, setReleases] = useState< any[] >(initialReleases)
    console.log(releases)

    const next = async () => {
        setIsLoading(true)

        let collectionRef
        if (selectedCategory == 'toate') {
            collectionRef = query(collection(db, 'press-releases'), orderBy('index', 'desc'), startAfter(articles[articles.length-1].index), limit(articlesPerPage))
        } else {
            collectionRef = query(collection(db, 'press-releases'), orderBy('index', 'desc'), startAfter(articles[articles.length-1].index), where('category', '==', selectedCategory), limit(articlesPerPage))
        }

        const collectionSnap = await getDocs(collectionRef)
        
        const newArticles: Article[] = collectionSnap.docs.map((doc) => (
          { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...doc.data() } as Article
        ))
    
        const lastArticleRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), limit(1))
        const lastArticle = await getDocs(lastArticleRef)
    
        if ( newArticles.length != 0 && !lastArticle.empty ) {
          setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
        }
        
        setReleases(newArticles)
        setPage(page+1)
        window.scrollTo({top: 800, behavior: 'instant'})
        setIsLoading(false)
      }
    
      const previous = async () => {
        setIsLoading(true)

        let collectionRef
        if (selectedCategory == 'toate' ) {
            collectionRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), startAfter(articles[0].index), limit(articlesPerPage))
        } else {
            collectionRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), startAfter(articles[0].index), where('category', '==', selectedCategory), limit(articlesPerPage))
        }
    
        const collectionSnap = await getDocs(collectionRef)
        
        const newArticles: Article[] = collectionSnap.docs.map((doc) => (
          { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...doc.data() } as Article
        ))
    
        const lastArticleRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), limit(1))
        const lastArticle = await getDocs(lastArticleRef)
    
        if ( newArticles.length != 0 && !lastArticle.empty ) {
          setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
        }
        
        setReleases(newArticles.reverse())
        setPage(page-1)
        window.scrollTo({top: 800, behavior: 'instant'})
    
        setIsLoading(false)
      }

    const fetchArticles = async () => {
        setPage(1)

        let ref
        let lastArticleRef
        console.log(selectedCategory)
        if ( selectedCategory == 'toate' ) {
            ref = query(collection(db, 'press-releases'), orderBy('createdAt', 'desc'), limit(articlesPerPage))
            lastArticleRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), limit(1))
        } else {
            ref = query(collection(db, 'press-releases'), orderBy('createdAt', 'desc'), where('category', '==', selectedCategory), limit(articlesPerPage))
            lastArticleRef = query(collection(db, 'press-releases'), orderBy('index', 'asc'), where('category', '==', selectedCategory), limit(1))
        }

        const articlesSnap = await getDocs(ref)

        const newArticles = articlesSnap.docs.map((doc) => {
            const { lastUpdated, createdAt, ...data } = doc.data()
            return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
        })

        const lastArticle = await getDocs(lastArticleRef)

        if ( articles.length != 0 && !lastArticle.empty ) {
            setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
        }
        console.log(newArticles)
        setReleases(newArticles)
    } 

    useEffect(() => {
        fetchArticles()
    }, [selectedCategory])

  return (
    <>
        <Head>
            <title>{`${process.env.SITE} | Comunicate de presă`}</title>
        </Head>
        <PageHeader 
            title="Comunicate de presă"
        >
            <Image
                src="/images/blog/Ellipse 19.svg"
                alt="."
                width={100}
                height={200}
                className="absolute top-7 -left-2 md:bottom-5 md:left-0 w-[230px] md:w-[260px] lg:w-[290px] xl:w-[320px]"
            />
            <Image
                src="/images/blog/Polygon 3.svg"
                width={130}
                height={130}
                className="absolute right-0 top-16 md:top-20 z-[5] w-[80px] lg:w-[105px] xl:w-[120px]"
                alt="."
            />
        </PageHeader>

        <LatestReleases
            releases={initialReleases}
        />
        
        <section className="flex flex-col gap-5 w-full items-stretch justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] mt-12 md:mt-12">
                { categories.length >= 2 ?
                  <TabsComponent 
                    values={['toate', ...categories.map((category => category.category))]}
                    setSelectedValue={setSelectedCategory}
                /> : <div className="-mt-2 md:-mt-8"></div>
                }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 mt-4 md:mt-12 px-1'>
                {
                    releases.map(item =>
                        <ReleaseComponent 
                          key={item.id}
                          release={item}
                        />              
                    )
                }

            </div>

            <Pagination 
                lastPage={isLastPage}
                next={next}
                previous={previous}
                page={page}
                isLoading={isLoading}
            />
            {/* <div className='mt-8 md:mt-12 flex items-center justify-center w-full gap-2'>
                <RiArrowLeftSLine size={24} onClick={() => {setPage(0); scrollTo({top: 800, behavior: 'instant'})}} className={`${page === 0 ? 'text-[#CDCDCD]' : 'text-[#260056]'} cursor-pointer`} />
                {
                    maxPages > 0 &&
                        Array.from({length: maxPages}, (_, i) =>
                            <p key={i} onClick={() => {setPage(i); scrollTo({top: 800, behavior: 'instant'})}} className={`${i === page ? 'bg-[#260056] text-white' : 'text-[#260056]'} cursor-pointer h-8 w-8 rounded-full flex items-center justify-center`}>{i+1}</p>
                        )
                }
                <RiArrowRightSLine size={24} onClick={() => {setPage(maxPages-1); scrollTo({top: 800, behavior: 'instant'})}} className={`${page === maxPages - 1 ? 'text-[#CDCDCD]' : 'text-[#260056]'} cursor-pointer`} />
            </div> */}
        </section>
        <div className="mt-20"></div>
        <CTA
          title="Acțiunea ta contează - Începe-ți <purple>proiectul<purple> de succes acum!"
          linkText="Completează formularul!"
          linkHref="/contact"
        />
        <FeaturedProducts 
            products={products}
            title="Crește eficiența și productivitatea cu serviciile și produsele digitale oferite de Consultify!"
        />
        <News 
          articles={articles}
        />
        <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
    </>
  )
}

export const getServerSideProps = async () => {
    const articlesSnap = await  getDocs(query(collection(db, 'articles'), orderBy('createdAt', 'desc'), limit(8)))
    const articles = articlesSnap.docs.map((doc) => {
        const { lastUpdated, createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })

    const releaseSnap = await  getDocs(query(collection(db, 'press-releases'), orderBy('createdAt', 'desc'), limit(9)))
    const releases = releaseSnap.docs.map((doc) => {
        const { createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })
  
    const docsRef = query(collection(db, 'press-categories'))
    const docsSnap = await getDocs(docsRef)
  
    const categories = docsSnap.docs.map(doc => ( { id: doc.id, ...doc.data()} ))

    const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(8))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => {
      const { lastUpdated, ...data } = doc.data()
  
      return ({ id: doc.id, ...data } as Product)
    })
  
    return { props: { articles, releases, categories, products }}
  }