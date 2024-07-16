import React, { useState } from 'react'
import AccountLayout from '../../../components/AccountLayout'
import toast from 'react-hot-toast'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase'

const Comunicare = () => {
  const [newsletter, setNewsletter] = useState('')
  
  const upload = async (e: any) => {
    e.preventDefault()
    
    try {
      const collectionRef = collection(db, 'newsletter')
      await addDoc(collectionRef, { website: process.env.SITE, email: newsletter })

      toast.success('Mulțumim pentru că te-ai abonat la newsletter-ul nostru! 🚀', { duration: 5000, style: { textAlign: 'center' } })
      setNewsletter('')
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }
  }

  return (
    <AccountLayout pathName='comunicare'>
      <div className='w-full lg:ml-12'>
        <h1 className='text-base mt-6 lg:mt-0 md:text-[20px] font-bold text-secondary'>Comunicare</h1>

        <div className="mt-8 lg:mt-12 relative max-w-[560px]">
          <h2 className="text-secondary text-[16px] md:text-[26px] font-bold">
            Oferte și noutăți direct în inbox-ul tău: Abonează-te acum!
          </h2>
          <form 
            onSubmit={upload} 
            className="relative flex mt-10 flex-col lg:flex-row items-center"
          >
            <input
              className="py-3 xl:px-6 px-4 lg:px-5 w-full border-2 border-primary rounded-full"
              type="email"
              name="Email"
              placeholder='Adresa ta de email'
              required
              onChange={(e) => setNewsletter(e.target.value)}
              value={newsletter}
            />
            <button type="submit" className="text-onPrimary font-bold lg:absolute w-full mt-3 lg:mt-0 lg:right-0 transition-all hover:scale-[1.05] lg:w-44 lg:border-4 cursor-pointer lg:border-white bg-primary py-4 px-10 text-sm rounded-full">
              Mă abonez
            </button>
          </form>
        </div>
      </div>
    </AccountLayout>
  )
}

export default Comunicare