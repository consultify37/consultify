import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const StartUp2024PopUp = () => {
  const [closed, setClosed] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const response = Cookies.get('pop-up-closed') 

    if (response) {
      setClosed(true)
    } else {
      setClosed(false)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set('pop-up-closed', 'true')
    setClosed(true)
  }
  console.log(loaded)
  return (
    <>
      { closed ? null :
        <div className='fixed w-full h-full flex items-center z-[1000] justify-center bg-black bg-opacity-20' style={{opacity: loaded ? 100 : 0}}>
          <div className='relative'>
            <Image 
              src="/landing-page/images/pop-up.png" 
              width={1024}
              height={1024}
              alt="StartUp2024"
              onLoad={() => setLoaded(true)}
              className='w-[416px] sm:w-[600px] md:w-[700px] h-auto' 
            />
            <Link href='/shop-fizic/agenda-start-up' className='py-4 bg-[#8717F8] text-center rounded-[28.5px] font-semibold px-12 text-sm md:text-[16px] w-fit transition-all hover:scale-[1.05] absolute bottom-16 sm:bottom-32 shadow-md shadow-primary text-white left-[34%] sm:left-[39%]'>
              Vezi acum
            </Link>
            <button className='absolute top-0 sm:top-8 right-0' onClick={handleAccept}>
              <Image 
                src="/landing-page/images/close-circle-svgrepo-com.png" 
                width={64}
                height={64}
                alt="Close"
                className='w-12 h-12'
              />
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default StartUp2024PopUp