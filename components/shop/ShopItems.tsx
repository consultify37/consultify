import React, { useState } from 'react'
import { Product, ProductCategory } from '../../types'
import ShopItem from './ShopItem'
import { Pagination, PaginationBlog } from '../../utils/functions'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  products: Product[]
  categories: ProductCategory[]
}

const ShopItems = ({ products, categories }: Props) => {
  const [page, setPage] = useState(0)
  const maxPages = Math.ceil(categories.length/4)

  return (
    <div className=''>
      { PaginationBlog(categories, page, 4).map((category) => (
        products.reduce((prev, curr) => (curr.category == category.category ? prev + 1 : prev ),  0) != 0 ?
        <ShopItem 
          key={category.description}
          category={category}
          products={products.filter((product) => product.category == category.category )}
        /> : null
      )) }

      <div className='mt-16 md:mt-24 md:-mb-6 flex items-center justify-center w-full gap-2'>
        <RiArrowLeftSLine size={24} onClick={() => setPage(0)} className={`${page === 0 ? 'text-[#CDCDCD]' : 'text-secondary'} cursor-pointer`} />
        {
            maxPages > 0 &&
                Array.from({length: maxPages}, (_, i) =>
                    <p key={i} onClick={() => setPage(i)} className={`${i === page ? 'bg-secondary text-white' : 'text-secondary'} cursor-pointer h-8 w-8 rounded-full flex items-center justify-center`}>{i+1}</p>
                )
        }
        <RiArrowRightSLine size={24} onClick={() => setPage(maxPages-1)} className={`${page === maxPages - 1 ? 'text-[#CDCDCD]' : 'text-secondary'} cursor-pointer`} />
      </div>
    </div>
  )
}

export default ShopItems

// products.filter((product) => product.category == category.category )