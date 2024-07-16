import React from 'react'
import { User } from '../../types'

type Props = {
  currentUser: User | null
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Email = ({ currentUser, email, setEmail, setStep }: Props) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <div className='flex flex-col items-center pt-28 lg:pt-36 mx-12'>
      <p className='text-[22px] lg:text-[36px] text-secondary font-bold text-center'>Introdu adresa ta de email!</p>

      <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mt-8'>
        <input 
          className='text-base p-3 text-[13px] pl-4 lg:p-4 lg:text-[15px] w-full max-w-[400px] rounded-full border-2 border-primary outline-none'
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value) }
          disabled={currentUser ? true : false}
          required
        />

          <button
            type='submit'
            className='px-16 xl:px-20 py-3 lg:py-4 w-full max-w-[400px] bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all mt-8'
          >
            <p className='text-onPrimary font-semibold text-[14px] lg:text-16px'>Continuă</p>
          </button> 
      </form>

      <p className='text-[#959595] text-[14px] text-center max-w-[400px] mt-12'>Poți plasa comanda și dacă nu ai un cont. După plasarea comenzii, îți vom crea unul pentru a te bucura de beneficiile acestuia.</p>
    </div>
  )
}

export default Email