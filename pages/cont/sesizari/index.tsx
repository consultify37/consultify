import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../components/AccountLayout'
import ReCAPTCHA from 'react-google-recaptcha'
import ReactLoading from 'react-loading'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useAuthContext } from '../../../context/AuthContext'

const Sesizari = () => {
	const { currentUser } = useAuthContext()
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [nume, setNume] = useState(currentUser && currentUser.name ? currentUser.name : "")
  const [prenume, setPrenume] = useState('')
  const [email, setEmail] = useState(currentUser ? currentUser.email : "")
  const [message, setMessage] = useState('')
  const [telefon, setTelefon] = useState(currentUser && currentUser.phone ? currentUser.phone : "")
  const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		setNume(currentUser && currentUser.name ? currentUser.name : "")
		setTelefon(currentUser && currentUser.phone ? currentUser.phone : "")
		setEmail(currentUser && currentUser.email ? currentUser.email : "")
	}, [currentUser])

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isChecked) {
        toast.error('Acceptă termenii și condițiile mai întăi.')
        setIsLoading(false)
        return
    }

    if (!captchaVerified) {
        toast.error('Verifică Captcha mai întăi.')
        setIsLoading(false)
        return
    }

    try {
        const collectionRef = collection(db, 'complaints')

        await addDoc(collectionRef, { nume, prenume, telefon, email, website: process.env.SITE, createdAt: serverTimestamp(), message } )

        toast.success(`Mulțumim! Un reprezentant ${process.env.SITE} va verifica sesizarea ta.`, { duration: 5000, style: { textAlign: 'center' } })
        setEmail("")
        setIsChecked(false)
        setNume('')
        setPrenume('')
        setTelefon('')
        setMessage('')

    } catch (e) {
        setIsLoading(false)
        toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }

    setIsLoading(false)
  }

  return (
    <AccountLayout pathName='sesizari'>
      <div className='w-full lg:ml-12'>
        <h1 className='text-base mt-6 lg:mt-0 lg:text-[20px] font-bold text-secondary'>Sesizări</h1>

        <form 
            className="flex flex-col mt-6  max-w-[540px]"
            onSubmit={upload}
        >
            <div className="flex w-full flex-col items-center sm:flex-row justify-between mb-6">
                <div className="flex flex-col w-full">
                    <span className="text-[14px] text-secondary mb-2 font-semibold">
                        Nume*
                    </span>
                    <input
                        required 
                        type="text"
                        name="Nume"
                        className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                        placeholder="ex: Popescu"
                        onChange={(e) => setNume(e.target.value)}
                        disabled={true}
                        value={nume}
                    />
                </div>
                {/* <div className="flex flex-col w-full md:w-[47%]">
                    <span className="text-[14px] text-secondary mb-2 font-semibold">
                        Prenume*
                    </span>
                    <input
                        required 
                        type="text"
                        name="Prenume"
                        className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                        placeholder="ex: Andrei"
                        onChange={(e) => setPrenume(e.target.value)}
                        value={prenume}
                    />
                </div> */}
            </div>
            <div className="flex w-full flex-col items-center justify-between mb-6">
                {/* <div className="flex flex-col w-full md:mr-2">
                    <span className="text-[14px] text-secondary mb-2 font-semibold">
                        Telefon*
                    </span>
                    <PhoneInput
                        defaultCountry="ro"
                        value={telefon}
                        name="Telefon"
                        required
                        onChange={(phone) => setTelefon(phone)}
                        className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 mb-6 outline-none"
                    />
                </div> */}
                <div className="flex flex-col w-full">
                    <span className="text-[14px] text-secondary mb-2 font-semibold">
                        Email
                    </span>
                    <input
                        required 
                        type="email"
                        name="Email"
                        className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                        placeholder="ex: exemplu@email.com"
                        onChange={(e) => setEmail(e.target.value)}
												disabled={true}
                        value={email}
                    />
                </div>
								<div className="flex flex-col w-full mt-6">
                    <span className="text-[14px] text-secondary mb-2 font-semibold">
                        Telefon
                    </span>
                    <input 
                        type="tel"
                        name="Telefon"
                        className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                        placeholder="ex: 0770 123 456"
                        onChange={(e) => setTelefon(e.target.value)}
                        value={telefon}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full mt-4 my-6">
                <span className="text-[14px] text-secondary mb-2 font-semibold">
                    Oferă-ne câteva detalii*
                </span>
                <textarea
                    className="rounded-xl w-full bg-[#fff] h-48 border-[#8717F8] text-ms border-2 p-[14px] outline-none" 
                    placeholder="Scrie aici mesajul tău"
                    required
                    name="Detalii"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
            </div>
            <div className="flex items-center justify-center mb-6 self-center ml-1">
                <input 
                    checked={isChecked} onChange={(e) => setIsChecked(!isChecked) }
                    id="link-checkbox" type="checkbox" className="w-4 cursor-pointer h-4 text-[#260056] rounded border-[2px] bg-[#F2F4FF] border-[#8717F8] outline-none" />
                <label htmlFor="link-checkbox" className="ml-2 text-[14px] text-secondary font-bold">Accept <Link href="/termeni" target="_blank" className="text-[#260056] underline">Termenii și Condițiile.</Link></label>
            </div>
            <div className="flex flex-col md:flex-row justify-center w-full items-center">
                <ReCAPTCHA
                    sitekey="6LdWV_AoAAAAAMMdYLnmy_NUtbetbPGYWHOOhery"
                    onChange={(e) => setCaptchaVerified(!captchaVerified)}
                />
                { isLoading ? 
                    <div className='w-full flex items-center justify-center px-16 mt-4 md:mt-0'>
                        <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
                    </div> :
                    <button                      
                        className='py-3 md:py-4 mt-4 md:mt-0 md:ml-4 bg-[#8717F8] h-fit text-white rounded-[28px] font-semibold px-14 text-center text-[14px] w-full md:w-fit md:text-[16px] hover:scale-[1.05] transition-all'
                        type="submit"
                    >
                        Trimite!
                    </button>
                }
            </div>
        </form>
      </div>
    </AccountLayout>
  )
}

export default Sesizari