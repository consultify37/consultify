import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
  to: string
}

const Dots = ({ to }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <Image
        src='/images/admin/horizontal-dots.svg'
        width={18}
        height={4}
        alt='horizontal-dots'
        className='w-6 h-auto cursor-pointer hover:scale-105 transition-all py-4'
        onClick={() => setIsOpen(!isOpen)}
      />
      {
        isOpen ?
        <Link href={to} className='absolute -bottom-8 -left-20 p-2 px-8 bg-white shadow-md rounded-md hover:scale-105 transition-all'>
          <p className='text-secondary'>detalii</p>
        </Link> : null 
      }
    </div>
  )
}

export default Dots