import React, { useState } from 'react'
import { Product } from '../../types'
import ReactLoading from 'react-loading'
import Link from 'next/link'
import Image from 'next/image'
import { calculateCartTotal } from '../../utils/calculateCartTotal'
import toast from 'react-hot-toast'
import { useCartContext } from '../../context/CartContext'
import { calculateCouponValue } from '../../utils/calculateCouponValue'

type Props = {
  products: Product[]
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  invoicePreference: string
  setInvoicePreference: React.Dispatch<React.SetStateAction<string>>
  companyName: string
  setCompanyName: React.Dispatch<React.SetStateAction<string>>
  companyIdentityNumber: string
  setCompanyIdentityNumber: React.Dispatch<React.SetStateAction<string>>
  street: string
  setStreet: React.Dispatch<React.SetStateAction<string>>
  county: string
  setCounty: React.Dispatch<React.SetStateAction<string>>
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Details = ({ city, companyIdentityNumber, companyName, county, email, setStep, invoicePreference, name, phone, products, setCity, setCompanyIdentityNumber, setCompanyName, setCounty, setEmail, setInvoicePreference, setName, setPhone, setStreet, street }: Props) => {
  const { coupon } = useCartContext()
  const [paymentMethod, setPaymentMethod] = useState(true)

  const handleForm = (e: any) => {
    e.preventDefault()

    if (!paymentMethod) {
      toast.error('Alege modalitatea de plată înainte să continui.')
      return
    }

    setStep(3)
  }

  return (
    <div className="pt-28 lg:pt-36 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] w-full pb-8">
      <div className='flex flex-col lg:flex-row w-full'>
        <form onSubmit={handleForm} className='flex flex-col lg:w-1/2 lg:pr-16'>
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
                placeholder='nume companie*'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value) }
                required
              />
              <input 
                className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
                placeholder='CUI*'
                value={companyIdentityNumber}
                onChange={(e) => setCompanyIdentityNumber(e.target.value) }
                required
              />
            </> : null
          }

          <input 
            className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-6'
            placeholder='nume și prenume*'
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
            placeholder='adresa*'
            value={street}
            onChange={(e) => setStreet(e.target.value) }
            required
          />

          <input 
            className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
            placeholder='județ / sector*'
            value={county}
            onChange={(e) => setCounty(e.target.value) }
            required
          />

          <input 
            className='text-[14px] p-3 rounded-[10px] border-2 border-primary outline-none w-full mt-4'
            placeholder='localitate*'
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
            disabled={true}
            required
          />

          <h3 className='text-[18px] lg:text-[22px] font-bold text-secondary mt-8'>Modalitate de plată</h3>
          <div
            className='flex flex-row items-center cursor-pointer w-fit mt-6'
            onClick={() => setPaymentMethod(!paymentMethod)}
          >
            <div 
              className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
              style={{ background: paymentMethod ? '#260056' : 'transparent' }}
            ></div>
            <p className='text-secondary font-bold text-[14px] lg:text-[16px] pt-[2px]'>Online cu card bancar</p>
          </div>

          { true ?
            <button
              type='submit'
              className='px-16 xl:px-20 py-3 lg:py-4 w-full bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8'
            >
              <p className='text-onPrimary font-semibold text-[14px]'>Continuă</p>
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
              <p className='font-semibold'>{ coupon ? 'Subtotal' : 'Total' }:</p>
              <p className='font-semibold'>{ calculateCartTotal(products) } lei</p>
            </div>

            { coupon &&
              <>
                <div className='flex flex-row justify-between items-center mt-2 mb-4 px-2'>
                  <p className='font-semibold'>{ coupon.name } | {coupon.code}</p>
                  <p className='font-semibold'>- { calculateCouponValue(calculateCartTotal(products), coupon).coupon } lei</p>
                </div>

                <div className='flex flex-row justify-between items-center pt-4 border-t px-2'>
                  <p className='font-semibold'>Total:</p>
                  <p className='font-semibold'>{ calculateCouponValue(calculateCartTotal(products), coupon).total } lei</p>
                </div>
              </>
            }
          </div>

          <div className='flex flex-col w-full bg-[#F2F4FF] p-6 px-4 max-w-[400px] self-end mt-8 rounded-[10px] gap-4'>
            <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] font-bold'>
              <p>Număr de telefon:</p>
              <Link href={`tel:0727 153 317`} className='text-[#0F52FF]'>0727 153 317</Link>
            </div>
            <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] font-bold'>
              <p>Email:</p>
              <Link href={`mailto:contact@consultify.ro`} className='text-[#0F52FF]'>contact@consultify.ro</Link>
            </div>

            <p className='text-[14px] lg:text-[16px] font-bold'>Program de lucru:</p>

            <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] '>
              <p>Luni-Vineri:</p>
              <p>10:00 - 18:00</p>
            </div>
            <div className='flex flex-row w-full justify-between items-center text-[14px] lg:text-[16px] '>
              <p>Sâmbătă-Duminică:</p>
              <p>Indisponibil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details