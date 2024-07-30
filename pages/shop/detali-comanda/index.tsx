import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../../context/CartContext'
import axios from 'axios'
import { useAuthContext } from '../../../context/AuthContext'
import toast from 'react-hot-toast'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import Details from '../../../components/shop/Details'
import Email from '../../../components/shop/Email'
import NewsLetter from '../../../components/global/newsletter'
import Steps from '../../../components/shop/Steps'
import Summary from '../../../components/shop/Summary'

const OrderDetails = () => {
  const router = useRouter()
  const { cart: products, coupon } = useCartContext()
  const { currentUser } = useAuthContext()
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState(currentUser ? currentUser.email : '')
  const [invoicePreference, setInvoicePreference] = useState(currentUser && currentUser.invoicePreference ? currentUser.invoicePreference : 'person')
  const [name, setName] = useState(currentUser ? currentUser.name : '')
  const [companyName, setCompanyName] = useState(currentUser && currentUser.company && currentUser.company.name ? currentUser.company.name : '')
  const [companyIdentityNumber, setCompanyIdentityNumber] = useState(currentUser && currentUser.company && currentUser.company.identityNumber ? currentUser.company.identityNumber : '' )
  const [street, setStreet] = useState(currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : '')
  const [county, setCounty] = useState(currentUser && currentUser && currentUser.address?.county ? currentUser.address.county : '')
  const [city, setCity] = useState(currentUser && currentUser.address && currentUser.address.city ? currentUser.address.city : '')
  const [phone, setPhone] = useState(currentUser && currentUser.phone ? currentUser.phone : '')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'})
  }, [step])

  useEffect(() => {
    if ( currentUser ) {
      setEmail(currentUser ? currentUser.email : '')
      setInvoicePreference(currentUser && currentUser.invoicePreference ? currentUser.invoicePreference : 'person')
      setName(currentUser ? currentUser.name : '')
      setCompanyName(currentUser && currentUser.company && currentUser.company.name ? currentUser.company.name : '')
      setCompanyIdentityNumber(currentUser && currentUser.company && currentUser.company.identityNumber ? currentUser.company.identityNumber : '' )
      setStreet(currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : '')
      setCounty(currentUser && currentUser && currentUser.address?.county ? currentUser.address.county : '')
      setCity(currentUser && currentUser.address && currentUser.address.city ? currentUser.address.city : '')
      setPhone(currentUser && currentUser.phone ? currentUser.phone : '')
    }
  }, [currentUser])

  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!acceptTerms) {
      toast.error('Acceptă termenii și condițiile mai întăi.')
      setIsLoading(false)
      return
    }

    if (newsletter) {
      try {
        const collectionRef = collection(db, 'newsletter')
        await addDoc(collectionRef, { website: process.env.SITE, email: newsletter })
      } catch (e) {}
    }

    try {
      const docRef = doc(db, 'users', currentUser?.id!)

      await updateDoc(docRef, {
        phone,
        invoicePreference,
        address: {
          street,
          county,
          city
        },
        company: {
          name: companyName,
          identityNumber: companyIdentityNumber
        }
      })
    } catch (e) {}

    const line_items = products.map((product) => ({ price: product.stripe_price_id, quantity: 1 }))

    try {
      const channel = Cookies.get('channel')

      const response = await axios.post('https://createcheckoutsession-75cxgdbjwq-ey.a.run.app', {
        line_items,
        customer_email: email,
        metadata: { 
          channel: channel ? channel : 'unknown', 
          website: process.env.SITE,
          invoice: JSON.stringify({
            invoicePreference,
            street,
            county,
            city,
            name,
            phone,
            email,
            company: {
              name: companyName,
              identityNumber: companyIdentityNumber
            },
            coupon
          })
        },
        success_url: 'https://www.consultify.ro/shop/success',
        cancel_url: 'https://www.consultify.ro/shop/cart',
        coupon: coupon ? coupon.id : null
      })

      Cookies.set('cart_session_id', response.data.session_id)

      router.replace(response.data.url)
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
      console.log(e)
    }

    setIsLoading(false)
  }
  return (
    <>
      <Head>
				<title>{`${process.env.SITE} | Detalii comandă`}</title>
			</Head>

      <div className='min-h-[calc(100vh-160px+90px)] pt-52 lg:pt-64'>
        <div className='flex flex-col items-center'>
          <Steps 
            setStep={setStep}
            step={step}
          />
        </div>

        {
          step == 1 ?
          <Email 
            currentUser={currentUser}
            email={email}
            setEmail={setEmail}
            setStep={setStep}
          /> : null
        }

        {
          step == 2 ?
          <Details 
            city={city}
            companyIdentityNumber={companyIdentityNumber}
            companyName={companyName}
            county={county}
            email={email}
            invoicePreference={invoicePreference}
            name={name}
            phone={phone}
            products={products}
            setCity={setCity}
            setStep={setStep}
            setCompanyIdentityNumber={setCompanyIdentityNumber}
            setCompanyName={setCompanyName}
            setCounty={setCounty}
            setEmail={setEmail}
            setInvoicePreference={setInvoicePreference}
            setName={setName}
            setPhone={setPhone}
            setStreet={setStreet}
            street={street}
          /> : null
        }

        { step == 3 ?
          <Summary 
            acceptTerms={acceptTerms}
            city={city}
            companyName={companyName}
            county={county}
            handleCheckout={handleCheckout}
            invoicePreferance={invoicePreference}
            isLoading={isLoading}
            name={name}
            newsletter={newsletter}
            products={products}
            phone={phone}
            setAcceptTerms={setAcceptTerms}
            setIsLoading={setIsLoading}
            setNewsletter={setNewsletter}
            street={street}
            email={email}
            setStep={setStep}
          /> : null
        }
      </div>

      <NewsLetter 
        headingText={ step == 3 ? 'Nu rata niciun update! Abonează-te la newsletter-ul nostru!': 'Oferte și noutăți direct în inbox-ul tău: Abonează-te acum!'}
      />
    </>
  )
}

export default OrderDetails