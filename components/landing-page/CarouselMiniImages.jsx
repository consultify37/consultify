import Image from 'next/image'
import React from 'react'
import Carousel from 'react-elastic-carousel'
import { ArrowComponent } from './ArrowComponent'

const images = [
  "/landing-page/images/1.png",
  "/landing-page/images/Group 722.png",
  "/landing-page/images/Group 722.png",
  "/landing-page/images/Group 722.png",
  "/landing-page/images/Group 722.png",
  "/landing-page/images/Group 722.png"
]

const CarouselMiniImages = ({ currentIndex, setCurrentIndex }) => {
  return (
    <div className='carousel-mini mt-6'>
      <Carousel
        disableArrowsOnEnd={true}
        showArrows={true}
        renderArrow={({type, isEdge, onClick}) => ( <ArrowComponent isEdge={isEdge} type={type} onClick={onClick} />)}
        pagination={false}
        itemsToShow={4}
        enableSwipe={false}
        enableMouseSwipe={false}
      >
        { images.map((image, index) => (
          <Image 
            onClick={() => setCurrentIndex(index)}
            src={image}
            key={index}
            width={512}
            height={512}
            alt={image}
            className={`w-[calc(100%-16px)] cursor-pointer h-auto rounded-md ${index == currentIndex ? 'border-black border' : ''}`}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselMiniImages