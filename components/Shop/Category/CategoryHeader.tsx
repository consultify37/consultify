import Image from "next/image"

const CategoryHeader = ({name, description} : {name: string | undefined, description: string}) => {
    return(
        <section id='category-header' className='mt-40 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] '>
            <div className='bg-[#260056] w-full gap-4 rounded-[35px] flex flex-col items-center justify-center py-14 relative mx-auto overflow-hidden'>
                <h1 className='font-bold text-white text-xl md:text-2xl pt-20 md:pt-0'>{name?.toString()}</h1>
                <p className='text-base text-white text-center max-w-[95%] md:max-w-[50%]'>{description}</p>
                <Image src='/images/circle-hero-bluedark.png' alt='Hero blue circle' width={200} height={200} className='absolute -right-10 -top-12 z-[5] w-[120px] md:w-[200px]' />
                <Image src='/images/polygon-darkorange.png' className='absolute left-4 md:left-7 top-7 md:top-auto md:bottom-6 rotate-2 w-[80px] md:w-[120px]' width={120} height={120} alt='Polygon img' />
            </div>
        </section>
    )
}

export default CategoryHeader