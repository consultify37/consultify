import Head from "next/head"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import NewsLetter from "../../../components/global/newsletter"
import News from "../../../components/Home/News/News"
import reactHtmlParser from 'react-html-parser'
import { formatter } from "../../../utils/formatter"
import { collection, doc, getDoc, getDocs, increment, limit, orderBy, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { Article, Product } from "../../../types"
import { formatDate } from "../../../utils/formatDate"
import Link from "next/link"
import { usePathname } from "next/navigation"
import FeaturedProducts from "../../../components/Home/Why-Us/FeaturedProducts"

type Props = {
    article: Article
    articles: Article[]
    products: Product[]
}


const BlogPost = ({ article, articles, products }: Props) => {
    const [shareButton, setShareButton] = useState('/images/link.svg')
    const [shareButtonText, setShareButtonText] = useState('')
    const pathName = usePathname()

    const addView = useCallback(async () => {
        console.log(article.views)
        try {
            const ref = doc(collection(db, 'articles'), article.id)
            await updateDoc(ref, { views: increment(1) })
        } catch (e) {}
    }, [article])

    useEffect(() => {
        addView()
    }, [addView])

    // const content = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue augue ac mattis venenatis. Curabitur eu semper augue. Donec semper, elit hendrerit aliquet volutpat, orci eros vehicula nulla, et auctor magna ipsum ac metus. Nam ex dui, vestibulum vel gravida in, vehicula a enim.</p><p><br></p><p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac fermentum massa. Nullam quis cursus sem. Aliquam purus dui, finibus sit amet diam eget, venenatis rutrum velit. In vehicula purus ac malesuada fermentum. Aenean a congue sapien, nec eleifend metus. Nullam faucibus ipsum congue nunc dapibus, sed ultrices erat rhoncus. Phasellus et sagittis erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ligula elit, porttitor eget aliquam ut, ornare eu est.</p><p><br></p><p>Nullam efficitur fermentum tristique. Maecenas sed odio eu nisl semper sollicitudin nec vitae nibh. Duis rhoncus mauris sit amet risus malesuada tristique. Integer consectetur ante elit, vitae venenatis felis ullamcorper ut. Sed eget ipsum urna. Etiam tincidunt accumsan tortor et aliquam. Suspendisse vitae tempus ligula. Pellentesque vitae pulvinar ipsum, nec sodales est. Etiam eu eros faucibus, rutrum elit eu, suscipit enim. Quisque tincidunt felis sapien, et rutrum risus maximus vitae. Curabitur dictum pulvinar gravida.</p><p><br></p><p><img src="https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/df650838f54e192527d09ff01.png" /></p><p><br></p><h2>Lorem lipsum dolor sit</h2><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue augue ac mattis venenatis. Curabitur eu semper augue. Donec semper, elit hendrerit aliquet volutpat, orci eros vehicula nulla, et auctor magna ipsum ac metus. Nam ex dui, vestibulum vel gravida in, vehicula a enim.</p><p><br></p><p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac fermentum massa. Nullam quis cursus sem. Aliquam purus dui, finibus sit amet diam eget, venenatis rutrum velit. In vehicula purus ac malesuada fermentum. Aenean a congue sapien, nec eleifend metus. Nullam faucibus ipsum congue nunc dapibus, sed ultrices erat rhoncus. Phasellus et sagittis erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ligula elit, porttitor eget aliquam ut, ornare eu est.</p><p><br></p><p>Nullam efficitur fermentum tristique. Maecenas sed odio eu nisl semper sollicitudin nec vitae nibh. Duis rhoncus mauris sit amet risus malesuada tristique. Integer consectetur ante elit, vitae venenatis felis ullamcorper ut. Sed eget ipsum urna. Etiam tincidunt accumsan tortor et aliquam. Suspendisse vitae tempus ligula. Pellentesque vitae pulvinar ipsum, nec sodales est. Etiam eu eros faucibus, rutrum elit eu, suscipit enim. Quisque tincidunt felis sapien, et rutrum risus maximus vitae. Curabitur dictum pulvinar gravida.</p><p><br></p><p><img src="https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/df650838f54e192527d09ff02.jpeg" /></p>`
    return(
        <>
            <Head>
                <title>{`${process.env.SITE} | ${ article.title }`}</title>
                <meta name="keywords" content={article.keywords.join(', ')}></meta>
                <meta name="description" content={article.description}></meta>
                <meta name="author" content={article.author}></meta>
            </Head>
            <p className="hidden -my-4"></p>
            <div className="relative">
                <Image
                    className="w-full h-[70vh] lg:h-[95vh] object-cover"
                    src={ article.mainImage.image }
                    width={2048}
                    height={2048}
                    alt="blog-post-1"
                />
                <div className="absolute w-full h-full flex justify-center items-center top-0 bg-[#260056] opacity-70"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center top-0 pt-12">
                    <h2 className="font-bold text-[#F7EDFF] text-base lg:text-lg 2xl:text-xl mb-2 lg:mb-5">{ article.category }</h2>
                    <h1 className="font-extrabold text-2xl lg:text-3xl  2xl:text-5xl leading-relaxed text-white z-10 text-center w-[80vw] lg:w-[50vw]">{ article.title }</h1>
                    <div className="p-8 rounded-3xl mt-12 border-[1px] border-[hsla(0,0%,100%,.03)] bg-[linear-gradient(132deg,#4e2869,#260056)] flex flex-col items-center">
                        <p className="text-white text-base lg:text-lg 2xl:text-xl font-light">Articol de <span className="font-semibold">{ article.author }</span></p>
                        <p className="text-[#F7EDFF] text-base lg:text-lg 2xl:text-xl font-semibold mt-2">{ article.authorDescription }</p>
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
                <div className="flex-col flex md:flex-row justify-between w-full lg:mb-4">
                    <div className="w-full flex flex-row mb-4 md:mb-0">
                        <span className="text-base font-bold mr-4">
                            { article.formattedCreatedAt }
                        </span>
                        {/* <span className="text-base font-bold text-[#8717F8]">Marketing</span> */}
                    </div>
                    <div className="w-full flex md:justify-end items-center flex-row">
                        <span className="text-base font-bold mr-4">
                            Distribuie pe social media
                        </span>
                        <div className="flex flex-row items-center">
                            <Link target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${(`https://${process.env.SITE?.toLowerCase()}.ro${pathName}`).replaceAll(':', '%3A').replaceAll('/', '%2F')}`} className="flex items-center bg-primary rounded-full mr-2 p-2 hover:scale-105 transition-all">
                                <Image src="/images/facebook.svg" width={12} height={12} alt="facebook" />
                            </Link>
                            { shareButtonText == 'Copied' ?
                                <div
                                    className="flex items-center bg-[#8717F8] rounded-full mr-2 p-2"
                                >
                                    <Image src={shareButton} width={12} height={12} alt="link" className="w-3 h-3" />
                                </div> :
                                <div
                                    onClick={() => {
                                        setShareButton('/images/check.svg')
                                        setShareButtonText('Copied')
                                        navigator.clipboard.writeText(window.location.href)
                                    }}
                                    className="flex items-center bg-[#8717F8] rounded-full mr-2 p-2 cursor-pointer hover:scale-105 transition-all"
                                >
                                    <Image src={shareButton} width={12} height={12} alt="link" />
                                </div>
                            }
                            <span className="hidden sm:block">{shareButtonText}</span>
                        </div>
                    </div>
                </div>
                { reactHtmlParser(article.formattedContent.replaceAll('<p><br></p>', ''), { transform: formatter }) }
                {/* <p className="text-3xl font-bold">
                    Anul 2023 va veni la pachet cu una dintre cele mai mari crize economice
                </p> */}
                
                {/* <p className="text-sm">
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
                </p> */}
            </section>
            <News 
                articles={articles}
                title="Explorează tendințele actuale din lumea antreprenoriatului și nu numai:"
            />
            <FeaturedProducts 
                products={products}
                title="Testează ultimele servicii și produse digitale propuse de Consultify!"
            />
            <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
        </>
    )
}

export default BlogPost

export const getStaticPaths = async () => {
    const articlesRef = collection(db, 'articles')
    const articlesSnap = await getDocs(articlesRef)

    const paths = articlesSnap.docs.map((doc) => ({ params: { id: doc.id }}))
    return {
        paths,
        fallback: 'blocking'
    }
}
  
export const getStaticProps = async (context: any) => {
    const id = context.params.id
    const articleSnap = await  getDoc(doc(db, 'articles', id))

    if ( !articleSnap.exists() ) {
        return {
        notFound: true
        }
    }
    
    const { lastUpdated, createdAt, ...data } = articleSnap.data()

    const article = { id: articleSnap.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }

    const articlesSnap = await  getDocs(query(collection(db, 'articles'), where('active', '==', true), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(8)))
    var articles = articlesSnap.docs.map((doc) => {
        const { lastUpdated, createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })

    if ( articles.length >=2 ) {
        articles = articles.filter((item) => item.id != article.id )
    }

    const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(8))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => {
      const { lastUpdated, ...data } = doc.data()
  
      return ({ id: doc.id, ...data } as Product)
    })

    return { 
        props: { article, articles, products }, 
        revalidate: Number(process.env.REVALIDATE )
    }
}