import React from 'react'
import Image from 'next/image'
import Carousel from 'react-elastic-carousel'
import Link from 'next/link'

const AdminCarousel = ({ banners }) => {
  return (
    <Carousel
      isRTL={false}
      pagination={true}
      disableArrowsOnEnd={false}
      autoPlaySpeed={10000}
      enableAutoPlay={true}
      className='carousel-admin'
    >
      {
        banners.map((banner) => (
          <div className='w-full flex items-center relative justify-center' key={banner.id}>    
            <Image
              id="hero-video"
              src={banner.image}
              alt="Hero video"
              width={2000}
              height={2000}
              className="w-full object-cover rounded-[18px] h-[200px] z-[5]"
            />
          </div>
        ))
      }
    </Carousel>
  )
}

export default AdminCarousel