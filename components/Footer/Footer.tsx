import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className='w-full mt-12 md:mt-24'>
            <div className='flex flex-wrap flex-col justify-between md:flex-row gap-10 px-7 md:px-12'>
                <div className='flex flex-col gap-2 w-full lg:max-w-[20%]'>
                    <Image src='/images/logo-invert.svg' alt='Footer logo' width={200} height={53} className='aspect-auto w-[177px] md:w-[200px]' />
                    <p className='text-[#260056] text-[14px] md:text-[16px] mt-4'>
                        Consultify este partenerul tău de încredere în obținerea finanțărilor nerambursabile, oferind soluții personalizate pentru dezvoltarea afacerii tale
                    </p>
                </div>
                <div className='flex flex-col gap-1 lg:max-w-[20%]'>
                    <h3 className='font-bold text-[#260056] text-[24px]'>Navigație</h3>
                    <ul className='list-none flex flex-col gap-1'>
                        <li>
                            <Link href='/' className='font-medium text-[#8717F8] text-[16px]'>Acasă</Link>
                        </li>
                        <li>
                            <Link href='/despre' className='font-medium text-[#8717F8] text-[16px]'>Despre</Link>
                        </li>
                        <li>
                            <Link href='/testimoniale' className='font-medium text-[#8717F8] text-[16px]'>Testimoniale</Link>
                        </li>
                        <li>
                            <Link href='/Programe' className='font-medium text-[#8717F8] text-[16px]'>Programe</Link>
                        </li>
                        <li>
                            <Link href='/servicii' className='font-medium text-[#8717F8] text-[16px]'>Servicii</Link>
                        </li>
                        <li>
                            <Link href='/contact' className='font-medium text-[#8717F8] text-[16px]'>Contact</Link>
                        </li>
                        {/* <li>
                            <Link href='/' className='font-medium text-[#8717F8] text-[16px]'>Blog</Link>
                        </li>
                        <li>
                            <Link href='/' className='font-medium text-[#8717F8] text-[16px]'>Shop</Link>
                        </li> */}
                    </ul>
                </div>
                <div className='flex flex-col gap-1 lg:max-w-[20%]'>
                    <h3 className='font-bold text-[#260056] text-[24px]'>Legal</h3>
                    <ul className='list-none flex flex-col gap-1'>
                        <li>
                            <p className='font-medium text-[#8717F8] text-[16px]'>MHC INSPERON SRL</p>
                        </li>
                        <li>
                            <p className='font-medium text-[#8717F8] text-[16px]'>J40/6137/2020</p>
                        </li>
                        <li>
                            <Link href='/' className='font-medium text-[#8717F8] text-[16px]'>Termenii și Condițiile</Link>
                        </li>
                        <li>
                            <Link href='/' className='font-medium text-[#8717F8] text-[16px]'>Politica cookies</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col gap-1 lg:max-w-[20%]'>
                    <h3 className='font-bold text-[#260056] text-[24px]'>Contact</h3>
                    <ul className='list-none flex flex-col gap-1'>
                        <li>
                            <p className='font-medium text-[#8717F8] text-[16px]'>Adresa: Strada Crișul Alb, Numărul 6, Sector 4, București.</p>
                        </li>
                        <li>
                            <Link href='tel:+40727153317' className='font-medium text-[#8717F8] text-[16px]'>Număr de telefon: (0727) 153 317</Link>
                        </li>
                        <li>
                            <Link href='mailto:contact@consultify.ro' className='font-medium text-[#8717F8] text-[16px]'>Email: contact@consultify.ro</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col lg:max-w-[20%]">
                    <h3 className='font-bold text-[#260056] text-[24px]'>Social Media</h3>
                    <div className='flex flex-col gap-2'>
                        <Link href='https://anpc.ro/ce-este-sal/' target="_blank">
                            <Image src='/images/anpc.png' alt='Anpc logo' width={180} height={49} className='aspect-auto' />
                        </Link>
                        <Link href='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage' target="_blank">
                            <Image src='/images/litigii.png' alt='Litigii logo' width={180} height={49} className='aspect-auto' />
                        </Link>
                    </div>
                    <div className='flex flex-row gap-6 mt-4'>
                        <Link href='https://facebook.com' target="_blank">
                            <Image
                                src="/images/contact/facebook.svg"
                                alt="facebook"
                                width={60}
                                height={60}
                                className="z-[5] w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </Link>

                        <Link href='https://instagram.com' target="_blank">
                            <Image
                                src="/images/contact/instagram.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                                className="z-[5] w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </Link>

                        <Link href='https://tiktok.com' target="_blank">
                            <Image
                                src="/images/contact/tiktok.svg"
                                alt="tiktok"
                                width={60}
                                height={60}
                                className="z-[5] w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='w-full mt-5 text-center px-7 md:px-12'>
                <p className='text-[#8717F8] text-[16px] font-medium  border-t-[3px] border-[#260056] py-4 px-16 md:px-0'>
                    Copyright 2023 Consultify 
                    {/* | Made with love by &nbsp; */}
                    {/* <Link href='https://marize.io' className="hover:text-[#8817f89b]" target='_blank'>Marize</Link> */}
                </p>
            </div>
        </footer>
    )
}

export default Footer