import { backCarousel, nextCarousel } from "../../../utils/functions"
import {useState, useEffect, useRef} from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import NewsContainer from "./NewsContainer"
import { Article } from "../../../types"
import Link from "next/link"

type Props = {
    articles: Article[]
}

const News = ({ articles }: Props) => {
    const cardRef = useRef<HTMLElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const [scrollAmount, setScrollAmount] = useState<number>(0)
    useEffect(() => {
        carouselRef.current?.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        })
    }, [scrollAmount])
    return(
        <section className='flex flex-col gap-5 items-center mt-16 md:mt-32 justify-center w-full'>
            <div className='flex justify-between w-full items-center'>
                <h2 className='md:text-xl lg:text-2xl xl:text-[32px] text-[#8717F8] font-bold pl-7 md:pl-[80px] xl:pl-[140px] 2xl:pl-[276px]'>Descoperă ultimele noutăți <br />în materie de business și finanțe:</h2>
                <div className='flex flex-row pr-7 md:pr-[80px] xl:pr-[140px] 2xl:pr-[276px]'>
                    <span className='bg-[#260056] w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer mr-2 transition-all hover:scale-[1.05]' onClick={() => backCarousel(setScrollAmount, carouselRef, cardRef)}>
                        <AiOutlineArrowLeft className='text-[#fff]' size={18} />
                    </span>
                    <span className='bg-[#260056] w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer transition-all hover:scale-[1.05]' onClick={() => nextCarousel(setScrollAmount, carouselRef, cardRef)}>
                        <AiOutlineArrowRight className='text-[#fff]'  size={18} />
                    </span>
                </div>
            </div>
            <NewsContainer articles={articles} cardRef={cardRef} carouselRef={carouselRef}  />
            <Link
                href='/blog'
                className='py-3 lg:py-4 w-fit self-center px-16 bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8 lg:mt-12 lg:mb-6 mb-12'
            >
                <p className='text-onPrimary font-semibold text-[14px]'>Vezi toate articolele</p>
            </Link>
        </section>
    )
}

export default News