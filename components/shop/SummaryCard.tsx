import React from 'react'

type Props = {
  title: string
  email: string
  name: string
  phone: string
  city: string
  street: string
  county: string
  invoicePreference: string
  handleModify: (() => void) | null
  index: number
}

const SummaryCard = ({ city, county, email, handleModify, index, name, street, phone, title, invoicePreference }: Props) => {
  return (
    <div className='border-[#E2EAFF] flex flex-col rounded-[10px] border-2 w-full'>
      <div className='w-full bg-[#E2EAFF] p-2'>
        <p className='text-secondary'>{title}</p>
      </div>

      { index == 0 &&
        <div className='flex flex-col p-3'>
          <p className='text-secondary font-semibold'>{ invoicePreference == 'company' ? 'Persoană juridică' : 'Persoană fizică' }</p>
          <p className='text-secondary mt-2'>{ name } | {phone}</p>
          <p className='text-secondary mt-2'>{ street }</p>
          <p className='text-secondary'>{ city }, { county }</p>
          <button onClick={handleModify!} className='text-blue-500 underline self-start mt-2 font-semibold'>modifică</button>
        </div>
      }

      { index == 1 &&
        <div className='flex flex-col p-3 h-full'>
          <p className='text-secondary font-semibold mb-2'>{ email }</p>
          <button onClick={handleModify!} className='text-blue-500 underline self-start mt-auto font-semibold'>modifică</button>
        </div>
      }

      {
        index == 2 &&
        <div className='flex flex-col p-3'>
          <p className='text-secondary font-semibold'>Online cu card bancar</p>
        </div>
      }
    </div>
  )
}

export default SummaryCard