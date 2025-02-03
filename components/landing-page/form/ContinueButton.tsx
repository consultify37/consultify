import React, { useEffect, useState } from 'react'

type Props = {
  loading: boolean
}

const ContinueButton = ({ loading }: Props) => {
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
    <div className='w-full mt-8 h-[56px] flex items-center justify-center'>
      { loading ?
        <span className="loading loading-spinner loading-md"></span> :
        <button type='submit' className={`${isBouncing ? "animate-bounce" : ""} flex flex-col rounded-md shadow-md items-center py-3 active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2`}>
          <span className='text-lg font-bold'>👉 Finalizează comanda 👈</span>
        </button>
      }
    </div>
  )
}

export default ContinueButton