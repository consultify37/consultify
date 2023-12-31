import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NewsLetter from "../../components/global/newsletter";
import News from "../../components/Home/News/News";

const BlogPost: NextPage = () => {
    const [shareButton, setShareButton] = useState('/images/link.svg');
    const [shareButtonText, setShareButtonText] = useState('');
  
    return(
        <>
            <Head>
                <title>Consultify | BlogPost</title>
            </Head>
            <div className="relative">
                <Image
                    className="w-full h-[70vh] lg:h-[95vh] object-cover"
                    src="/images/blog-post-test-1.jpg"
                    width={200}
                    height={100}
                    alt="blog-post-1"
                />
                <div className="absolute w-full h-full flex justify-center items-center top-0 bg-[#260056] opacity-70"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center top-0 pt-12">
                    <h2 className="font-bold text-[#F7EDFF] text-base lg:text-lg 2xl:text-xl mb-5">Marketing</h2>
                    <h1 className="font-extrabold text-2xl lg:text-3xl  2xl:text-5xl leading-relaxed text-white z-10 text-center w-[80vw] lg:w-[50vw]">Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice</h1>
                    <div className="p-8 rounded-3xl mt-12 border-[1px] border-[hsla(0,0%,100%,.03)] bg-[linear-gradient(132deg,#4e2869,#260056)] flex flex-col items-center">
                        <p className="text-white text-base lg:text-lg 2xl:text-xl font-light">Articol de <span className="font-semibold">Andrei Radu</span></p>
                        <p className="text-[#F7EDFF] text-base lg:text-lg 2xl:text-xl font-semibold mt-2">CEO & Mobile Developer</p>
                    </div>
                </div>
                <div className="absolute w-full bottom-4 hidden lg:flex items-center justify-center animate-bounce">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M19 11L12 17L5 11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                            <path opacity="0.6" d="M19 7L12 13L5 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                        </g>
                    </svg>
                </div>
            </div>
            <section className="flex flex-col gap-6 bg-[#F5F5F5] pb-20 items-stretch pt-12 justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">       
                <div className="flex-col flex md:flex-row justify-between w-full">
                    <div className="w-full flex flex-row mb-4 md:mb-0">
                        <span className="text-base font-bold mr-4">
                            12 Decembrie 2022
                        </span>
                        {/* <span className="text-base font-bold text-[#8717F8]">Marketing</span> */}
                    </div>
                    <div className="w-full flex md:justify-end items-center flex-row">
                        <span className="text-base font-bold mr-4">
                            Distribuie pe social media
                        </span>
                        <div className="flex flex-row items-center">
                            <div className="flex items-center bg-[#8717F8] rounded-full mr-2 p-2">
                                <Image src="/images/instagram.svg" width={12} height={12} alt="instagram" />
                            </div>
                            <div className="flex items-center bg-[#8717F8] rounded-full mr-2 p-2">
                                <Image src="/images/facebook.svg" width={12} height={12} alt="facebook" />
                            </div>
                            <div
                            onClick={() => {
                                setShareButton('/images/check.svg');
                                setShareButtonText('Copied');
                                navigator.clipboard.writeText(window.location.href);
                            }}
                                className="flex items-center bg-[#8717F8] rounded-full mr-2 p-2"
                            >
                                <Image src={shareButton} width={12} height={12} alt="link" />
                            </div>
                            <span>{shareButtonText}</span>
                        </div>
                    </div>
                </div>
                {/* <p className="text-3xl font-bold">
                    Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice
                </p> */}
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue augue ac mattis venenatis. Curabitur eu semper augue. Donec semper, elit hendrerit aliquet volutpat, orci eros vehicula nulla, et auctor magna ipsum ac metus. Nam ex dui, vestibulum vel gravida in, vehicula a enim. 

                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac fermentum massa. Nullam quis cursus sem. Aliquam purus dui, finibus sit amet diam eget, venenatis rutrum velit. In vehicula purus ac malesuada fermentum. Aenean a congue sapien, nec eleifend metus. Nullam faucibus ipsum congue nunc dapibus, sed ultrices erat rhoncus. Phasellus et sagittis erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ligula elit, porttitor eget aliquam ut, ornare eu est.

                    Nullam efficitur fermentum tristique. Maecenas sed odio eu nisl semper sollicitudin nec vitae nibh. Duis rhoncus mauris sit amet risus malesuada tristique. Integer consectetur ante elit, vitae venenatis felis ullamcorper ut. Sed eget ipsum urna. Etiam tincidunt accumsan tortor et aliquam. Suspendisse vitae tempus ligula. Pellentesque vitae pulvinar ipsum, nec sodales est. Etiam eu eros faucibus, rutrum elit eu, suscipit enim. Quisque tincidunt felis sapien, et rutrum risus maximus vitae. Curabitur dictum pulvinar gravida.
                </p>
                <Image
                    className="w-full h-full rounded-3xl"
                    src="/images/blog-post-test-2.png"
                    width={200}
                    height={100}
                    alt="blog-post-1"
                />
                <p className="text-2xl font-bold">
                    Lorem ipsum dolor sit
                </p>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue augue ac mattis venenatis. Curabitur eu semper augue. Donec semper, elit hendrerit aliquet volutpat, orci eros vehicula nulla, et auctor magna ipsum ac metus. Nam ex dui, vestibulum vel gravida in, vehicula a enim. 

                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac fermentum massa. Nullam quis cursus sem. Aliquam purus dui, finibus sit amet diam eget, venenatis rutrum velit. In vehicula purus ac malesuada fermentum. Aenean a congue sapien, nec eleifend metus. Nullam faucibus ipsum congue nunc dapibus, sed ultrices erat rhoncus. Phasellus et sagittis erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ligula elit, porttitor eget aliquam ut, ornare eu est.

                    Nullam efficitur fermentum tristique. Maecenas sed odio eu nisl semper sollicitudin nec vitae nibh. Duis rhoncus mauris sit amet risus malesuada tristique. Integer consectetur ante elit, vitae venenatis felis ullamcorper ut. Sed eget ipsum urna. Etiam tincidunt accumsan tortor et aliquam. Suspendisse vitae tempus ligula. Pellentesque vitae pulvinar ipsum, nec sodales est. Etiam eu eros faucibus, rutrum elit eu, suscipit enim. Quisque tincidunt felis sapien, et rutrum risus maximus vitae. Curabitur dictum pulvinar gravida.
                </p>
            </section>
            <News />
            <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
        </>
    )
}

export default BlogPost