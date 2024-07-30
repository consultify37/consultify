import React from 'react'
import { Product } from '../../types'
import Image from 'next/image'
import Button from './Button'
import { useCartContext } from '../../context/CartContext'

type Props = {
  product: Product
}

const ProductCTA = ({ product }: Props) => {
  const { handleAddProduct } = useCartContext()

  return (
    <div className='relative flex flex-col lg:flex-row lg:items-center w-full p-4 py-12 mt-6 lg:mt-16 rounded-[22px] lg:rounded-none bg-secondary lg:px-[80px] xl:px-[180px] 2xl:px-[276px]'>
      <Image 
        src={product.image.image}
        width={512}
        height={512}
        alt={product.name}
        className='w-full h-[250px] lg:h-[270px] xl:h-[300px] 2xl:h-[320px] object-contain self-center '
      />

      <div className='flex flex-col w-full lg:mr-8'>
        <h1 className='text-[24px] lg:text-[32px] font-bold self-center lg:self-start text-onSecondary mt-6 lg:mt-0'>{product.name}</h1>
        <div className='flex flex-row items-center self-center lg:self-start mt-2 lg:mt-4 mb-6 lg:mb-8'>
          <p className='text-[24px] lg:text-[32px] font-bold text-price mr-2' >{ product.price } lei</p>
          { product.onSale &&
            <p className="text-[#7C9EF8] text-[14px] font-base opacity-90 line-through font-semibold">
              {product.oldPrice} lei
            </p>
          }
        </div>
        <Button 
          onClick={() => handleAddProduct(product)}
        />
      </div>

      <Image 
        src='/images/Shop/Ellipse 34.svg'
        width={128}
        height={128}
        alt='.'
        className='absolute hidden lg:block top-0 left-0 w-[205px] h-[205px] xl:w-[255px] xl:h-[255px]'
      />
      <Image 
        src='/images/Shop/Ellipse 38.svg'
        width={128}
        height={128}
        alt='.'
        className='absolute hidden lg:block top-0 right-0 w-[205px] h-[205px] xl:w-[255px] xl:h-[255px]'
      />
      <Image 
        src='/images/Shop/Polygon 2 (2).svg'
        width={128}
        height={128}
        alt='.'
        className='absolute hidden lg:block bottom-12 lg:right-48 xl:right-56 right-72 w-[80px] h-[80px] xl:w-[114px] xl:h-[114px]'
      />
    </div>
  )
}

export default ProductCTA