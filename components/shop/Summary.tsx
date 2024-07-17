import React from 'react'
import SummaryCard from './SummaryCard'
import { Product } from '../../types'
import { calculateCartTotal } from '../../utils/calculateCartTotal'
import Link from 'next/link'
import ReactLoading from 'react-loading'
import ProductBigCard from './ProductBigCard'

type Props = {
  invoicePreferance: string
  name: string
  products: Product[]
  email: string
  companyName: string
  phone: string
  street: string
  county: string
  city: string
  handleCheckout: (e: any) => Promise<void>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  acceptTerms: boolean
  setAcceptTerms: React.Dispatch<React.SetStateAction<boolean>>
  newsletter: boolean
  setNewsletter: React.Dispatch<React.SetStateAction<boolean>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Summary = ({ city, companyName, county, newsletter, products, email, invoicePreferance, setStep, setNewsletter, name, phone, street, handleCheckout, isLoading, setIsLoading, acceptTerms, setAcceptTerms }: Props) => {
  return (
    <div className='pt-28 lg:pt-36 px-6 md:px-[80px] xl:px-[140px] 2xl:px-[276px] w-full pb-8 flex flex-col'>
      <h3 className='text-[18px] lg:text-[22px] font-bold text-secondary'>Sumar comandă</h3>

      <div className='flex flex-col lg:flex-row mt-8 gap-6 w-full'>
        { ['Informații despre facturare', 'Informații despre livrare', 'Modalitate de plată'].map((item, index) => (
          <SummaryCard 
            key={index}
            city={city}
            county={county}
            invoicePreference={invoicePreferance}
            email={email}
            handleModify={index != 2 ? () => setStep(index == 0 ? 2 : 1) : null}
            name={invoicePreferance == 'company' ? companyName : name}
            phone={phone}
            street={street}
            title={item}
            index={index}
          />
        )) }
      </div>

      <div className='flex flex-col mt-6 lg:mt-8'>
        
        <div className='flex flex-col bg-[#F8F8F8] p-4 lg:p-6 mt-8 rounded-[10px] '>
          <p className='text-[14px] lg:text-[20px] font-bold'>Livrare pe adresa de email specificată, cât și în contul tău de pe platforma noastră!</p>
          { products.map((product) => (
            <ProductBigCard key={product.id} product={product} />
            ))
          }

          <div className='flex flex-row justify-between lg:text-[22px] font-bold items-center mt-4 lg:mt-6 px-2'>
            <p className='font-semibold'>Total:</p>
            <p className='font-semibold'>{ calculateCartTotal(products) } lei</p>
          </div>
        </div>
      </div>

      <div
        className='flex flex-row cursor-pointer w-fit mt-8 lg:mt-12'
        onClick={() => setAcceptTerms(!acceptTerms)}
      >
        <div 
          className='w-4 h-4 min-w-[16px] border-secondary border-[1.5px] rounded-[4px] mr-2'
          style={{ background: acceptTerms ? '#260056' : 'transparent' }}
        ></div>
        <p className='text-secondary font-bold text-[14px] lg:text-[16px] -mt-[2px]'>Sunt de acord cu <Link href='/termeni' target='_blank' className='underline'>termenii și condițiile</Link>.</p>
      </div>

      <div
        className='flex flex-row cursor-pointer w-fit mt-4'
        onClick={() => setNewsletter(!newsletter)}
      >
        <div 
          className='w-4 h-4 min-w-[16px] border-secondary border-[1.5px] rounded-[4px] mr-2'
          style={{ background: newsletter ? '#260056' : 'transparent' }}
        ></div>
        <p className='text-secondary font-bold text-[14px] lg:text-[16px] -mt-[2px]'>Abonează-te la newsletter-ul nostru pentru a primi cele mai bune oferte!</p>
      </div>
      
      <div className='h-12 mt-12 self-center w-full flex justify-center items-center'>
        { !isLoading ?
          <button
            onClick={handleCheckout}
            className='px-16 xl:px-20 py-3 lg:py-4 w-full bg-primary max-w-[700px] flex items-center justify-center rounded-full hover:scale-105 transition-all'
          >
            <p className='text-onPrimary font-semibold text-[14px]'>Plasează comanda</p>
          </button> :
          <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center' />
        }
      </div>
    </div>
  )
}

export default Summary