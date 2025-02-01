import React, { useEffect, useState } from 'react'

const Timer = () => {
  const [secondsLeft, setSecondsLeft] = useState(720)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev != 0 ? prev - 1 : prev)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  return (
    <div className='bg-[#FFE7E7] border-2 border-[#FF7474] mt-6 rounded-md flex flex-col items-center p-4'>
      <p className='text-[#FF0000] text-[17px] font-semibold'>🔥 REDUCEREA EXPIRĂ ÎN</p>
      <div className='flex items-center gap-x-6 mt-4'>
        <div className='flex flex-col items-center'>
          <p className='text-[#FF0000] font-black text-4xl'>{Math.floor(secondsLeft/60)}</p>
          <p className='text-[15px] font-semibold'>minute</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-[#FF0000] font-black text-4xl'>{secondsLeft%60}</p>
          <p className='text-[15px] font-semibold'>secunde</p>
        </div>
      </div>
    </div>
  )
}

export default Timer