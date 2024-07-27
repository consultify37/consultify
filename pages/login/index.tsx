import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import Link from 'next/link'
import Head from 'next/head'

const getWindowDimensions = () => {
  if ( typeof window != 'undefined' ) {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  } else {
    return { width: 0, height: 0 }
  }
}

const Login = () => {
  const router = useRouter()
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const getWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window
      return {
        width,
        height
      }
    }

    const  handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try{
      await signInWithEmailAndPassword(auth, email, password) 
      
      router.replace('/cont/comenzi')
    } catch (e: any) {
      if ( e.code == 'auth/invalid-login-credentials' ) {
        toast.error('Email sau parolă invalide.')
      } else {
        toast.error(e.message.replace('Firebase: '))
      }

      setPassword('')
    }

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-end'>
      <Head>
        <title>Consultify | Login</title>
      </Head>
      <div className='rounded-full p-4 bg-secondary border-white border-[10px]'>
        <Image 
          src='/favicon.ico'
          width={64}
          height={64}
          alt='logo'
          className='w-12 h-12'
        />
      </div>

      <div className={'flex flex-col items-center rounded-3xl pt-4 w-[calc(100vw-100px)] max-w-[400px] ' + (windowDimensions.height < 800 ? 'mb-12' : 'mb-16')}>
        <h1 className='text-secondary text-[24px] font-bold'>Bun venit înapoi!</h1>
        <p className='text-[16px] text-[#A1A1A1] mt-1'>Intră în contul tău</p>

        <form onSubmit={login} className='w-full flex flex-col items-center'>
          <input 
            className='text-base p-4 pl-6 rounded-full border-2 border-primary outline-none w-full mt-8'
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value) }
            required
          />

          <input 
            className='text-base p-4 pl-6 rounded-full border-2 border-primary outline-none w-full mt-4'
            placeholder='Parolă'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            required
          /> 

          <Link href='/forgot-password' className='font-semibold text-primary text-[14px] mt-6 hover:scale-105 transition-all'>
            Ți-ai uitat parola?
          </Link>
          
          <div className='mt-6 h-14 flex flex-col w-full items-center justify-center'>
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
      <div className='relative flex w-full h-full'>
        <div className='relative flex flex-col overflow-hidden items-center w-full h-28 md:h-32 self-end'>
          <div className='absolute w-[3600px] h-[3600px]  md:w-[8000px] md:h-[8000px] bg-secondary rounded-full'>
            <div className='w-full h-full flex justify-center'>
              <p className='text-onSecondary font-semibold mt-[52px] md:mt-16'>
                <span className='opacity-80'>Nu ai un cont? </span>
                <Link 
                  href='/register'
                  className='hover:text-primary transition-all duration-300'
                >
                  Creează-ți unul!
                </Link>
              </p>
            </div>
          </div>
        </div> 

        <Image 
          src='/images/Login/Polygon 2.svg'
          width={256}
          height={256}
          alt='.'
          className='absolute left-0 -top-6 w-[72px] h-[72px] md:top-4 md:w-[96px] md:h-[96px]'
        />

        <Image 
          src='/images/Login/Triangle.svg'
          width={256}
          height={256}
          alt='.'
          className='absolute -right-2 -top-4 w-[72px] h-[72px] md:top-6 md:w-[96px] md:h-[96px]'
        />
      </div>
    </div>
  )
}

export default Login