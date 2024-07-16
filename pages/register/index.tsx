import React from 'react'
import HowWorks from '../../components/shop/HowWorks'
import RegisterForm from '../../components/register/RegisterForm'
import Link from 'next/link'

const items = [
  {
    title: 'Acces la Resurse și Servicii Exclusive', 
    description: 'Prin crearea unui cont, vei avea acces la o gamă variată de servicii si produse digitale.💯'
  },
  {
    title: 'Management Simplificat al Comenzilor', 
    description: 'Poți accesa istoricul achizițiilor, statusul comenzilor și detaliile de facturare oricând ai nevoie.🎉'
  },
  {
    title: 'Păstrarea Preferințelor și Personalizare', 
    description: 'Contul tău păstrează preferințele și setările personale, oferindu-ți o experiență de utilizare personalizată.🙋🏼‍♀️'
  }
]

const Register = () => {
  return (
    <div className='mt-40 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] mb-32'>
      <HowWorks 
        items={items}
        title='De ce să îți creezi un cont nou?'
      />

      <p className='text-secondary font-bold text-[20px] lg:text-[24px] text-center mt-12'>Creează un cont nou!</p>
      <p className='text-secondary text-[18px] text-center font-semibold mt-3'>
        <span className='opacity-80'>Ai deja un cont? </span>
        <Link
          href='/login'
          className='hover:text-primary transition-all duration-300'
        >
          Loghează-te!
        </Link>
      </p>
    
      <RegisterForm />
    </div>
  )
}

export default Register