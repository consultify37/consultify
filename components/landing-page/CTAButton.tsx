import React, { useState } from 'react'
import { storefrontApiClient } from '../../utils/shopify/storeFrontApiClient'
import { useRouter } from 'next/navigation'

const CTAButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const createCart = async () => {
    setLoading(true)

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
          lines: [{ merchandiseId: "gid://shopify/ProductVariant/49997034619201"}],
        }
      }

      const response: any = await storefrontApiClient(query, variables)
      console.log(response.data)
      router.push(response.data.cartCreate.cart.checkoutUrl)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  return (
    <button onClick={createCart} className='flex flex-col rounded-md shadow-md items-center py-[10px] active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2'>
      <span className='text-xl font-bold'>COMANDĂ ACUM</span>
      <span className='text-sm'>+ Ședința de consultanță gratuită</span>
    </button>
  )
}

export default CTAButton