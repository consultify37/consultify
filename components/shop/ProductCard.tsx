import Link from 'next/link'
import React, { MouseEvent, RefObject } from 'react'
import { Product } from '../../types'
import Image from 'next/image'
import { useCartContext } from '../../context/CartContext'

type Props = {
  cardRef?: RefObject<any>
  product: Product
  hasMargin: boolean
  className?: string
}

const ProductCard = ({ cardRef, product, hasMargin, className }: Props) => {
  const { handleAddProduct } = useCartContext()
  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    handleAddProduct(product)
  }

  return (
    <Link
      ref={cardRef ? cardRef : null}
      key={product.id}
      href={`/shop/product/${product.id}`}
      className={`p-2 pb-4 bg-[#F2F4FF] rounded-[16px] h-full shadow-lg flex flex-col gap-6 snap-center ${ className ? className : ''}`}
      style={{marginRight: hasMargin ? 24 : 0}}
    >
      <div className="relative h-[250px]">
        <Image
          src={product.image.image}
          alt="cart image"
          placeholder="blur"
          blurDataURL="/images/whyus-cart-image.png"
          width={152}
          height={264}
          className="mx-auto absolute w-full h-full object-contain rounded-[16px] p-2"
        />
      </div>
      <div className="flex flex-row products-center w-full justify-between px-2 mt-auto">
        <div className="flex flex-col w-full gap-1 mr-1">
          <p className="text-price text-[16px] font-bold">
            {" "}
            {product.price} lei{" "}
            {product.onSale && (
              <s className="text-[#7C9EF8] text-[14px] font-base opacity-90">
                {product.oldPrice} lei
              </s>
            )}{" "} 
          </p>
          <h4 className="text-[#260056] font-bold text-base">
            {product.name}
          </h4>
        </div>

        <button
          onClick={addToCart}
          className="w-11 h-11 min-w-[44px] flex items-center justify-center rounded-full bg-primary hover:scale-105 transition-all"
        >
            <Image 
              src='/images/cart.svg'
              width={32}
              height={32}
              alt="."
              className="w-[16px] h-[16px]"
            />
        </button>
      </div>
    </Link>
  )
}

export default ProductCard