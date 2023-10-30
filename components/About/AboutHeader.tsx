import Image from "next/image"

const AboutHeader = () => {
    return(
        <section id='about-header' className='relative bg-[#260056] w-full pt-32 md:pt-40 pb-14 flex flex-col items-center justify-center overflow-visible px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]' style={{marginBottom: `128px`}}>
            <h1 className='text-xl md:text-4xl xl:text-[44px] font-extrabold md:leading-[48px] text-white md:max-w-[75%] text-center pt-20 lg:pt-8'>Descoperă echipa noastră: Partenerul tău de încredere în succesul afacerii tale!</h1>
            <span className='bg-[#260056] rounded-[0_0_200px_250px] w-[115vw] md:w-[103vw] -rotate-2 absolute -left-5 -bottom-20 h-32' />
            <Image src='/images/circle-hero-left.svg' width={150} height={150} className='absolute -left-4 -top-28 lg:-top-44 lg:left-0 lg:w-[250px]' alt='Circle hero green' />
            <Image src='/images/proces/hexagon.svg' width={100} height={100} className='absolute bottom-36 lg:bottom-5 right-0 lg:right-2 w-[120px] lg:w-[150px]' alt='Yellow triangle' />
        </section>
    )
}

export default AboutHeader