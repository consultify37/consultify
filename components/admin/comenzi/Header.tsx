import Link from 'next/link'
import React from 'react'

type Props = {
}

const Header = ({  }: Props) => {
  return (
    <div className='flex flex-row items-center justify-between'>
      <h1 className='text-secondary font-bold text-[28px]'>Comenzi Shop Fizic</h1>   
    </div>
  )
}

export default Header