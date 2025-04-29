import Image from 'next/image'
import React from 'react'

type Props= {
  setDiscountCode: React.Dispatch<React.SetStateAction<string | null>>
}

const Offer = ({ setDiscountCode }: Props) => {
  const openCheckoutModal = () => {
    setDiscountCode('CONS5')
    const element = document.getElementById('my_modal_1') as any
    element.showModal()
  }
  return (
    <div className='modal-box py-6 text-center flex flex-col items-center'>
      <h2 className='font-bold text-2xl'>STAI!</h2>
      <p className='text-[#afafaf] font-semibold mt-4'>Avem o ofertă valabilă doar azi!</p>
      <p className='font-bold text-lg mt-4'>FOLOSEȘTE CODUL {`"CONS5"`} PENTRU EXTRA 5% REDUCERE</p>
      <Image 
        src="/landing-page/images/5off.png"
        width={256}
        height={256}
        alt='.'
        className='w-32 h-32 self-center'
      />
      <p className='text-[#afafaf] font-semibold mt-4'>Vrei să primești încă 5% reducere?</p>
      <form method='dialog'>
        <button onClick={openCheckoutModal} className='flex flex-col rounded-md shadow-md items-center text-lg font-bold py-3 mt-4 active:scale-95 transition-all duration-300 w-full bg-landing-green-400 hover:bg-landing-green-700 text-white border-landing-green-700 border-2'>FINALIZEAZĂ COMANDA</button>
        <button className='btn w-full py-3 mt-4'>
          Nu mulțumesc, nu vreau 5% reducere...
        </button>
      </form>
    </div>
  )
}

export default Offer