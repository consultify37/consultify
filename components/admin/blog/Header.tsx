import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row items-center justify-between'>
        <h1 className='text-secondary font-bold text-[28px]'>Toate articolele</h1>
        
        <Link
          href='/admin/blog/edit'
          className='rounded-xl bg-primary text-onPrimary font-semibold flex p-4 px-14 items-center justify-center hover:scale-[1.05] transition-all'
        >
          Articol nou
        </Link>
      </div>
  )
}

export default Header