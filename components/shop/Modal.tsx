import React from 'react'
import { Product } from '../../types'
import Image from 'next/image'
import FillButton from '../buttons/FillButton'
import OutlineButton from '../buttons/OutlineButton'
import { useCartContext } from '../../context/CartContext'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  product: Product | null
}

const Modal = ({ product }: Props) => {
  const { setSelectedProduct } = useCartContext()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      { product && 
        <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)] shadow-2xl z-[1000]'>
          <div className='flex flex-col bg-white shadow-sm rounded-[18px] min-w-[320px] mx-6'>
            <div className='flex flex-row items-center justify-between p-4 lg:p-6 border-b border-[#DAE0FF]'>
              <p className='lg:text-[20px] font-bold'>Produsul a fost adăugat în coș!</p>

              <button onClick={() => setSelectedProduct(null)} className='hover:scale-105 transition-all'>
                <Image 
                  src='/images/x.svg'
                  alt='x'
                  width={64}
                  height={64}
                  className='w-4 h-auto'
                />
              </button>
            </div>
            
            <div className='flex flex-col lg:flex-row'>
              <div className='flex flex-row w-full p-4 lg:p-6 lg:gap-8'>
                <Image
                  src={product.image.image}
                  alt={''}
                  width={152}
                  height={264}
                  className="w-[140px] h-auto lg:w-[160px] object-contain rounded-[12px] mr-4 lg:mr-0"
                />
                
                <div className='flex flex-col relative lg:flex-row lg:gap-8 lg:justify-between w-full mt-2'>
                  <p className='sm:text-[18px] lg:text-[20px] font-bold text-secondary'>{ product.name }</p>
                  <div className='flex flex-col lg:items-end mt-2 lg:mt-0'>
                    {product.onSale && (
                        <p className="text-[#7C9EF8] text-[14px] font-base opacity-90">
                          <s>{product.oldPrice} lei</s>
                        </p>
                      )}
                    <p className="text-price text-[16px] font-bold sm:text-[18px] lg:text-[20px]">
                      {product.price} lei
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2 lg:gap-4 min-w-[260px] m-6'>
                  {
                    pathname && pathname.includes('/shop/cart') ?
                    <FillButton 
                      title='Vezi detalii coș'
                      onClick={() => setSelectedProduct(null) }
                    /> :
                    <FillButton 
                      title='Vezi detalii coș'
                      onClick={() => {setSelectedProduct(null); router.replace('/shop/cart')}}
                    />
                  }
                  
                  <OutlineButton 
                    title='Continuă cumpărăturile'
                    onClick={() => setSelectedProduct(null) }
                  />
                </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal