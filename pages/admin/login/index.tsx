import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try{
      await signInWithEmailAndPassword(auth, email, password) 
      
      router.replace('/admin')
    } catch (e: any) {
      toast.error(e.message)
    }

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
      <div className='rounded-full p-4 bg-secondary border-white border-[10px] relative top-12'>
        <Image 
          src='/favicon.ico'
          width={64}
          height={64}
          alt='logo'
          className='w-12 h-12'
        />
      </div>

      <div className='flex flex-col items-center rounded-3xl bg-admin-card p-12 pt-16 mb-16 w-[calc(100vw-40px)] max-w-[424px]'>
        <h1 className='text-secondary text-[24px] font-bold'>Bun venit înapoi!</h1>
        <p className='text-[16px] text-[#A1A1A1] mt-1'>Intră în contul tău</p>

        <form onSubmit={login} className='w-full flex flex-col items-center'>
          <input 
            className='text-base p-4 pl-6 rounded-full border-2 border-primary outline-none w-full mt-8 max-w-[360px]'
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value) }
            required
          />

          <input 
            className='text-base p-4 pl-6 rounded-full border-2 border-primary outline-none w-full mt-4 max-w-[360px]'
            placeholder='Parolă'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            required
          /> 
          
          <div className='mt-8 flex flex-col w-full items-center'>
            { isLoading ?
              <ReactLoading type="spin" color="#8717F8" width={32} height={32} /> :
              <button 
                type='submit' 
                className='py-4 bg-primary flex items-center justify-center rounded-full w-full transition-all hover:scale-[1.05]'
              > 
                <p className='text-[#fff] font-semibold'>Intră în cont</p>
              </button>
            }
          </div>
        </form>   
      </div>
    </div>
  )
}

export default Login