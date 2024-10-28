import Link from 'next/link'
import React from 'react'

type Props = {
  onlySales: boolean
  setOnlySales: React.Dispatch<React.SetStateAction<boolean>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  categories: string[]
}

const Header = ({ category, onlySales, setCategory, setOnlySales, categories }: Props) => {
  return (
    <div className='flex flex-row items-center justify-between'>
        <h1 className='text-secondary font-bold text-[28px]'>Produsele tale</h1>
        <div
          className='flex flex-row items-center cursor-pointer'
          onClick={() => setOnlySales(!onlySales) }
        >
          <div 
            className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
            style={{ background: onlySales ? '#8717F8' : 'transparent' }}
          ></div>
          <p className='text-secondary font-semibold text-[16px] pt-1'>Doar produse la reducere</p>
        </div>
        <select 
          className="bg-transparent text-secondary text-[16px] font-semibold outline-none cursor-pointer" 
          name="categorie"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
            {['Toate', ...categories].map((category) => (
              <option 
                key={category}
                value={category} 
              >
                Categorie: {category}
              </option>
            ))}
        </select>
        <Link
          href='/admin/produse/edit'
          className='rounded-xl bg-primary text-onPrimary font-semibold flex p-4 px-14 items-center justify-center hover:scale-[1.05] transition-all'
        >
          Produs nou
        </Link>
      </div>
  )
}

export default Header