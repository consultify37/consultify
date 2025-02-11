import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CarouselMiniImages from './CarouselMiniImages'

const images = [
  "/landing-page/images/Poze produs/Poza 1-min.jpg",
  "/landing-page/images/Poze produs/Clip 1-min.mp4",
  "/landing-page/images/Poze produs/Poza 2-min.jpg",
  "/landing-page/images/Poze produs/Poza 3-min.jpg",
  "/landing-page/images/Poze produs/Poza 4-min.jpg",
  "/landing-page/images/Poze produs/Poza 5-min.jpg",
  "/landing-page/images/Poze produs/Poza 6-min.jpg",
  "/landing-page/images/Poze produs/Poza 7-min.jpg",
]

const LandingPageImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const preloadImage = (src: string) => {
    const img = document.createElement('img')
    img.src = src
  }

  useEffect(() => {
    images.forEach((src) => preloadImage(src))
  }, [])

  return (
    <div className='pt-14 w-full'>
      { currentIndex != 1 ?
        <Image 
          src={images[currentIndex]}
          width={1024}
          height={1024}
          alt='Produs Flash Card'
          // unoptimized={true}
          priority
          className='w-full rounded-lg aspect-square object-cover bg-[#f0f1f3]'
        /> :
        <video width="100%" controls poster="/landing-page/images/Poze produs/Thumbnail.png" className='rounded-lg w-full aspect-square'>
          <source src='/landing-page/images/Poze produs/Clip 1.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      }

      <CarouselMiniImages 
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </div>
  )
}

export default LandingPageImages