import Link from "next/link"
import { useEffect, useState } from "react";
import TiktokPixel from "tiktok-pixel";

const CTAButton = () => {
  const [isBouncing, setIsBouncing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing(true)
      // Remove the bounce class after 2.5 second (duration of the bounce)
      setTimeout(() => setIsBouncing(false), 2500)
    }, 10000) // 10 seconds interval

    return () => clearInterval(interval)
  }, [])


  const openModal = () => {
    try {
      TiktokPixel.track('InitiateCheckout', {
        contents: [{
          content_id: "gid://shopify/ProductVariant/54299416691032",
          content_name: 'FLASHCARDS START UP NATION + SEDINTA CONSULTANTA',
          quantity: 1,
          price: 79
        }],
        content_type: 'product',
        value: 79,
        currency: 'RON'
      })
    } catch (e) {
      console.log(e)
    }

    const element = document.getElementById('my_modal_1') as any
    element.showModal()
  }

  return (
    <button 
      onClick={openModal}
      // href='/shop-fizic/checkout-form' 
      className={`${isBouncing ? "animate-bounce" : ""} flex flex-col rounded-md shadow-md items-center py-[10px] active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2`}
    >
      <span className='text-xl font-bold'>COMANDĂ ACUM</span>
      <span className='text-sm'>Nu rata Start-Up Nation 2025!</span>
      <p className="hidden animate-bounce"></p>
    </button>
  )
}

export default CTAButton