import React, { useEffect, useState } from 'react'

type Props = {
  setItems: React.Dispatch<React.SetStateAction<{
    handle?: string
    name: string
    price: number
    image: string
    merchandiseId: string
    quantity?: number
  }[]>>
  setHasSurpriseProduct: React.Dispatch<React.SetStateAction<boolean>>
  setHasPrioritizeProduct: React.Dispatch<React.SetStateAction<boolean>>
}

const extraProducts = [
  {
    handle: 'surprise',
    name: 'Produs surpriză ✨', 
    merchandiseId: "gid://shopify/ProductVariant/54299423506776",
    image: '',
    price: 9.99,
    quantity: 1
  },
  {
    handle: 'prioritize',
    name: 'Prioritizează comanda mea 😊', 
    merchandiseId: "gid://shopify/ProductVariant/54299425931608",
    image: '',
    price: 5,
    quantity: 1
  },
]

const texts = {
  "surprise": 'Adaugă produs surpriză pentru 9.99 lei ✨',
  "prioritize": 'Prioritizează comanda mea pentru 5 lei 😊'
}

const ExtraProducts = ({ setItems, setHasPrioritizeProduct, setHasSurpriseProduct }: Props) => {
  const [counter, setCounter] = useState(0)
  
  const handleClick = (e: any) => {
    const product = extraProducts.find((item) => item.handle == e.target.id)!
    
    if (e.target.checked) {
      setItems((items) => [product, ...items])
    } else {
      setItems((items) => items.filter((item) => item.handle != product.handle))
    }

    if (e.target.id === 'surprise') {
      setHasSurpriseProduct(e.target.checked)
    } else if (e.target.id === 'prioritize') {
      setHasPrioritizeProduct(e.target.checked)
    }
  }

  return (
    <div className='mt-4 space-y-4 w-full'>
      { extraProducts.map((product) => (
        <div key={product.merchandiseId} className='border-2 border-secondary bg-admin-background p-4 rounded-lg w-full flex items-center gap-x-2'>
          <input onChange={handleClick} id={product.handle} type="checkbox" className="checkbox checkbox-sm" />
          <label htmlFor={product.handle} className='text-sm font-semibold hover:cursor-pointer'>{texts[product.handle as 'surprise' | 'prioritize']}</label>
        </div>
      ))}
    </div>
  )
}

export default ExtraProducts