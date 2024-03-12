import { WhyToChooseItems } from "../../../pages/shop/view/[name]"

const WhyToChoose = ({data} : {data: WhyToChooseItems[]}) => {
    return(
        <section id='why-to-choose' className='flex flex-col gap-2 mt-32 px-7 md:px-[80px] xl:px-[200px] 2xl:px-[276px]'>
            <h2 className='font-bold text-[#260056] md:text-xl lg:text-2xl xl:text-4xl'>De ce să alegi produsul</h2>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-[60px]'>
                <div className='flex flex-col gap-2 w-full'>
                    {
                        data.slice(0, data.length/2).map(item =>
                            <div className='flex gap-3 items-center' key={item.id}>
                                <p className='w-8 h-8 rounded-full flex items-center justify-center text-base text-[#260056] flex-shrink-0' style={{background: '#7000FF'}}>{item.id}</p>
                                <p className='font-semibold text-base text-[#260056]'>{item.task}</p>
                            </div>    
                        )
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    {
                        data.slice(data.length/2, data.length).map(item =>
                            <div className='flex gap-3 items-center' key={item.id}>
                                <p className='w-8 h-8 rounded-full flex items-center justify-center text-base text-[#260056] flex-shrink-0'  style={{background: '#7000FF'}}>{item.id}</p>
                                <p className='font-semibold text-base text-[#260056]'>{item.task}</p>
                            </div>    
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default WhyToChoose