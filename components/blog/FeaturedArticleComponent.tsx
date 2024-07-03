import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string,
  duration: string
  formattedCreatedAt: string
  id: string
  image: any
}

const FeaturedArticleComponent = ({ duration, formattedCreatedAt, id, title, image }: Props) => {
  return (
    <div className='flex flex-col lg:flex-row w-full mx-7 md:mx-[80px] lg:mx-4'>
      <Image
        src={image.image}
        width={1024}
        height={1024}
        alt={title}
        className='rounded-3xl lg:w-[45%] h-72 object-cover lg:mr-8 xl:mr-12'
      />
      <div className='lg:flex lg:flex-col lg:justify-between lg:py-1'>
        <div className="flex flex-row items-center ml-1">
          <Image 
            src='/images/blog/clock.svg'
            width={24}
            height={24}
            alt="clock svg"
            className="w-[18px] h-[18px] mr-2"
          />
          <p className="text-[14px] lg:text-[16px] font-semibold text-secondary pt-[3px]">{duration}</p>
          <p className="text-[20px] lg:text-[22px] font-semibold text-secondary mx-2 pt-[3px]">·</p>
          <p className="text-[14px] lg:text-base font-semibold text-secondary pt-[3px]">{formattedCreatedAt}</p>
        </div>
        <h2 className="text-[20px] lg:text-[26px] font-semibold text-secondary mt-4 lg:-mt-4 ml-1">{title}</h2>
        <Link href={`/blog/${id}`} className='w-full lg:w-fit px-16 py-3 lg:py-4 bg-primary rounded-full flex items-center justify-center mt-4 hover:scale-105 transition-all'>
          <p className='text-onPrimary text-[14px] lg:text-base font-semibold'>Citește tot articolul</p>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedArticleComponent