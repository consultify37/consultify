import Image from "next/image"

const HowWorks = () => {
    return(
        <section id='how-works' className='mt-32 px-3 md:px-[80px] xl:px-[200px] 2xl:px-[276px]'>
            <div className='bg-[#260056] w-full gap-4 rounded-[35px] flex flex-col items-center justify-center py-14 relative mx-auto overflow-hidden'>
                <h2 className='font-bold text-white tmd:text-xl lg:text-2xl xl:text-4xl mb-14 md:mb-0'>Cum funcționează</h2>
                <Image src='/images/circle-hero-bluedark.png' alt='Hero blue circle' width={200} height={200} className='absolute bottom-0 -right-10 md:-top-12 z-[5] w-[120px] md:w-[200px]' />
            
                <Image src='/images/polygon-darkorange.png' className='absolute left-7 top-[105px] md:top-12 rotate-2 w-[80px] md:w-[120px]' width={120} height={120} alt='Polygon img' />
                <div className="p-6">
                    <div className='w-[100%] mx-auto bg-[#001F77] rounded-[17px] grid grid-cols-1 md:grid-cols-3 gap-3 px-5 py-4 z-[6] relative'>
                        <article className='flex items-center gap-3'>
                            <p className='h-10 w-10 bg-[#7000FF] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0'>1</p>
                            <div>
                                <h3 className='font-bold text-base text-white'>Cum plătești</h3>
                                <p className='text-sm text-white font-normal max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </article>
                        <article className='flex items-center gap-3'>
                            <p className='w-10 h-10 bg-[#7000FF] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0'>2</p>
                            <div>
                                <h3 className='font-bold text-base text-white'>Cum plătești</h3>
                                <p className='text-sm text-white font-normal max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </article>
                        <article className='flex items-center gap-3'>
                            <p className='w-10 h-10 bg-[#7000FF] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0'>3</p>
                            <div>
                                <h3 className='font-bold text-base text-white'>Cum plătești</h3>
                                <p className='text-sm text-white font-normal max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowWorks