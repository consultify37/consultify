import React, { useState } from 'react'
import FormInput from '../../components/admin/editProgram/FormInput'
import ReactLoading from 'react-loading'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setisLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setIsSent(true)
    } catch (e: any) {
      toast.error(e.message)
    }

    setisLoading(false)
  }

  if ( isSent ) {
    return (
      <div className='min-h-screen min-w-screen flex flex-col items-center justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
        <h1 className='text-secondary text-center mt-24 text-[20px] lg:text-[24px] font-bold'>Accesează link-ul trimis pe email pentru a-ți reseta parola!</h1>

        <Link
          className='w-full lg:px-16 lg:w-fit self-center rounded-full py-4 bg-primary mt-12 hover:scale-105 transition-all'
          href='/login'
        >
          <p className='text-onPrimary font-semibold text-[14px] text-center'>Înapoi la login</p>
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
      <div className='flex flex-col w-full items-center'>
        <h1 className='text-[20px] lg:text-[24px] font-bold text-secondary mt-24'>Recuperează-ți parola!</h1>
        <p className='text-[14px] lg:text-base text-[#5F5F5F] text-center mt-2 max-w-[400px]'>Introdu e-mailul asociat contului în câmpul de mai jos și resetează-ți parola.</p>

        <form 
          className='w-full flex flex-col bg-white shadow-2xl rounded-[18px] p-4 py-8 mt-8 max-w-[440px] lg:p-6 lg:py-12'
          onSubmit={handleRecover}
        >
          <FormInput 
            placeholder='email'
            setValue={setEmail}
            value={email}
            required
          />

          { isLoading ? 
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center mt-[48px]' /> :
            <button
              className='w-full lg:px-16 self-center rounded-full py-4 bg-primary mt-8 hover:scale-105 transition-all'
              type='submit'
            >
              <p className='text-onPrimary font-semibold text-[14px]'>Recuperează parola</p>
            </button>
          }
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword