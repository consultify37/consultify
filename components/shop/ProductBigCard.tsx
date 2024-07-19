import React from 'react'
import { Product } from '../../types'
import Image from 'next/image'

type Props = {
  product: Product
}

const ProductBigCard = ({ product }: Props) => {
  return (
    <div key={product.id} className='bg-white rounded-[12px] flex flex-col lg:flex-row lg:justify-between mt-4 lg:mt-6 p-4 lg:px-8 w-full'>
      <div className='flex flex-row sm:items-center w-full'>
        <Image
          src={product.image.image}
          alt={''}
          width={152}
          height={264}
          className="w-[100px] h-auto lg:w-[160px] lg:h-[180px] object-contain rounded-[12px]"
        />
        <div className='flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between w-full mt-2 ml-2 sm:mt-0 sm:ml-6'>
          <p className='sm:text-[18px] lg:text-[20px] font-bold text-secondary'>{ product.name }</p>
          <div>
            <p className="text-price text-[16px] font-bold mt-4 lg:mt-0 sm:text-[18px] lg:text-[20px]">
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
  )
}

export default ProductBigCard