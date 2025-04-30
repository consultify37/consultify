import React, { useState } from 'react'
import AdminLayout from '../../../../../components/admin-nav/AdminLayout'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FormInput from '../../../../../components/admin/editProgram/FormInput'
import { NextPageContext } from 'next'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import axios from 'axios'

type Props = {
  order: any
}

const Details = ({ order }: Props) => {
  const router = useRouter()
  const [name, setName] = useState(order.name ? order.name : '')
  const [line1, setLine1] = useState(order.shipping.line1 ? order.shipping.line1 : '')
  const [line2, setLine2] = useState(order.shipping.line2 ? order.shipping.line2 : '')
  const [city, setCity] = useState(order.shipping.city ? order.shipping.city : '')
  const [state, setState] = useState(order.shipping.state ? order.shipping.state : '')
  const [postalCode, setPostalCode] = useState(order.shipping.postal_code ? order.shipping.postal_code : '')
  const [phone, setPhone] = useState(order.phone ? order.phone : '')
  const [fullfilled, setFullfilled] = useState(order.fullfilled)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const leavePage = () => {
    if (confirm('Ești sigur că vrei să părăsești pagina? Toate modificările vor fi pierdute.')) {
      router.push('/admin/comenzi-shop-fizic')
    }
  }

  const handleUpload = async (e: any) => {
    e.preventDefault()
    setIsLoading2(true)

    try {
      await updateDoc(doc(db, 'physicalOrders', order.id!), {
        name,
        shipping: {
          line1,
          line2,
          city,
          state,
          postal_code: postalCode,
        },
        phone
      })

      toast.success('Comanda a fost modificat cu succes.', { duration: 3000 })
    } catch (e: any) {
      console.log(e)
    }

    setIsLoading2(false)
  }

  const sendMail = async () => {
    setIsLoading2(true)
    
    try {
      const response = await axios.post('/api/shop/fullfill-order', {
        email: order.email,
      })

      await updateDoc(doc(db, 'physicalOrders', order.id!), {
        fullfilled: true,
      })

      toast.success('Email-ul a fost trimis cu succes.', { duration: 3000 })
      setFullfilled(true)
    } catch (e: any) {
      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading2(false)
  }

  return (
    <AdminLayout>
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className='text-[28px] text-secondary font-bold '>Detalii comandă</h1>

        <div className='flex flex-row items-center'>
          <div 
            className='py-3 px-12 mr-4 rounded-2xl flex items-center justify-center'
            style={{background: fullfilled ? '#04D200' : '#FFCC00'}}
          >
            <p className='text-white font-semibold whitespace-nowrap'>{fullfilled ? 'fullfilledd' : 'în așteptare'}</p>
          </div>
          <button
            onClick={leavePage}
            className='p-2 hover:scale-105 transition-all w-full mr-4'
          >
            <Image 
              src='/images/admin/X.svg'
              width={16}
              height={16}
              alt='X'
              className='w-4 h-4'
            />
          </button>
        </div>
      </div>

      <form
        onSubmit={handleUpload}
      >
        <div className='flex flex-row mt-8'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-8 xl:mr-16'>
            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Numele clientului</h2>
            <FormInput
              value={name}
              setValue={setName}
              placeholder=''
              required={true}
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Email</h2>
            <input 
              className='text-base p-4 rounded-2xl border-2 border-primary outline-none w-full '
              placeholder=''
              defaultValue={order.email}
              disabled
            />
            
            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Adresă linia 1</h2>
            <FormInput
              value={line1}
              setValue={setLine1}
              placeholder=''
              required={true}
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Adresă linia 2</h2>
            <FormInput
              value={line2}
              setValue={setLine2}
              placeholder=''
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Oraș</h2>
            <FormInput
              value={city}
              setValue={setCity}
              placeholder=''
              required={true}
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Județ</h2>
            <FormInput
              value={state}
              setValue={setState}
              placeholder=''
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Cod poștal</h2>
            <FormInput
              value={postalCode}
              setValue={setPostalCode}
              placeholder=''
            />

            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-4'>Număr de telefon</h2>
            <FormInput
              value={phone}
              setValue={setPhone}
              placeholder=''
            />
          </div>

          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>
            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Produse comandate</h2>

            <div className='bg-admin-card rounded-lg p-4 flex flex-col'>
              {order.products.map((product: any) => (
                <div key={product.id} className='flex flex-row items-center justify-between'>
                  <p className='text-secondary font-semibold text-[16px]'>{product.description}</p>
                  <p className='text-secondary font-semibold text-[16px]'>{product.amount_total/100} RON</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-x-2'>
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mx-12' /> :
            <button 
              type='submit'
              className='bg-primary p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4 mt-8'
            >
              <p className='text-[14px] font-semibold text-onPrimary'>Salvează modificările</p>
            </button> 
          }
          { 
            isLoading2 ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mx-12' /> :
            <button 
              type='button'
              disabled={fullfilled}
              onClick={sendMail}
              className='bg-tertiary p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4 mt-8 disabled:bg-gray-300 disabled:hover:scale-100 disabled:cursor-not-allowed'
            >
              <p className='text-[14px] font-semibold text-white'>Trimite email confirmare expediere</p>
            </button> 
          }
        </div>
      </form>
    </AdminLayout>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id as string
  const orderSnap = await  getDoc(doc(db, 'physicalOrders', id))
  const order = { id: orderSnap.id, ...orderSnap.data(), created: null }

  return { props: { order }}
}

export default Details