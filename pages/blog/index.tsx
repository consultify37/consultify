/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import NewsLetter from "../../components/global/newsletter";
import Head from "next/head";
import { PaginationBlog } from "../../utils/functions"
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import NewsInterface from '../../components/Home/News/NewsContainer';
import { isPartiallyEmittedExpression } from "typescript";
import TabsComponent from "../../components/TabsComponent";
import PageHeader from "../../components/Header/PageHeader";

export interface blogData {
    id: number;
    categorie: string
    image: string;
    title: string;
    data: string;
    description: string;
    link: string;
}

const Blog: blogData[] = [
    {
        id: 1, categorie: 'digitalizare', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 2, categorie: 'fonduri-europene', image: '/images/blog-post-1.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 3, categorie: 'marketing', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 4, categorie: 'marketing', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 5, categorie: 'marketing', image: '/images/blog-post-1.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 6, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 7, categorie: 'fonduri-europene', image: '/images/blog-post-test-2.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 8, categorie: 'fonduri-europene', image: '/images/home-about-2.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 9, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 10, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 11, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 12, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 13, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 14, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 15, categorie: 'fonduri-europene', image: '/images/blog-post-1.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
    {
        id: 16, categorie: 'fonduri-europene', image: '/images/news-image.png', title: 'Ghid fonduri europene', description: 'Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice', data: '20/01/2023', link: '/blog-post'
    },
]

export default function Testimoniale() {
    const [page, setPage] = useState(0)
    let maxPages = Math.ceil(Blog.length/9)
    const [products, setProducts] = useState(Blog);
    const [reducere, setReducere] = useState(false);
  
    const [showReduced, setShowReduced] = React.useState(false);
  
    const toggleShowReduced = () => {
      setShowReduced(!showReduced);
    };
  
    const [selectedCategory, setSelectedCategory] = useState<string>('toate');
    const [filteredPosts, setFilteredPosts] = useState(Blog)

    useEffect(() => {
        if (selectedCategory == 'toate') {
            setFilteredPosts(Blog)
            return
        }

        let filteredData = Blog.filter(products => products.categorie === selectedCategory)
        setFilteredPosts(filteredData)
    }, [selectedCategory])

  return (
    <>
        <Head>
            <title>Consultify | Blog</title>
        </Head>
        <PageHeader 
            title="Află noutățile din business și nu numai"
        >
            <Image
                src="/images/Star 1.svg"
                alt="Hero blue circle"
                width={100}
                height={200}
                className="absolute right-0 top-0 md:top-20 z-[5] w-[80px] md:w-[120px]"
            />
            <Image
                src="/images/shop-hexagon.png"
                width={130}
                height={130}
                className="absolute top-7 -left-2 md:bottom-5 md:left-0 w-[100px] md:w-[130px]"
                alt="Yellow triangle"
            />
        </PageHeader>

        {/* <div className="relative">
            <section
                id="about-header"
                className="relative bg-secondary mb-32 md:mb-60 w-full pt-32 md:pb-14 flex flex-col items-center justify-center overflow-visible z-10"
            >
                <h1 className="text-xl md:text-4xl xl:text-[44px] font-extrabold md:leading-[48px] text-white md:max-w-[50%] text-center pt-20 md:pt-20">
                    Află noutățile din business și nu numai
                </h1>
                <span className='bg-[#260056] rounded-[0_0_200px_250px] w-[103vw] -rotate-2 absolute -left-5 -bottom-20 h-32 hidden md:block' />
            </section>
            <span className="md:hidden bg-secondary rounded-[0_0_164px_144px] -left-[24vw] md:left-0 w-[136vw] -rotate-[5.09deg] absolute -bottom-12 h-[700px]" />
        </div>
        <span className="md:hidden bg-secondary rounded-[0_0_164px_144px] -left-[24vw] md:left-0 w-[136vw] -rotate-[5.09deg] absolute -bottom-12 h-[700px]" /> */}
        <section className="flex flex-col gap-5 pb-20 items-stretch justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
                <TabsComponent 
                    values={('toate digitalizare agricultură horeca susținere industrie').split(' ')}
                    setSelectedValue={setSelectedCategory}
                />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-0'>
                {
                    PaginationBlog(filteredPosts, page, 9).map(item =>
                        <Link href={item.link}>
                            <article className='max-w-[350px] m-auto relative bg-[#F5F5F5] rounded-[16px] snap-center'>
                                <div className="relative overflow-hidden h-64 rounded-[20px_20px_0_0] object-cover">
                                    <Image src={item.image} placeholder='blur' blurDataURL={item.image} alt={item.title} width={300} height={300} className='w-full object-cover h-full'/>
                                </div>
                                <h3 className='text-[#260056] font-bold text-base p-2'>{item.description}</h3>
                                <div className='flex justify-between p-2 items-center'>
                                    <p className='text-[#828282] text-sm'>{item.data}</p>
                                    <p className="text-[#8717F8] font-bold text-sm underline hover:scale-105 transition-all">Citește mai mult</p>
                                </div>
                            </article>   
                        </Link>                     
                    )
                }
            </div>
            <div className='mt-4 flex items-center justify-center w-full gap-2'>
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
      <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
    </>
  );
}
