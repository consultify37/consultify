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
import TiktokPixel from 'tiktok-pixel'

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
    TiktokPixel.init('CUQVTSBC77U38KO2EQQG') 
    TiktokPixel.pageView()
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
        <Image 
          src='/landing-page/images/perioada.png'
          alt='urgency'
          width={1024}
          height={1024}
          unoptimized={true}
          className='w-full h-auto mt-8 rounded-lg'
        />
        <ContentComponent 
          title='Pregătește-ți proiectul și atrage finanțare nerambursabilă de peste 50.000 €!'
          image='/landing-page/images/G-2-min-min.jpg'
          text1='Cu toții avem momente în care ne întrebăm: <i>Ce-ar fi fost dacă porneam afacerea aia?<i> Dar, din păcate, ne putem <b>doar imagina<b>. De aceea, în situația de față, nu mai lăsa <b>visul<b> de a deveni antreprenor să rămână doar un gând. Acest <b>pachet complet<b> îți oferă toate informațiile necesare despre Start-Up Nation și îți pune bazele scrierii oricărui proiect prin fonduri europene. 📚<br><b>Nu ezita!<b> Fă primul pas spre afacerea ta și transformă-ți visul în realitate prin fonduri europene! 🚀'
        />
        <p className='font-bold mt-8'>Ok, cumpăr flashcard-urile și particip la sesiunea de consultanță, dar e suficient pentru a obține finanțarea?</p>
        <p className='mt-4'><span className='font-bold'>✅ Răspunsul este DA!</span> În sesiunea de consultanță te vom ghida pas cu pas în:</p>
        <ul className='list-disc mt-4 ml-4'>
          <li>Alegerea ideii de afacere potrivite pentru tine </li>
          <li>Stabilirea echipamentelor necesare pentru activitatea ta</li>
          <li>Structurarea proiectului astfel încât să aibe șanse reale de reușită</li>
        </ul>
        <p className='mt-4'>🎯 Nu ești singur în acest proces! <span className='font-bold'>Noi suntem aici să te sprijinim,</span> așa cum i-am sprijinit și pe restul clienților noștri. Dar nu trebuie să ne crezi pe cuvânt! <span className='font-bold'>Urmărește mai jos recenziile și poveștile lor.👇🏻</span></p>
      </div>

      <div className='w-full mt-8 bg-secondary'>
        <div className='max-w-lg mx-auto py-10'>
          <HeaderLandingTestimonials />
          <LandingTestimonials />
        </div>
      </div>

      <div className='max-w-lg px-8 mx-auto w-full mt-8'>
        {/* <Timer /> */}
        <Image 
          src='/landing-page/images/perioada.png'
          alt='urgency'
          width={1024}
          height={1024}
          unoptimized={true}
          className='w-full h-auto mt-8 rounded-lg'
        />
        <ContentComponent 
          title='FLASHCARDS -  Învață cum să obții rapid finanțare nerambursabilă de 50.000 €!'
          image='/landing-page/images/G-6-min-min.jpg'
          text1='Perfecte pentru oricine vrea <b>să acceseze<b> fonduri europene, aceste flashcards te <b>învață<b> pas cu pas, începând de la explicarea ghidului în <b>termeni simpli<b>, până la exerciții practice. Vei descoperi exemple de afaceri care au <b>obținut finanțarea<b>, cu detalii despre firmă, cod CAEN și echipamentele achiziționate prin proiect.<br>În plus, demontăm mituri și îți prezentăm <b>trucuri și artificii<b> care te pot ajuta să îți maximizezi șansele de <b>succes<b>. 💡'
        />
        <MoreInfo />
        <Image 
          src='/landing-page/images/G-3-min-min.jpg'
          width={1024}
          height={1024}
          alt='imagine'
          className='w-full h-auto mt-8 rounded-lg bg-[#f0f1f3]'
        />
        <FeaturesTable />
        {/* <Timer /> */}
        <Image 
          src='/landing-page/images/perioada.png'
          alt='urgency'
          width={1024}
          height={1024}
          unoptimized={true}
          className='w-full h-auto mt-8 rounded-lg'
        />
        <ContentComponent 
          title='Consultanță GRATUITĂ: Fă primii pași spre finanțare!'
          image='https://utxj18o7d5h4mplf.public.blob.vercel-storage.com/Gif%20sedinta%20de%20consultanta-M5V3FXpa3pA93dKgG8LaGsX8lAUZ30.gif'
          text1='După parcurgerea flashcard-urilor, urmează <b>ședința de consultanță<b>, unde vei primi răspunsuri la toate întrebările adunate pe parcurs. Expertul te va ghida <b>pas cu pas<b>: vei afla cum să începi redactarea proiectului, ce achiziții să incluzi în planul de afaceri și cum <b>să gestionezi finanțarea<b> după aprobarea proiectului. La finalul ședinței, vei pleca cu răspunsuri clare și un plan bine structurat, pregătit să te ducă mai aproape de succes 😊<br>📈 <b>Investește<b> în viitorul tău chiar acum!'
          text2='Indiferent dacă ai deja <b>o afacere<b> deschisă sau ești la început de drum, acest pachet te va ajuta să iei decizia corectă în ceea ce privește <b>obținerea finanțării<b> pentru afacerea ta. Chiar dacă alegi să nu aplici, vei înțelege clar cum să obții o finanțare <b>de 50.000 €<b> pentru aproape orice tip de afacere.<br> <b>Alegerea este a ta!<b> Dacă simți că acum e momentul să începi, nu doar o afacere, ci să o pornești cu un avantaj real – 50.000 € prin <b>fonduri nerambursabile<b>. Comandă acum și nu te vei mai întreba niciodată: <i>„Ce-ar fi fost dacă?”<i>.'
          // text3='Comandă acum și vei avea parte de <b>ședința gratuită<b> prin care poți descoperi cum să transformi visul tău antreprenorial în realitate!'
        />
        <FAQ />
        <LandingFooter />
      </div>
    </div>
  )
}

export default LandingPage