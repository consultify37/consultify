import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import TiktokPixel from 'tiktok-pixel'

const Success = () => {
  useEffect(() => {
    try {
      TiktokPixel.init('CUQVTSBC77U38KO2EQQG') 
      TiktokPixel.track('CompletePayment', {
        contents: [{
          content_id: "agenda-start-up",
          content_name: 'FLASHCARDS START UP NATION + SEDINTA CONSULTANTA',
          quantity: 1,
          price: 109
        }],
        content_type: 'product',
        value: 109,
        currency: 'RON'
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  return (
    <>
      <Head>
        <title>{`${process.env.SITE} | Mulțumim pentru comanda făcută! 🚀`}</title>
      </Head>
      <div className='relative flex flex-col justify-center items-center min-h-screen p-7 lg:p-28 gap-2 lg:gap-4 text-center'>
        <h1 className='text-[18px] lg:text-[28px] font-bold text-secondary mt-8 lg:mt-12 lg:max-w-[75%] 2xl:max-w-[60%]'>Mulțumim pentru comanda făcută!🚀 Agenda va ajunge la tine în cel mai scurt timp. 😊</h1>
        {/* <h1 className='text-[15px] lg:text-[24px] font-bold text-secondary lg:max-w-[75%]'>Un consultant în accesarea de Fonduri Nerambursabile va lua legătura cu dumneavoastră în curând pentru a stabili întâlnirea de consultanță (online sau fizică).</h1> */}

        <Link
          className='w-full lg:px-16 lg:w-fit self-center rounded-full py-4 bg-primary mt-12 hover:scale-105 transition-all'
          href='/testimoniale'
        >
          <p className='text-onPrimary font-semibold text-[14px] text-center'>Vezi povești de scuces!</p>
        </Link>

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