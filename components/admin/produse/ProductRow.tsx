import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Product } from '../../../types'

type Props = {
  product: Product
  handleDelete: (product: Product) => Promise<void>
}

const ProductRow = ({ product, handleDelete }: Props) => {
  return (
    <tr className='bg-admin-card'>
      <td className='pl-8 rounded-s-lg'>
        <Image
          src={product.image.image}
          width={512}
          height={512}
          alt={product.name}
          className='w-24 h-24 rounded-lg py-3 object-contain'
        />
      </td>
      <td className='py-4 font-bold text-secondary'>{product.name}</td>
      <td className='py-4 font-bold text-primary'>
        { product.price }
        <span className='text-[#7C9EF8] font-semibold text-[14px] line-through ml-2'>{ product.oldPrice }</span>
      </td>
      <td className='py-4 font-bold text-secondary' >{ product.category }</td>
      <td className='py-4 font-bold' style={{color: product.active ? '#04D200' : '#FF0F0F'}} >{ product.active ? 'activ' : 'inactiv' }</td>
      <td className='rounded-e-lg'>
        <div className='flex flex-row items-center'>
          <Link
            href={`/admin/produse/edit/${product.id}`}
            className='bg-[#EAEDFF] rounded-lg p-2 px-4 mr-2 hover:scale-105 transition-all'
          >
            <p className='text-[16px] font-semibold text-secondary'>editează</p>
          </Link>
          <button 
            onClick={() => handleDelete(product)}
            className='bg-[#EAEDFF] rounded-md p-2 hover:scale-105 transition-all'
          >
            <Image 
              src='/images/admin/trash.svg'
              width={16}
              height={16}
              alt='thrash'
              className='w-5 h-5'
            />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow