import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Product } from '../../../types'
import { useCartContext } from '../../../context/CartContext'
import HeartButton from '../HeartButton'
import { calculateCartTotal } from '../../../utils/calculateCartTotal'
import ReactLoading from 'react-loading'
import { useAuthContext } from '../../../context/AuthContext'
import Link from 'next/link'

type Props = {
  products: Product[]
}

const Products = ({ products }: Props) => {
  const { currentUser } = useAuthContext()
  const { handleRemoveProduct } = useCartContext()
  const [isLoading, setIsLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [email, setEmail] = useState(currentUser?.email ? currentUser.email : '')

  useEffect(() => {
    setEmail(currentUser?.email ? currentUser.email : '')
  }, [currentUser])

  

  return (
    <div className="flex flex-col lg:flex-row">
      <div className='flex flex-col lg:w-[70%]'>
        <div className='bg-[#F8F9FF] w-full rounded-[10px] flex flex-row p-4 mt-8'>
          <Image 
            src='/images/Shop/cart/comment-info.svg'
            width={128}
            height={128}
            alt='.'
            className='w-6 h-6 lg:w-7 lg:h-7 mr-4'
          />
          <p className='text-secondary text-[14px] lg:text-[16px]'>Produsele vor fi livrate atât pe adresa de email, in urma confirmării plății, cât și în contul dvs.</p>
        </div>

        <div className='flex flex-col bg-[#F8F8F8] p-4 pt-0 mt-8 rounded-[10px]'>
          { products.map((product) => (
            <div 
              key={product.id}
              className='flex flex-row lg:justify-between bg-[#fff] rounded-[10px] mt-4 p-1 py-2 lg:p-4 lg:pr-8 lg:py-4 lg:pt-6'
            >
              <div className='flex flex-row'>
                <Image 
                  src={product.image.image}
                  width={256}
                  height={256}
                  alt='.'
                  className='w-[80px] lg:w-[130px] lg:h-[150px] h-auto object-contain mr-2 lg:mr-4 self-start'
                />

                <div className='flex flex-col'>
                  <p className='text-secondary font-semibold text-[14px] lg:text-[16px] mt-2 mb-1 lg:max-w-[280px]'>{ product.name }</p>
                  <div className='lg:hidden'>
                    { product.onSale &&
                      <p className="text-[#7C9EF8] text-[14px] font-base opacity-90 line-through font-semibold">
                        {product.oldPrice} lei
                      </p>
                    }
                    <p className='text-[18px] lg:text-[20px] font-bold text-price' >{ product.price }</p>
                  </div>

                  <div className='flex flex-row items-center mt-6 lg:mt-4'>
                    <HeartButton 
                      product={product}
                      size='small' 
                    />
                    <div className='mx-4 border-r-[1px] h-[28px] border-[#BBC9FF]'></div>
                    <button
                      className='text-red-500 text-[14px] font-semibold'
                      onClick={() => handleRemoveProduct(product) }
                    >
                      Șterge din coș
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-2 hidden lg:block'>
                { product.onSale &&
                  <p className="text-[#7C9EF8] text-[14px] font-base opacity-90 line-through font-semibold">
                    {product.oldPrice} lei
                  </p>
                }
                <p className='text-[18px] lg:text-[20px] font-bold text-price' >{ product.price }</p>
              </div>
            </div>
          )) }

          <div className='flex flex-row justify-between items-center mt-6'>
            <p className='font-bold text-secondary lg:text-[20px]'>Subtotal:</p>
            <p className='font-bold text-secondary lg:text-[20px]'>{ calculateCartTotal(products) } lei</p>
          </div>
        </div>
      </div>

      <div className='rounded-[10px] border-2 border-[#F2F4FF] p-4 py-6 mt-8 h-fit lg:ml-8 lg:w-[30%]'>
        <p className='text-secondary font-bold text-[18px]'>Sumar comandă</p>
        <div className='flex flex-row justify-between items-center mt-6'>
          <p className='font-semibold text-secondary'>Subtotal:</p>
          <p className='font-semibold text-secondary'>{ calculateCartTotal(products) } lei</p>
        </div>
        <div className='flex flex-row justify-between items-center mt-2'>
          <p className='font-semibold text-secondary'>Cost livrare:</p>
          <p className='font-semibold text-[#04D200]'>Gratuită</p>
        </div>

        <div className='border-t border-[#DAE0FF] mt-6 flex flex-col items-center'>
          <div className='flex flex-row justify-between items-center mt-6 w-full'>
            <p className='font-semibold text-secondary'>Total final:</p>
            <p className='font-semibold text-secondary'>{ calculateCartTotal(products) } lei</p>
          </div>
          
          { showInput &&
            <>
              <p className='font-semibold text-secondary self-start mt-4 mb-2'>Introdu adresa ta de email</p>
              <input 
                className='text-[14px] p-2 rounded-xl border-2 border-primary outline-none w-full '
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                type='email'
              />
            </>
          }

          { !isLoading ?
            <Link
              href='/shop/detali-comanda'
              className='py-3 lg:py-4 w-full bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-6'
            >
              <p className='text-onPrimary font-semibold text-[14px]'>Plasează comanda</p>
            </Link> :
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mt-6' />
          }
        </div>
      </div>
    </div>
  )
}

export default Products