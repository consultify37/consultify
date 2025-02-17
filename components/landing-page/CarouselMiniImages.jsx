import Image from 'next/image'
import React from 'react'
// import Carousel from 'react-elastic-carousel'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { ArrowComponent } from './ArrowComponent'

const images = [
  "/landing-page/images/Poze produs/Thumbnail Play.png",
  "/landing-page/images/Poze produs/Poza 1-min.jpg",
  "/landing-page/images/Poze produs/Poza 2-min.jpg",
  "/landing-page/images/Poze produs/Poza 3-min.jpg",
  "/landing-page/images/Poze produs/Poza 4-min.jpg",
  "/landing-page/images/Poze produs/Poza 5-min.jpg",
  "/landing-page/images/Poze produs/Poza 6-min.jpg",
  "/landing-page/images/Poze produs/Poza 7-min.jpg",
]

const CarouselMiniImages = ({ currentIndex, setCurrentIndex }) => {
  return (
    <div className='carousel-mini mt-6'>
      {/* <Carousel
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
            className={`w-[calc(100%-16px)] cursor-pointer bg-[#f0f1f3] aspect-square object-cover h-auto rounded-md ${index == currentIndex ? 'border-black border' : ''}`}
          />
        ))}
      </Carousel> */}
      <Carousel
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 0 },
            items: 4,
            slidesToSlide: 1
          },
        }}
      >
        { images.map((image, index) => (
          <div
            key={index}
            className='pr-2'
          >
            <Image 
              onClick={() => setCurrentIndex(index)}
              src={image}
              width={512}
              height={512}
              alt={image}
              className={`cursor-pointer bg-[#f0f1f3] aspect-square object-cover h-auto rounded-md ${index == currentIndex ? 'border-black border' : ''}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselMiniImages