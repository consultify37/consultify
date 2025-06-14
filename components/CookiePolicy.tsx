import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const CookiePolicy = () => {
  const [consentRequested, setConsentRequested] = useState<any>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const response = Cookies.get('policy-accepted') 

    if (response == 'true') {
      setConsentRequested(true)
    } else {
      setConsentRequested(false)
    }

    setLoaded(true)
  }, [])

  const handleAccept = () => {
    Cookies.set('policy-accepted', 'true')
    setConsentRequested(true)
  }

  const handleRefuse = () => {
    Cookies.set('policy-accepted', 'false')
    setConsentRequested(false)
  }

  return (
    <>
      { consentRequested &&
        <>
          <GoogleAnalytics gaId='G-4C611TDECB'/>
          <GoogleTagManager gtmId='GTM-TNQ5NR9B' />
        </>
      }
      {
        (consentRequested == null && loaded) ?
        <div className="bg-white fixed bottom-6 md:bottom-8 right-0 rounded-xl shadow-2xl p-8 flex flex-col items-center z-[9999] mx-4 w-[calc(100%-32px)] max-w-[440px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row items-center">
              <Image 
                alt="mini-cookie"
                src="/images/mini-cookie.svg"
                height={24}
                width={24}
                className="w-6 h-6"
              />
              <p className="text-base font-bold text-secondary ml-4">Acest site folosește cookies</p>
              </div>
            {/* <Image 
              alt="x"
              src="/images/x.svg"
              height={11}
              width={11}
              className="w-[14px] h-[14px] hover:scale-105 transition-all cursor-pointer"
              onClick={handleAccept}
            /> */}
          </div>
          <p className="font-[14px] mt-4 text-secondary">Continuarea navigării reprezintă acceptul dvs. pentru această folosință. Pentru mai multe detalii privind gestionarea preferințelor privind cookie-uri, vedeți <Link href='/politica-cookie' target="_blank" className="underline text-blue-600">Politica de utilizare cookie-uri</Link></p>

          <div className="flex flex-row gap-x-4 w-full">
            <button
              className="p-4 w-full rounded-xl bg-white  mt-4 hover:scale-105 transition-all"
              onClick={handleRefuse}
            >
              <p className="text-base font-semibold text-primary">Refuz</p>
            </button>
            <button
              className="p-4 w-full rounded-xl bg-primary mt-4 hover:scale-105 transition-all"
              onClick={handleAccept}
            >
              <p className="text-base font-semibold text-white">Accept</p>
            </button>
          </div>
        </div> : null
      } 
    </>
  )
}

export default CookiePolicy