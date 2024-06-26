/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsLetter from "../../components/global/newsletter"
import Head from "next/head"
import { PaginationBlog } from "../../utils/functions"
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import TabsComponent from "../../components/TabsComponent"
import PageHeader from "../../components/Header/PageHeader"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { formatDate } from "../../utils/formatDate"
import { Article, ArticleCategory, Product } from "../../types"
import FeaturedArticlesSection from "../../components/blog/FeaturedArticlesSection"
import FeaturedProducts from "../../components/Home/Why-Us/FeaturedProducts"

type Props = {
  articles: Article[]
  categories: ArticleCategory[]
  products: Product[]
}

export default function Testimoniale({ articles, categories, products }: Props) {
    const [page, setPage] = useState(0)
    let maxPages = Math.ceil(articles.length/9)
  
    const [selectedCategory, setSelectedCategory] = useState<string>('toate')
    const [filteredPosts, setFilteredPosts] = useState(articles)

    useEffect(() => {
        if (selectedCategory == 'toate') {
            setFilteredPosts(articles)
            return
        }

        let filteredData = articles.filter(article => article.category === selectedCategory)
        // filteredData = [...filteredData, ...filteredData, ...filteredData, ...filteredData, ...filteredData, ...filteredData, ...filteredData, ...filteredData, ...filteredData]
        setFilteredPosts(filteredData)
    }, [selectedCategory, articles])

  return (
    <>
        <Head>
            <title>{`${process.env.SITE} | Blog`}</title>
        </Head>
        <PageHeader 
            title="Află noutățile din business și nu numai"
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

        <FeaturedArticlesSection 
            articles={articles.filter((article) => article.featured).slice(0,8)}
        />
        
        <section className="flex flex-col gap-5 items-stretch justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] mt-12 md:mt-12">
                { categories.length >= 2 ?
                  <TabsComponent 
                    values={['toate', ...categories.map((category => category.category))]}
                    setSelectedValue={setSelectedCategory}
                /> : <div className="-mt-2 md:-mt-8"></div>
                }
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 gap-y-10 mt-4 md:mt-12 px-1'>
                {
                    PaginationBlog(filteredPosts, page, 9).map(item =>
                        <Link 
                            href={`/blog/${item.id}`}
                            key={item.id}
                        >
                            <article className='max-w-[350px] m-auto relative bg-[#F5F5F5] rounded-[16px] snap-center shadow-lg flex flex-col h-full'>
                                <Image src={item.mainImage.image} placeholder='blur' blurDataURL={item.mainImage.image} alt={item.title} width={300} height={300} className='w-full h-52 object-cover rounded-[20px_20px_0_0]'/>
                                <div className="p-2 pb-[10px] flex flex-col h-full">
                                  <div className="flex flex-row items-center">
                                    <Image 
                                      src='/images/blog/clock.svg'
                                      width={24}
                                      height={24}
                                      alt="clock svg"
                                      className="w-[18px] h-[18px] mr-2"
                                    />
                                    <p className="font-semibold text-secondary pt-[3px]">{item.duration}</p>
                                  </div>
                                  <h3 className='text-secondary font-bold text-base pt-2'>{item.title}</h3>
                                  <p className="text-secondary pt-2">{item.description}</p>
                                  <div className='flex items-center justify-between px-[2px] pt-2 mt-auto'>
                                      <p className='text-[#828282] text-sm'>{item.formattedCreatedAt}</p>
                                      <p className="text-primary font-bold text-sm underline hover:scale-105 transition-all">Citește mai mult</p>
                                  </div>
                                </div>
                            </article>   
                        </Link>                     
                    )
                }
            </div>
            <div className='mt-8 md:mt-12 flex items-center justify-center w-full gap-2'>
                <RiArrowLeftSLine size={24} onClick={() => setPage(0)} className={`${page === 0 ? 'text-[#CDCDCD]' : 'text-[#260056]'} cursor-pointer`} />
                {
                    maxPages > 0 &&
                        Array.from({length: maxPages}, (_, i) =>
                            <p key={i} onClick={() => setPage(i)} className={`${i === page ? 'bg-[#260056] text-white' : 'text-[#260056]'} cursor-pointer h-8 w-8 rounded-full flex items-center justify-center`}>{i+1}</p>
                        )
                }
                <RiArrowRightSLine size={24} onClick={() => setPage(maxPages-1)} className={`${page === maxPages - 1 ? 'text-[#CDCDCD]' : 'text-[#260056]'} cursor-pointer`} />
            </div>
        </section>
        {/* <FeaturedProducts 
            products={products}
        /> */}
      <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
    </>
  )
}

export const getServerSideProps = async () => {
    const articlesSnap = await  getDocs(query(collection(db, 'articles'), where('active', '==', true), orderBy('createdAt', 'desc')))
    const articles = articlesSnap.docs.map((doc) => {
        const { lastUpdated, createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })
  
    const docsRef = query(collection(db, 'blog-categories'))
    const docsSnap = await getDocs(docsRef)
  
    const categories = docsSnap.docs.map(doc => ( { id: doc.id, ...doc.data()} ))

    const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(8))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => {
      const { lastUpdated, ...data } = doc.data()
  
      return ({ id: doc.id, ...data } as Product)
    })
  
    return { props: { articles, categories, products }}
  }

