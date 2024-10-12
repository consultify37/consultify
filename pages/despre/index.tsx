import Head from "next/head"
import AboutHeader from "../../components/About/AboutHeader"
import FAQAbout from "../../components/About/FAQ/FAQ"
import OurStory from "../../components/About/OurStory/OurStory"
import WhyUsAbout from "../../components/About/Why-Us/WhyUs-About"
import CTA from "../../components/CTA"
import NewsLetter from "../../components/global/newsletter"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { formatDate } from "../../utils/formatDate"
import { Article, Product } from "../../types"
import News from "../../components/Home/News/News"
import FeaturedProducts from "../../components/Home/Why-Us/FeaturedProducts"

type Props = {
    products: Product[]
    articles: Article[]
  }

const About = ({ articles, products }: Props) => {

    return(
        <>
            {/* PageSettings */}
            <Head>
                <title>Consultify | Despre</title>
            </Head>
            <AboutHeader /> 
            <OurStory />
            <WhyUsAbout />
            {/* <Partners /> */}
            <FAQAbout />
            <CTA
                title="Aplică acum și transformă-ți <purple>proiectele<purple> în realitate cu Consultify!"
                linkText="Completează formularul!"
                linkHref="/contact"
            />
            <FeaturedProducts 
                products={products}
            />
            <News 
                articles={articles}
            />
            <NewsLetter headingText={'Abonează-te la newsletter pentru informații actualizate despre afaceri!'} />
        </>
    )
}

export default About

export const getStaticProps = async () => {
    const articlesSnap = await  getDocs(query(collection(db, 'articles'), where('active', '==', true), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(8)))
    var articles = articlesSnap.docs.map((doc) => {
        const { lastUpdated, createdAt, ...data } = doc.data()
        return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data }) 
    })
    
    const collectionRef = query(collection(db, 'products'), where('active', '==', true), where('featured', '==', true), orderBy('lastUpdated', 'desc'), limit(8))
    const collectionSnap = await getDocs(collectionRef)
    
    const products: Product[] = collectionSnap.docs.map((doc) => {
      const { lastUpdated, ...data } = doc.data()
  
      return ({ id: doc.id, ...data } as Product)
    })
  
    return {
      props: { products, articles },
      revalidate: Number(process.env.REVALIDATE)
    }
  }