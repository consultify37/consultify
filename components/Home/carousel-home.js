import Carousel, { consts } from 'react-elastic-carousel'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeCarousel = ({ slides }) => {
    return(
        <Carousel
            isRTL={false}
            pagination={true}
            disableArrowsOnEnd={false}
        >
            {
                slides.map((slide) => (
                    <Link href={slide.link} className='w-full flex items-center relative justify-center' key={slide.id}>    
                        {/* <div className='absolute w-full flex flex-col items-center justify-center z-[14]'>
                            <h5 className='text-white text-xs lg:text-3xl mb-2'>
                                {}
                            </h5>
                            <h4 className='text-white text-lg lg:text-6xl font-bold mb-2'>
                                Digitalizarea IMM-urilor
                            </h4>
                            <h6 className='text-white text-xl lg:text-5xl'>
                                20.000 € - 100.000 €
                            </h6>
                        </div> */}
                        <Image
                            id="hero-video"
                            src={slide.image}
                            alt="Hero video"
                            width={2000}
                            height={2000}
                            className="w-full rounded-3xl lg:w-[90%] lg:max-h-[350px] xl:max-h-[400px] aspect-video z-[5] filter-brightness"
                        />
                    </Link>
                ))
            }
        </Carousel>
    )
}

export default HomeCarousel