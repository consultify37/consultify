import Link from 'next/link'
import React from 'react'

const CTAButton = () => {
  return (
    <Link href="#" className='flex flex-col rounded-md items-center py-[10px] active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2'>
      <span className='text-xl font-bold'>COMANDĂ ACUM</span>
      <span className='text-sm'>+ Ședința de consultanță gratuită</span>
    </Link>
  )
}

export default CTAButton