import React from 'react'

const Shipping = () => {
  return (
    <div className='rounded-md border w-full border-[#E4E4E4] p-4 mt-4 flex items-center gap-x-4'>
      <input type="radio" name="radio-1" className="radio w-[18px] h-[18px]" defaultChecked />
      <p className='text-sm font-semibold'>Transport gratuit</p>
    </div>
  )
}

export default Shipping