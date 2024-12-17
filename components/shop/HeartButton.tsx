import Image from 'next/image'
import React, { useState } from 'react'
import { useFavoritesContext } from '../../context/FavoritesContext'
import { Product } from '../../types'
import TiktokPixel from 'tiktok-pixel'

type Props = {
  product: Product
  size?: 'small' | 'big'
}

const HeartButton = ({ product, size='big' }: Props) => {
  const { favorites, handleRemoveProductFromFavorites, handleAddProductToFavorites } = useFavoritesContext()
  const [isLiked, setIsLiked] = useState( favorites.findIndex((item) => item.id == product.id ) != -1 ? true : false )

  const handleButtonClicked =() => {
    if ( !isLiked ) {
      TiktokPixel.track('AddToWishlist', {
        contents: [{
          content_id: product.id,
          content_name: product.name,
          quantity: 1,
          price: product.price
        }],
        content_type: 'product',
        value: product.price,
        currency: 'RON'
      })
      handleAddProductToFavorites(product)
      setIsLiked(!isLiked)
    } else {
      handleRemoveProductFromFavorites(product)
      setIsLiked(!isLiked)
    }
  }

  return (
    <>
      { size == 'big' ?
        <button 
          onClick={handleButtonClicked}
          className='bg-[#EAEDFF] h-[45px] w-[45px] min-w-[45px] lg:h-[58px] lg:w-[58px] lg:min-w-[58px] rounded-full flex justify-center items-center hover:scale-105 transition-all'
        >
          <Image 
            src={isLiked ? '/images/Shop/filled-heart.svg' : '/images/Shop/heart.svg'}
            width={32}
            height={32}
            alt='.'
            className='w-4 h-4 lg:w-5 lg:h-5'
          />
        </button> :
        <button 
          onClick={handleButtonClicked}
          className='bg-[#EAEDFF] h-[34px] w-[34px] min-w-[34px] rounded-full flex justify-center items-center hover:scale-105 transition-all'
        >
          <Image 
            src={isLiked ? '/images/Shop/filled-heart.svg' : '/images/Shop/heart.svg'}
            width={32}
            height={32}
            alt='.'
            className='w-3 h-3'
          />
        </button>
      }
    </>
  )
}

export default HeartButton