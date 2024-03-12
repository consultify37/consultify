import Image from "next/image"
import { ShopItemInterface } from "../../../pages/shop/view/[name]"
interface Props {
    titlu_adreseaza: string;
    desc_adreseaza: string
}

const Guide: React.FC<Props> = ({ titlu_adreseaza, desc_adreseaza }) => {
    return(
        <section id='product-guide' className='mt-32 px-7 md:px-[80px] xl:px-[200px] 2xl:px-[276px] my-10 md:my-20'>
            <div className='grid gap-3 grid-cols-1 md:grid-cols-2 place-items-center'>
                <Image src='/images/shop-view.png' alt='About home 1' className='relative rounded-[28.5px] w-full md:w-[400px] mx-auto z-[4]' width={400} height={400} />
                <div className='flex flex-col gap-2 w-full'>
                    <h2  className='font-bold text-[#260056] md:text-xl lg:text-2xl xl:text-4xl'>{titlu_adreseaza}</h2>
                    <p className='font-normal text-[#260056] text-base mt-[30px]'>{desc_adreseaza}</p>
                </div>
            </div>
        </section>
    )
}

export default Guide