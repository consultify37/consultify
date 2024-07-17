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
        <h1 className='lg:text-[32px] font-bold text-secondary'>De asemenea, produsele sunt disponibile și în { currentUser ? <Link href='/cont/comenzi' className='underline underline-offset-1'>contul tău</Link> : 'contul tău'}.</h1>

        { !currentUser && 
          <>
            <Link 
              href={'/login'}
              className='px-16 py-3 lg:py-4 w-full max-w-[400px] bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8'
            >
              <p className='text-onPrimary font-semibold text-[14px] lg:text-16px'>Intră în cont</p>
            </Link>

            <p className='text-[#959595] text-[14px] text-center max-w-[420px] mt-8'>Dacă până acum nu ai avut cont pe platforma Inspirely, ți-am creat unul nou, iar datele de logare le găsești pe mail.</p>
          </>
        }

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