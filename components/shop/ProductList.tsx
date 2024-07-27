import React, { useState } from 'react'
import { Product } from '../../types'
import ProductCard from './ProductCard'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { PaginationBlog } from '../../utils/functions'
import NewsLetter from '../global/newsletter'

type Props = {
  products: Product[]
}

const selections = [
  {
    code: "popularity",
    name: "Cele mai populare"
  },
  {
    code: "price-up",
    name: "Preț crescător"
  },
  {
    code: "price-down",
    name: "Preț descrescător"
  },
  {
    code: "newest",
    name: "Cele mai noi"
  }
]

const ProductList = ({ products }: Props) => {
  const [selector, setSelector] = useState("popularity")
  const [page, setPage] = useState(0)
  const maxPages = Math.ceil(products.length/12)

  const sort = (product1: Product, product2: Product) => {
    const product1_sells = product1.sells_number ? product1.sells_number : 0
    const product2_sells = product2.sells_number ? product2.sells_number : 0

    switch (selector) {
      case "popularity":
        return product2_sells - product1_sells
        break
      case "price-up": 
        return product1.price - product2.price
        break
      case "price-down":
        return product2.price - product1.price
        break
      case "newest":
        return product2.lastUpdated - product1.lastUpdated
      default:
        return 0
    }
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <select 
        className="bg-transparent text-secondary text-[16px] appearance-[menulist-button] font-semibold outline-none mt-10 self-center sm:self-end cursor-pointer" 
        name="categorie"
        onChange={(e) => setSelector(e.target.value)}
        value={selector}
      >
          {selections.map((selector) => (
            <option 
              key={selector.code}
              value={selector.code} 
            >
              Sortează după: {selector.name}
            </option>
          ))}
      </select>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-8 mt-8 md:mt-10 max-w-[320px] sm:max-w-none'>
        { products &&
          PaginationBlog(products.toSorted(sort), page, 12).map((item) => (
            <ProductCard
              key={item.id} 
              hasMargin={false}
              product={item}
              className='w-full sm:max-w-[320px] sm:mx-0'
            />
          ))
        }
      </div>

      <div className='mt-16 md:mt-24 flex items-center justify-center w-full gap-2'>
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

export default ProductList