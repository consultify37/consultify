import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { storefrontApiClient } from '../../utils/shopify/storeFrontApiClient'
import FormInput from './form/FormInput'
import SelectProvince from './form/SelectProvince'
import ProductElementForm from './form/ProductElementForm'
import Shipping from './form/Shipping'
import TotalPriceContainer from './form/TotalPriceContainer'
import ExtraProducts from './form/ExtraProducts'
import ContinueButton from './form/ContinueButton'
import Link from 'next/link'
import TiktokPixel from 'tiktok-pixel'
import axios from 'axios'

type Props = {
  discountCode: string | null
}

const CheckoutForm = ({ discountCode }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<{
    handle?: string
    name: string
    price: number
    image: string
    merchandiseId: string
    quantity?: number
  }[]>([{
    handle: 'agenda-start-up',
    merchandiseId: "gid://shopify/ProductVariant/54299416691032",
    name: 'FLASHCARDS START UP NATION + SEDINTA CONSULTANTA',
    price: 79,
    image: '/landing-page/images/1.png',
    quantity: 1
  }])
  
  const createCart = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)

    try {
      const query = `mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
          }
          userErrors {
            field
            message
          }
          warnings {
            code
            message
            target
          }
        }
      }`

      const variables = {
        input: { 
          lines: items.map((item) => ({ merchandiseId: item.merchandiseId, quantity: item.quantity })),
          discountCodes: discountCode ? [discountCode] : [],
          buyerIdentity: {
            email: formData.get('Email'),
            deliveryAddressPreferences: {
              deliveryAddress: {
                address1: formData.get('Adress'),
                city: formData.get('City'),
                firstName: formData.get('FirstName'),
                lastName: formData.get('LastName'),
                province: formData.get('Province'),
                country: "RO",
                phone: formData.get('Phone'),
                zip: formData.get('ZIP')
              },
            }
          }
        }
      }

      const response: any = await storefrontApiClient(query, variables)

      try {
        TiktokPixel.track('AddToCart', {
          contents: [{
            content_id: items[0].merchandiseId,
            content_name: items[0].name,
            quantity: items[0].quantity || 1,
            price: items[0].price
          }],
          content_type: 'product',
          value: items[0].price,
          currency: 'RON'
        })
      } catch (e) {
        console.log(e)
      }

      router.push(response.data.cartCreate.cart.checkoutUrl)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const openOfferModal = () => {
    const element = document.getElementById('my_modal_2') as any
    element.showModal()
  }

  const createOrder = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const discount_codes = []

    if ( items.find((item) => item.handle == 'agenda-start-up')!.quantity == 2 ) {
      discount_codes.push({ code: '15OFF', amount: '15.00', type: 'fixed_amount' })
    }

    if (discountCode) {
      discount_codes.push({ code: discountCode, amount: '5.00', type: 'percentage' })
    }

    try {
      const response = await axios.post('/api/shopify/create_order', {
        send_receipt: true,
        inventory_behaviour: 'decrement_obeying_policy',
        order: {
          send_receipt: true,
          line_items: items.map((item) => ({ variant_id: item.merchandiseId.replace('gid://shopify/ProductVariant/', ''), quantity: item.quantity, fulfillable_quantity: item.quantity })),
          customer: {
            first_name: formData.get('FirstName'),
            last_name: formData.get('LastName'),
            email: formData.get('Email')
          },
          billing_address: {
            first_name: formData.get('FirstName'),
            last_name: formData.get('LastName'),
            address1: formData.get('Adress'),
            phone: formData.get('Phone'),
            city: formData.get('City'),
            province: formData.get('Province'),
            country: 'Romania',
            zip: formData.get('ZIP')
          },
          shipping_address: {
            first_name: formData.get('FirstName'),
            last_name: formData.get('LastName'),
            address1: formData.get('Adress'),
            phone: formData.get('Phone'),
            city: formData.get('City'),
            province: formData.get('Province'),
            country: 'Romania',
            zip: formData.get('ZIP')
          },
          email: formData.get('Email'),
          financial_status: 'pending',
          discount_codes: discount_codes,
          note_attributes: { 
            'CUI': formData.get('CUI'),
            'Company': formData.get('Company')
          }
        }
      })

      try {
        TiktokPixel.track('PlaceAnOrder', {
          contents: [{
            content_id: items[0].merchandiseId,
            content_name: items[0].name,
            quantity: items[0].quantity || 1,
            price: items[0].price
          }],
          content_type: 'product',
          value: items[0].price,
          currency: 'RON'
        })
      } catch (e) {
        console.log(e)
      }

      router.push('/thank-you?order_id=' + response.data.order.id)
    } catch (error) {
      console.error('Error creating order:', error);
    }

    setLoading(false)
  }

  return (
    <div className='flex flex-col pb-2 items-center'>
      <form 
        onSubmit={openOfferModal} 
        method="dialog" 
        className='translate-x-4 self-end'
      >
        <button className='btn btn-ghost'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
      <h1 className='font-bold text-[21px]'>Introdu adresa ta de livrare</h1>
      <h3 className='font-bold text-[#ff0000]'>Plătești doar când ajunge coletul la tine!</h3>
      <form onSubmit={createOrder} className='flex flex-col items-start w-full mt-4 max-w-lg px-0'>
        <FormInput 
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          }
          label='Email*'
          placheholder='ex: ion.popescu@gmail.com'
          name='Email'
          type='email'
        />

        <FormInput 
          label='Nume*'
          name='LastName'
          placheholder="ex: Popescu"
          svg={<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>}
          type='text'
          className='mt-2'
        />

        <FormInput 
          label='Prenume*'
          name='FirstName'
          placheholder="ex: Ion"
          svg={<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>}
          type='text'
          className='mt-2'
        />

        <FormInput 
          label='Telefon*'
          name='Phone'
          placheholder="ex: 0770123456"
          svg={<svg height="14px" width="14px" className='opacity-70' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g> 
                <path className="st0" d="M94.811,21.696c-35.18,22.816-42.091,94.135-28.809,152.262c10.344,45.266,32.336,105.987,69.42,163.165 c34.886,53.79,83.557,102.022,120.669,129.928c47.657,35.832,115.594,58.608,150.774,35.792 c17.789-11.537,44.218-43.058,45.424-48.714c0,0-15.498-23.896-18.899-29.14l-51.972-80.135 c-3.862-5.955-28.082-0.512-40.386,6.457c-16.597,9.404-31.882,34.636-31.882,34.636c-11.38,6.575-20.912,0.024-40.828-9.142 c-24.477-11.262-51.997-46.254-73.9-77.947c-20.005-32.923-40.732-72.322-41.032-99.264c-0.247-21.922-2.341-33.296,8.304-41.006 c0,0,29.272-3.666,44.627-14.984c11.381-8.392,26.228-28.286,22.366-34.242l-51.972-80.134c-3.401-5.244-18.899-29.14-18.899-29.14 C152.159-1.117,112.6,10.159,94.811,21.696z"></path> 
              </g> 
            </g>
          </svg>}
          type='tel'
          className='mt-2'
        />

        <FormInput 
          label='Adresă*'
          name='Adress'
          placheholder="Stradă, număr, etc."
          svg={<svg className='opacity-70' fill="currentColor" height="14px" width="14px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g id="Location-Pin-Filled"> 
                <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> 
              </g> 
            </g>
          </svg>}
          type='text'
          className='mt-2'
        />

        <FormInput 
          label='Oraș*'
          name='City'
          placheholder="Oraș"
          svg={<svg className='opacity-70' fill="currentColor" height="14px" width="14px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g id="Location-Pin-Filled"> 
                <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> 
              </g> 
            </g>
          </svg>}
          type='text'
          className='mt-2'
        />

        <FormInput 
          label='Cod Poștal (opțional)'
          name='ZIP'
          placheholder="Cod poștal"
          svg={<svg className='opacity-70' fill="currentColor" height="14px" width="14px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g id="Location-Pin-Filled"> 
                <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> 
              </g> 
            </g>
          </svg>}
          type='text'
          className='mt-2'
          required={false}
        />

        <SelectProvince />

        <FormInput 
          label='Nume Firmă (opțional)'
          name='Company'
          placheholder="Nume firmă"
          // svg={<svg className='opacity-70' fill="currentColor" height="14px" width="14px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
          //   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          //   <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          //   <g id="SVGRepo_iconCarrier"> 
          //     <g id="Location-Pin-Filled"> 
          //       <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> 
          //     </g> 
          //   </g>
          // </svg>}
          type='text'
          className='mt-2'
          required={false}
        />

        <FormInput 
          label='CUI Firmă (opțional)'
          name='CUI'
          placheholder="CUI Firmă"
          // svg={<svg className='opacity-70' fill="currentColor" height="14px" width="14px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
          //   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          //   <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          //   <g id="SVGRepo_iconCarrier"> 
          //     <g id="Location-Pin-Filled"> 
          //       <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> 
          //     </g> 
          //   </g>
          // </svg>}
          type='text'
          className='mt-2'
          required={false}
        />

        <ProductElementForm setItems={setItems} />
        <Shipping />
        <ExtraProducts setItems={setItems} />
        <TotalPriceContainer items={items} discountCode={discountCode} />
        
        {/* <p className='font-semibold text-sm mt-6'>Plătești doar când coletul ajunge la tine sau achită cu cardul 💳 și primești un cadou din partea noastră! </p> */}
        <div className='mt-8 flex items-center gap-x-2'>
          <input required id='terms' type="checkbox" className="checkbox checkbox-sm" />
          <label htmlFor='terms' className='hover:cursor-pointer text-sm font-semibold'>Accept <Link href='/termeni' target='_blank' className='link'>termenii si conditiile.</Link></label>
        </div>

        <ContinueButton loading={loading} />
      </form>
    </div>
  )
}

export default CheckoutForm