import Image from 'next/image'
import React from 'react'
import Carousel from 'react-elastic-carousel'
import { ArrowComponent } from './ArrowComponent'

const images = [
  "/landing-page/images/Poze produs/Poza 1.jpg",
  "/landing-page/images/Poze produs/Thumbnail Play.png",
  "/landing-page/images/Poze produs/Poza 2.jpg",
  "/landing-page/images/Poze produs/Poza 3.jpg",
  "/landing-page/images/Poze produs/Poza 4.jpg",
  "/landing-page/images/Poze produs/Poza 5.jpg",
  "/landing-page/images/Poze produs/Poza 6.jpg",
  "/landing-page/images/Poze produs/Poza 7.jpg",
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
            className={`w-[calc(100%-16px)] cursor-pointer aspect-square object-cover h-auto rounded-md ${index == currentIndex ? 'border-black border' : ''}`}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselMiniImages