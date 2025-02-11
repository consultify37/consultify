import React, { useEffect, useState } from 'react'
import LandingTopbar from '../../../components/landing-page/LandingTopbar'
import Head from 'next/head'
import LandingPageImages from '../../../components/landing-page/LandingPageImages'
import MainInfo from '../../../components/landing-page/MainInfo'
import FeatureBadges from '../../../components/landing-page/FeatureBadges'
import Info from '../../../components/landing-page/Info'
import PrimaryFeatures from '../../../components/landing-page/PrimaryFeatures'
import Timer from '../../../components/landing-page/Timer'
import ContentComponent from '../../../components/landing-page/ContentComponent'
import HeaderLandingTestimonials from '../../../components/landing-page/HeaderLandingTestimonials'
import LandingTestimonials from '../../../components/landing-page/LandingTestimonials'
import MoreInfo from '../../../components/landing-page/MoreInfo'
import Image from 'next/image'
import FeaturesTable from '../../../components/landing-page/FeaturesTable'
import FAQ from '../../../components/landing-page/FAQ'
import LandingFooter from '../../../components/landing-page/LandingFooter'
import FixedCTAButton from '../../../components/landing-page/FixedCTAButton'
import { storefrontApiClient } from '../../../utils/shopify/storeFrontApiClient'
import CheckoutForm from '../../../components/landing-page/CheckoutForm'
import Offer from '../../../components/landing-page/Offer'

const LandingPage = () => {
  const [availableForSale, setAvailableForSale] = useState(true)
  const [discountCode, setDiscountCode] = useState< string |  null >(null)

  const fetchProduct = async () => {
    try {
      const query = `{
        product(id: "gid://shopify/Product/14940250964312") {
          title
          id
          availableForSale
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
      }`
      
      const response: any = await storefrontApiClient(query)

      if ( !response.data.product.availableForSale ) {
        setAvailableForSale(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className=''>
      <Head>
        <title>{`AGENDA FLASHCARDS START UP NATION + ȘEDINȚĂ CONSULTANȚĂ`}</title>
      </Head>
      <dialog id="my_modal_1" className="modal">
        <div className='modal-box'>
          <CheckoutForm discountCode={discountCode} />
        </div>
      </dialog>
      <dialog id="my_modal_2" className='modal'>
        <Offer setDiscountCode={setDiscountCode} />
      </dialog>
      <FixedCTAButton availableForSale={availableForSale} />
      <LandingTopbar />
      <div className='max-w-lg px-8 mx-auto w-full'>
        <LandingPageImages />
        <FeatureBadges />
        <MainInfo availableForSale={availableForSale} />
      </div>

      <Info />

      <div className='max-w-lg px-8 mx-auto w-full mt-6'>
        <PrimaryFeatures />
        {/* <Timer /> */}
        <ContentComponent 
          title='Cea mai eficientă metoda de a atrage Fonduri Europene pentru afacerea ta!'
          image='/landing-page/images/Gif-uri/Gif 1-min.gif'
          text1='Transformă-ți visul de a deveni antreprenor <b>în realitate!<b> 🏆 Acest pachet unic conține flashcards educative și intuitive, concepute să îți ofere <b>toate informațiile esențiale<b> despre programul Start Up Nation.'
          text2='În plus, beneficiezi de un bonus exclusiv: o sesiune <b>GRATUITĂ<b> de consultanță în fonduri europene cu un <b>expert dedicat!<b> Află cum să obții finanțare 💰 pentru afacerea ta și <b>fă primii pași spre succes<b>, fără riscuri și fără stres.'
        />
      </div>

      <div className='w-full mt-8 bg-secondary'>
        <div className='max-w-lg mx-auto py-10'>
          <HeaderLandingTestimonials />
          <LandingTestimonials />
        </div>
      </div>

      <div className='max-w-lg px-8 mx-auto w-full mt-8'>
        {/* <Timer /> */}
        <ContentComponent 
          title='FLASHCARDS - cum sa înveți eficient despre programul Start Up Nation'
          image='/landing-page/images/Poze produs/Poza 2-min.jpg'
          text1='Perfecte pentru oricine dorește să acceseze <b>fonduri europene<b> sau să își deschidă o afacere, aceste flashcards sunt ideale ✅ atât pentru începători, cât și pentru cei care vor să fie <b>mereu organizați și informați.<b>'
        />
        <MoreInfo />
        <Image 
          src='/landing-page/images/Gif-uri/Gif2-min.gif'
          width={1024}
          height={1024}
          alt='imagine'
          className='w-full h-auto mt-8 rounded-lg bg-[#f0f1f3]'
        />
        <FeaturesTable />
        {/* <Timer /> */}
        <ContentComponent 
          title='Ședința de consultanță care poate atrage fonduri pentru afacerea ta!'
          image='/landing-page/images/testimoniale/Gif sedinta de consultanta.gif'
          text1='Profită de o ședință <b>complet gratuită<b> cu un expert în accesarea fondurilor europene! Această sesiune este creată special <b>pentru a răspunde întrebărilor<b> tale 🤩 și pentru a te ghida pe drumul obținerii finanțării prin programul <b>Start Up Nation.<b>'
          text2='Nu contează <b>dacă ești la început de drum<b> sau deja ai o idee bine conturată, această sesiune te va ajuta să <b>câștigi încredere<b> și să iei decizii informate.'
          text3='Comandă acum și vei avea parte de <b>ședința gratuită<b> prin care poți descoperi cum să transformi visul tău antreprenorial în realitate!'
        />
        <FAQ />
        <LandingFooter />
      </div>
    </div>
  )
}

export default LandingPage