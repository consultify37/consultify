import React from 'react'
import Carousel from 'react-elastic-carousel'
import Image from 'next/image'
import LatestArticleComponent from './LatestReleaseComponent'

const FeaturedArticlesSection = ({ releases }) => {
  return (
    <section className="relative pt-[132px] md:pt-24 sm:px-[80px] xl:px-[140px] 2xl:px-[376px] -mt-44">
        <div className='absolute w-full h-full bg-[#fbf8ff] inset-0 -z-10'></div>
        <Carousel
            isRTL={false}
            pagination={false}
            disableArrowsOnEnd={false}
            autoPlaySpeed={10000}
            enableAutoPlay={true}
            className="py-12 md:py-24"
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