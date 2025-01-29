import React, { useEffect, useState } from 'react'

const ContinueButton = () => {
  const [isBouncing, setIsBouncing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing(true)
      // Remove the bounce class after 2.5 second (duration of the bounce)
      setTimeout(() => setIsBouncing(false), 2500)
    }, 10000) // 10 seconds interval

    return () => clearInterval(interval)
  }, [])

  return (
    <button type='submit' className={`${isBouncing ? "animate-bounce" : ""} flex mt-8 flex-col rounded-md shadow-md items-center py-3 active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2`}>
      <span className='text-lg font-bold'>👉 Finalizează comanda 👈</span>
    </button>
  )
}

export default ContinueButton