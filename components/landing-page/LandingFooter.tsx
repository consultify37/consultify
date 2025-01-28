import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingFooter = () => {
  return (
    <footer className='mt-20 mb-36 w-full'>
      <div className='flex flex-row gap-2 mt-4 w-full'>
        <Link href='https://anpc.ro/ce-este-sal/' target="_blank">
          <Image src='/images/anpc.png' alt='Anpc logo' width={180} height={49} className='w-full aspect-auto' />
        </Link>
        <Link href='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage' target="_blank">
          <Image src='/images/litigii.png' alt='Litigii logo' width={180} height={49} className='w-full aspect-auto' />
        </Link>
      </div>

      <ul className='list-none flex flex-col gap-2 items-center mt-8 text-base underline font-semibold'>
        <li>
          <Link href='/termeni' target='_blank' className=''>Termeni și Condiții</Link>
        </li>
        <li>
          <Link href='/politica-cookie' target='_blank'  className=''>Politica Cookies</Link>
        </li>
        <li>
          <Link href='/politica-confidentialitate' target='_blank'  className=''>Politica de  Confidențialitate</Link>
        </li>
    </ul>
    </footer>
  )
}

export default LandingFooter