import React from "react";
import Image from "next/image";
import Carousel from "react-elastic-carousel"
import FonduriComponent from './FonduriComponent';
import Link from "next/link";

export default function CarouselPrograme({ programe }){
    return(
        <div className='carousel-programe w-full h-auto flex mt-16 md:mt-24 items-center flex-col relative justify-center px-7 md:px-[100px] xl:px-[160px] 2xl:px-[296px]'>
            <h2 className="text-[#8717F8] text-xl lg:text-3xl font-bold mb-2 md:mb-4 text-center">Ce programe de fonduri poți accesa?</h2>
            <Link href='/Programe'>
                <span className="flex items-center text-[14px] lg:text-base  justify-center mb-8 text-[#5600AB] font-semibold h-auto cursor-pointer transition-all hover:scale-[1.05]">
                    Vezi toate programele
                    <Image src='/images/arrow-right.svg' className="ml-2 w-[6px] md:w-[10px] h-auto" width={10} alt='arrow-right' height={10}/>
                </span>
            </Link>
            <Carousel
                pagination={true}
                isRTL={false}
                disableArrowsOnEnd={false}
                className="relative w-full carousel-fonduri md:-mb-8"
            >
                { programe.map((program) => (
                    <FonduriComponent 
                        program={program} 
                        key={program.id} 
                        carousel={true} 
                    />
                ))}
            </Carousel>
        </div>
    )
}