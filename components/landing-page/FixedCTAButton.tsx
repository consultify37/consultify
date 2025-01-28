import React, { useEffect, useState } from 'react'
import CTAButton from './CTAButton'

const FixedCTAButton = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if ( currentScrollPos > 760 ) {
      document.querySelector('.bottom_cta')!.classList.add('bottom_cta_down')
      document.querySelector('.bottom_cta')!.classList.remove('bottom_cta_up')
    } else {
      document.querySelector('.bottom_cta')!.classList.add('bottom_cta_up')
      document.querySelector('.bottom_cta')!.classList.remove('bottom_cta_down')
    }
    
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    } 
  }, [prevScrollPos])
  
  return (
    <div className='fixed bottom-0 z-10 bottom_cta_up w-full flex flex-col items-center bottom_cta'>
      <div className='w-full bg-white flex flex-col shadow-3xl border-secondary border border-b-0 items-center py-6 rounded-t-[20px]'>
        <div className='w-full max-w-lg px-8'>
          <CTAButton />
        </div>
      </div>
    </div>
  )
}

export default FixedCTAButton