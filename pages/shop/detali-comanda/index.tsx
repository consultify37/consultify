import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../../context/CartContext'
import axios from 'axios'
import { useAuthContext } from '../../../context/AuthContext'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import Link from 'next/link'
import Image from 'next/image'
import { calculateCartTotal } from '../../../utils/calculateCartTotal'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

const OrderDetails = () => {
  const router = useRouter()
  const { cart: products } = useCartContext()
  const { currentUser } = useAuthContext()
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
          website: 'Consultify',
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
            }
          })
        },
        success_url: 'https://www.consultify.ro/shop/success',
        cancel_url: 'https://www.consultify.ro/shop/cart'
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

      <div className="pt-[158px] lg:pt-48 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] w-full pb-8">
        <div className='flex flex-col lg:flex-row w-full'>
          <form onSubmit={handleCheckout} className='flex flex-col lg:w-1/2 lg:pr-16'>
            <h3 className='text-[18px] lg:text-[22px] font-bold text-secondary'>Detalii de facturare</h3>

            <div className='mt-6 flex flex-col lg:flex-row gap-4'>
              <div
                className='flex flex-row items-center cursor-pointer w-fit'
                onClick={() => setInvoicePreference('person') }
              >
                <div 
                  className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
                  style={{ background: invoicePreference == 'person' ? '#260056' : 'transparent' }}
                ></div>
                <p className='text-secondary font-bold text-[14px]'>persoană fizică</p>
              </div>

              <div
                className='flex flex-row items-center cursor-pointer w-fit'
                onClick={() => setInvoicePreference('company') }
              >
                <div 
                  className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
                  style={{ background: invoicePreference == 'company' ? '#260056' : 'transparent' }}
                ></div>
                <p className='text-secondary font-bold text-[14px]'>persoană juridică</p>
              </div>
            </div>

            { invoicePreference == 'company' ?
              <>
                <input 
                  className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-6'
                  placeholder='nume companie'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value) }
                  required
                />
                <input 
                  className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
                  placeholder='CUI'
                  value={companyIdentityNumber}
                  onChange={(e) => setCompanyIdentityNumber(e.target.value) }
                  required
                />
              </> : null
            }

            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-6'
              placeholder='nume și prenume'
              value={name}
              onChange={(e) => setName(e.target.value) }
              required
            />
            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
              placeholder='telefon'
              value={phone}
              onChange={(e) => setPhone(e.target.value) }
              type='tel'
            />

            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
              placeholder='adresa'
              value={street}
              onChange={(e) => setStreet(e.target.value) }
              required
            />

            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
              placeholder='județ / sector'
              value={county}
              onChange={(e) => setCounty(e.target.value) }
              required
            />

            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
              placeholder='localitate'
              value={city}
              onChange={(e) => setCity(e.target.value) }
              required
            />

            <h3 className='text-[18px] lg:text-[22px] font-bold text-secondary mt-8'>Mail-ul de livrare</h3>
            <input 
              className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
              placeholder='adresă de mail'
              value={email}
              onChange={(e) => setEmail(e.target.value) }
              disabled={currentUser ? true : false}
              required
            />
            <div
              className='flex flex-row items-center cursor-pointer w-fit mt-6'
              onClick={() => setAcceptTerms(!acceptTerms) }
            >
              <div 
                className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
                style={{ background: acceptTerms ? '#260056' : 'transparent' }}
              ></div>
              <p className='text-secondary font-bold text-[14px] lg:text-[16px] pt-[2px]'>Accept <Link href="/termeni" target="_blank" className="text-[#260056] underline">termenii și condițiile.</Link></p>
            </div>

            { !isLoading ?
              <button
                type='submit'
                className='px-16 xl:px-20 py-3 lg:py-4 w-full bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8'
              >
                <p className='text-onPrimary font-semibold text-[14px]'>Plasează comanda</p>
              </button> :
              <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mt-6 self-center' />
            }
          </form>

          <div className='flex flex-col mt-12 lg:mt-0 lg:w-1/2'>
            <h3 className='text-[18px] lg:text-[22px] font-bold text-secondary'>Sumar comandă</h3>
            
            <div className='flex flex-col bg-[#F8F8F8] p-4 pt-0 mt-8 rounded-[10px]'>
              { products.map((product) => (
                <div key={product.id} className='bg-white rounded-[12px] flex flex-col lg:flex-row lg:justify-between mt-6 p-4 w-full'>
                  <div className='flex flex-row sm:items-center w-full'>
                    <Image
                      src={product.image.image}
                      alt="cart image"
                      placeholder="blur"
                      blurDataURL="/images/whyus-cart-image.png"
                      width={152}
                      height={264}
                      className="w-[100px] h-auto lg:w-[120px] object-contain rounded-[12px]"
                    />
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mt-2 ml-2 sm:mt-0 sm:ml-6'>
                      <p className='sm:text-[18px] font-bold text-secondary'>{ product.name }</p>
                      <div>
                        <p className="text-price text-[16px] font-bold mt-4 lg:mt-0 sm:text-[18px]">
                          {product.price} lei
                        </p>
                        {product.onSale && (
                            <p className="text-[#7C9EF8] text-[14px] font-base opacity-90">
                              <s>{product.oldPrice} lei</s>
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                ))
              }

              <div className='flex flex-row justify-between items-center mt-6 px-2'>
                <p className='font-semibold'>Subtotal:</p>
                <p className='font-semibold'>{ calculateCartTotal(products) } lei</p>
              </div>
            </div>

            <div className='flex flex-col w-full bg-[#F2F4FF] p-6 px-4 max-w-[400px] self-end mt-8 rounded-[10px] gap-4'>
              <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] font-bold'>
                <p>Sună la callcenter</p>
                <Link href={`tel:0727 153 317`} className='text-[#0F52FF]'>0727 153 317</Link>
              </div>
              <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] font-bold'>
                <p>Email reclamații</p>
                <Link href={`mailto:contact@consultify.ro`} className='text-[#0F52FF]'>contact@consultify.ro</Link>
              </div>

              <p className='text-[14px] lg:text-[16px] font-bold'>Program callcenter</p>

              <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] '>
                <p>Luni-Vineri</p>
                <p>10:00 - 18:00</p>
              </div>
              <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] '>
                <p>Sâmbătă-Duminică</p>
                <p>Indisponibil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails