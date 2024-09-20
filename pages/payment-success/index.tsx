import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Success = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/testimoniale')
    }, 14000)
  }, [router])
  return (
    <>
      <Head>
        <title>{`${process.env.SITE} | Plată efectuată`}</title>
      </Head>
      <div className='relative flex flex-col justify-center items-center min-h-screen p-7 lg:p-28 gap-2 lg:gap-4 text-center'>
        <h1 className='lg:text-[32px] font-bold text-secondary mt-12'>Vă multumim! plata a fost inregistrată cu succes.</h1>
        <h1 className='lg:text-[32px] font-bold text-secondary lg:max-w-[75%]'> Un Specialist in Consiliere Fonduri vă va contacta în curând pentru a stabili întâlnirea (online sau fizică).</h1>

        <Link 
              href={'/testimoniale'}
              className='px-16 py-3 lg:py-4 w-full max-w-[400px] bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8'
            >
              <p className='text-onPrimary font-semibold text-[14px] lg:text-16px'>Vezi povești de succes!</p>
            </Link>

            <p className='text-[#959595] text-[14px] text-center max-w-[460px] mt-8'>În 15 secunde veți fi redirecționat automat către pagina Testimoniale.</p>

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