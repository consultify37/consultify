import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import Image from 'next/image'

const Success = () => {
  const { currentUser } = useAuthContext()
  return (
    <>
      <Head>
        <title>{`${process.env.SITE} | Comandă realizată `}</title>
      </Head>
      <div className='relative flex flex-col justify-center items-center min-h-screen p-7 lg:p-28 gap-2 lg:gap-4 text-center'>
        <h1 className='lg:text-[32px] font-bold text-secondary mt-12'>Îți mulțumim pentru comanda făcută!</h1>
        <h1 className='lg:text-[32px] font-bold text-secondary'>Ți-am trimis un email atât cu produsele, cât și cu pașii de utilizare.</h1>
        <h1 className='lg:text-[32px] font-bold text-secondary'>De asemenea, produsele sunt disponibile și în <Link href={currentUser ? '/cont/comenzi' : '/login'} className='underline underline-offset-1'>contul tău</Link>.</h1>

        <Image
          src='/images/success/Polygon 3 (5).svg'
          width={256}
          height={256}
          alt='.'
          className='absolute w-[127px] lg:w-[212px] h-auto left-0 top-20 lg:top-12'
        />
        <Image
          src='/images/success/Ellipse 19 (4).svg'
          width={256}
          height={256}
          alt='.'
          className='absolute w-[80px] lg:w-[120px] h-auto right-0 -top-16 lg:top-24'
        />
        <Image
          src='/images/success/Polygon 4.svg'
          width={256}
          height={256}
          alt='.'
          className='absolute w-[80px] xl:w-[140px] h-auto right-4 bottom-28 lg:right-24 lg:bottom-28'
        />
      </div>
    </>
  )
}

export default Success