import React from 'react'
import Carousel from 'react-elastic-carousel'
import Image from 'next/image'
import LatestArticleComponent from './LatestReleaseComponent'
import Link from 'next/link'

const FeaturedArticlesSection = ({ releases }) => {
  return (
    <section className="relative pt-[132px] md:pt-24 sm:px-[80px] xl:px-[140px] 2xl:px-[376px] -mt-44">
        <div className='absolute w-full h-full bg-[#fbf8ff] inset-0 -z-10'></div>
        <div className='bg-admin-card rounded-[36px] my-6 md:my-8 p-4 md:p-6 md:px-8 flex flex-col md:flex-row mx-7 justify-between items-center'>
          <p className='font-semibold md:text-xl text-center mb-4 sm:mb-0'>Ai nevoie și tu de un comunicat asemănător?</p>
          <Link
            href='https://wa.link/0a4lnx'
            target='_blank'
            className='py-3 md:py-4 w-fit px-16 bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all'
          >
            <p className='text-onPrimary font-semibold text-[14px]'>Creează unul acum!</p>
          </Link>
        </div>
        <Carousel
            isRTL={false}
            pagination={false}
            disableArrowsOnEnd={false}
            autoPlaySpeed={10000}
            enableAutoPlay={true}
            className="pb-12 md:pb-24"
        >
            { releases.map((release) => (
                <LatestArticleComponent 
                  release={release}
                  key={release.id}
                />
            ))}
        </Carousel>

        <Image 
          src='/images/blog/Ellipse 24.svg'
          width={512}
          height={512}
          alt='.' 
          className='absolute bottom-0 hidden lg:block left-[80px] xl:left-[140px] 2xl:left-[272px] w-[360px] -z-[1]'
        />

        <Image 
          src='/images/blog/Polygon 3 (2).svg'
          width={512}
          height={512}
          alt='.'
          className='absolute bottom-8 hidden lg:block lg:right-[152px] xl:right-[152px] 2xl:right-[272px] lg:w-[100px] xl:w-[110px] 2xl:w-[120px] -z-[1]'
        />
    </section>
  )
}

export default FeaturedArticlesSection