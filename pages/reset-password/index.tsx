import React, { useState } from 'react'
import FormInput from '../../components/admin/editProgram/FormInput'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isReseted, setIsReseted] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const searchParams = useSearchParams()

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setisLoading(true)

    if ( password != confirmPassword ) {
      toast.error("Parolă și confirmă parola nu corespund. Introduce din nou!", { duration: 3000, style: {textAlign: "center"}})
      setisLoading(false)
      return
    } 

    if ( password.length < 6 ) {
      toast.error("Parola trebuie să aibă minim 6 caractere.", { duration: 3000, style: {textAlign: "center"}})
      setisLoading(true)
      return
    }

    try {
      const response = await axios.post("https://resetpassword-75cxgdbjwq-ey.a.run.app", {
        password,
        token: searchParams.get("token")
      })

      setIsReseted(true)
    } catch (e: any) {
      toast.error("Nu aveți permisie pentru a reseta parola!", { duration: 3000, style: {textAlign: "center"}})
    }

    setisLoading(false)
  }

  if ( isReseted ) {
    return (
      <div className='min-h-screen min-w-screen flex flex-col items-center justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
        <h1 className='text-secondary text-center mt-24 text-[20px] lg:text-[24px] font-bold'>Parola a fost resetată cu succes!</h1>

        <Link
          className='w-full lg:px-16 lg:w-fit self-center rounded-full py-4 bg-primary mt-12 hover:scale-105 transition-all'
          href='/login'
        >
          <p className='text-onPrimary font-semibold text-[14px] text-center'>Mergi la login</p>
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
      <div className='flex flex-col w-full items-center'>
        <h1 className='text-[20px] lg:text-[24px] font-bold text-secondary mt-24'>Resetează parola!</h1>
        <p className='text-[14px] lg:text-base text-[#5F5F5F] text-center mt-2 max-w-[400px]'>Introdu noua parola în câmpul de mai jos</p>

        <form 
          className='w-full flex flex-col bg-white shadow-2xl rounded-[18px] p-4 py-8 mt-8 max-w-[440px] lg:p-6 lg:py-12'
          onSubmit={handleRecover}
        >
          <FormInput 
            placeholder='parolă nouă'
            setValue={setPassword}
            value={password}
            type='password'
            required
          />

          <FormInput 
            placeholder='confirmă parolă nouă'
            setValue={setConfirmPassword}
            value={confirmPassword}
            type='password'
            styleProps='mt-4 lg:mt-6'
            required
          />


          { isLoading ? 
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center mt-[48px]' /> :
            <button
              className='w-full lg:px-16 self-center rounded-full py-4 bg-primary mt-8 hover:scale-105 transition-all'
              type='submit'
            >
              <p className='text-onPrimary font-semibold text-[14px]'>Resetează parola</p>
            </button>
          }
        </form>
      </div>
    </div>
  )
}

export default ResetPassword