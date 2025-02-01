import Image from 'next/image'
import React, { useState } from 'react'
import CarouselMiniImages from './CarouselMiniImages'

const images = [
  "/landing-page/images/Group 720.png",
  "/landing-page/images/Group 720.png",
  "/landing-page/images/Group 720.png",
  "/landing-page/images/Group 720.png",
  "/landing-page/images/Group 720.png",
  "/landing-page/images/Group 720.png",
]

const LandingPageImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className='pt-14 w-full'>
      <Image 
        src={images[currentIndex]}
        width={1024}
        height={1024}
        alt='Produs Flash Card'
        className='w-full rounded-lg'
      />

      <CarouselMiniImages 
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </div>
  )
}

export default LandingPageImages