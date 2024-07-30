import React, { useState } from 'react'
import FormInput from '../admin/editProgram/FormInput'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword, updateCurrentUser, updatePhoneNumber } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const router = useRouter()

  const [nume, setNume] = useState('')
  const [prenume, setPrenume] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [subscribe, setSubscribed] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( !termsAccepted ) {
      toast.error('Acceptă termenii și condițiile mai întăi.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', result.user.uid), { 
        email: email,
        name: `${prenume} ${nume}`,
        phone: telefon,
        profilePic: null,
        createdAt: serverTimestamp()
      })

      subscribe && await addDoc(collection(db, 'newsletter'), { website: process.env.SITE, email })

      router.replace('/cont/comenzi')
    } catch (e: any) {
      if ( e.message ) {
        e.code == 'auth/email-already-in-use' ? toast.error('Email deja folosit.') : toast.error(e.message)
      } else {
        toast.error('Ceva nu a mers bine. încearcă din nou!')
      }
      
    }

    setIsLoading(false)
  }

  return (
    <form
      onSubmit={registerUser}
      className='rounded-[18px] flex flex-col shadow-2xl bg-white p-4 lg:p-6 lg:py-12 py-8 mt-12'
    >
      <div className='flex flex-col lg:flex-row lg:gap-x-6'>
        <FormInput 
          placeholder='nume'
          setValue={setNume}
          value={nume}
          required
        />
        <FormInput 
          placeholder='prenume'
          value={prenume}
          setValue={setPrenume}
          required
          styleProps='mt-5 lg:mt-0'
        />
      </div>

      <div className='flex flex-col mt-5 lg:flex-row lg:gap-x-6'>
        <FormInput 
          placeholder='email'
          setValue={setEmail}
          value={email}
          required
        />
        <FormInput 
          placeholder='telefon (opțional)'
          value={telefon}
          setValue={setTelefon}
          styleProps='mt-5 lg:mt-0'
        />
      </div>

      <div className='flex flex-col mt-5 lg:flex-row lg:gap-x-6'>
        <div className='relative w-full'>
          <input 
            className={'text-base p-4 rounded-2xl border-2 border-primary outline-none w-full'}
            placeholder='parola'
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            required
            type={ isVisible ? 'text' : 'password' }
          />

          <Image 
            src='/images/eye-crossed 2.svg'
            width={32}
            height={32}
            alt='.'
            className='absolute top-5 right-5 w-5 h-5 cursor-pointer'
            onClick={() => setIsVisible( !isVisible )}
          />
        </div>

        <div className='relative w-full'>
          <input 
            className={'text-base p-4 rounded-2xl border-2 border-primary outline-none w-full mt-5 lg:mt-0'}
            placeholder='confirmă parolă'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value) }
            required
            type={ isVisible2 ? 'text' : 'password' }
          />

          <Image 
            src='/images/eye-crossed 2.svg'
            width={32}
            height={32}
            alt='.'
            className='absolute top-10 lg:top-5 right-5 w-5 h-5 cursor-pointer'
            onClick={() => setIsVisible2( !isVisible2 )}
          />
        </div>
      </div>

      <p className='text-[14px] font-semibold text-[#B9B9B9] mt-6'>Toate câmpurile sunt obligatorii!</p>
      <div
        className='flex flex-row items-center cursor-pointer w-fit mt-2'
        onClick={() => setTermsAccepted(!termsAccepted) }
      >
        <div 
          className='w-[14px] h-[14px] border-secondary border-[1.5px] rounded-[4px] mr-2'
          style={{ background: termsAccepted ? '#8717F8' : 'transparent' }}
        ></div>
        <p className='text-secondary font-semibold text-[14px] pt-[2px]'>Sunt de acord cu <Link href='/termeni' target='_blank' className='text-blue-600 underline-offset-1 underline'>termenii și condițiile.</Link></p>
      </div>

      <div
        className='flex flex-row cursor-pointer w-fit mt-[10px]'
        onClick={() => setSubscribed(!subscribe) }
      >
        <div 
          className='w-[14px] min-w-[14px] h-[14px] border-secondary border-[1.5px] rounded-[4px] mr-2'
          style={{ background: subscribe ? '#8717F8' : 'transparent' }}
        ></div>
        <p className='text-secondary font-semibold text-[14px] -mt-[3px]'>Abonează-te la newsletter-ul nostru pentru a primi cele mai bune oferte!</p>
      </div>

      { isLoading ? 
        <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center mt-[48px]' /> :
        <button
          className='w-full lg:w-fit lg:px-16 self-center rounded-full py-4 bg-primary mt-8 hover:scale-105 transition-all'
          type='submit'
        >
          <p className='text-onPrimary font-semibold text-[14px]'>Creează contul</p>
        </button>
      }
    </form>
  )
}

export default RegisterForm