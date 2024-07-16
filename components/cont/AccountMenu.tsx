import { signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useRouter } from 'next/navigation'

const menuItems = [
  { 
    name: 'Informații cont',
    pathName: 'informatii',
    svg: '/images/Cont/user (5) 1 (1).svg'
  },
  { 
    name: 'Comenzile mele',
    pathName: 'comenzi',
    svg: '/images/Cont/shopping-basket 1.svg'
  },
  {
    name: 'Produse favorite',
    pathName: 'favorite',
    svg: '/images/Cont/Vector (1).svg'
  },
  {
    name: 'Sesizări',
    pathName: 'sesizari',
    svg: '/images/Cont/file-edit 1.svg'
  },
  {
    name: 'Comunicare',
    pathName: 'comunicare',
    svg: '/images/Cont/paper-plane (2) 1.svg'
  }
]

type Props = {
  pathName: string
}

const AccountMenu = ({ pathName }: Props) => {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const currentMenuItem = menuItems.find((item) => item.pathName == pathName )
  
  return (
    <div>
      <div className='hidden lg:flex flex-col w-[285px]'>
        <div className='flex flex-col bg-[#FAFAFA] rounded-[12px]'>
          { menuItems.map((item, index) => (
            <Link href={item.pathName != 'informatii' ? `/cont/${item.pathName }`: '/cont'} key={item.name+index} className={'z-50 h-fit w-full flex flex-row items-center bg-[#FAFAFA] hover:bg-[#8717F8] transition-all p-4 cursor-pointer group ' + ( index == 0 ? 'rounded-t-[12px]': '' ) + ( index == menuItems.length-1 ? 'rounded-b-[12px]' : '') }>
              <div className='bg-[#F2F4FF] rounded-[4px] w-8 h-8 flex items-center justify-center mr-6'>
                <Image 
                  src={item?.svg ? item.svg : ''}
                  width={128}
                  height={128}
                  alt='.'
                  className='w-4 h-auto'
                />
              </div>
              <p className='font-semibold text-secondary group-hover:text-onPrimary transition-all'>{ item?.name }</p>
            </Link>
          )) }
        </div>

        <button 
          onClick={() => {signOut(auth); router.replace('/')}}
          className='w-full bg-[#FF0F0F] py-4 rounded-[12px] mt-6 hover:scale-105 transition-all'
        >
          <p className='font-semibold text-white'>Log-out</p>
        </button>
      </div>
      
      <input aria-hidden="true" type="checkbox" name="toggle_dropdown" id="toggle_dropdown" className="hidden peer z-[11]" checked={toggle} onChange={() => setToggle(toggle => !toggle)}></input>
      <div className='relative'>
        <label role="button" htmlFor="toggle_dropdown" aria-label="dropdown" id="dropdown" className='lg:hidden'>
          <div className='flex flex-row w-full items-center justify-between bg-[#FAFAFA] rounded-[10px] px-6 p-4 mb-4 shadow-md z-[11]'> 
            <div className='flex flex-row items-center'>
              <div className='bg-[#F2F4FF] rounded-[4px] w-8 h-8 flex items-center justify-center mr-6'>
                <Image 
                  src={currentMenuItem?.svg ? currentMenuItem.svg : ''}
                  width={128}
                  height={128}
                  alt='.'
                  className='w-4 h-auto'
                />
              </div>
              <p className='font-semibold text-secondary'>{ currentMenuItem?.name }</p>
            </div>
            <svg width="14" height="6" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg" 
              aria-hidden='true' id='chevron-down'
              className='transition duration-300'
            >
              <path d="M10.7715 0.206184C10.6985 0.140851 10.6116 0.0889952 10.5159 0.0536073C10.4201 0.0182193 10.3175 0 10.2138 0C10.11 0 10.0074 0.0182193 9.91162 0.0536073C9.81588 0.0889952 9.72899 0.140851 9.65596 0.206184L6.05779 3.39864C5.98476 3.46397 5.89787 3.51583 5.80213 3.55122C5.7064 3.58661 5.60371 3.60482 5.5 3.60482C5.39629 3.60482 5.2936 3.58661 5.19787 3.55122C5.10213 3.51583 5.01524 3.46397 4.94221 3.39864L1.34404 0.206184C1.27101 0.140851 1.18412 0.0889952 1.08838 0.0536073C0.992646 0.0182193 0.88996 0 0.786248 0C0.682536 0 0.57985 0.0182193 0.484115 0.0536073C0.388379 0.0889952 0.301488 0.140851 0.228454 0.206184C0.0821305 0.336784 0 0.513451 0 0.697599C0 0.881748 0.0821305 1.05841 0.228454 1.18901L3.83447 4.38844C4.27639 4.78004 4.87543 5 5.5 5C6.12457 5 6.72361 4.78004 7.16553 4.38844L10.7715 1.18901C10.9179 1.05841 11 0.881748 11 0.697599C11 0.513451 10.9179 0.336784 10.7715 0.206184Z" fill="#260056"/>
            </svg>
          </div>
        </label>

        <div 
          className='lg:hidden absolute top-[56px] pt-2 flex-col z-10 w-full bg-[#FAFAFA] rounded-b-[10px] shadow-xl pb-1'
          id='dropdown-container'
          style={{visibility: toggle ? 'visible' : 'hidden'}}
        >
          {
            menuItems.filter(item => item.pathName != currentMenuItem?.pathName ).map((item, index) => (
              <Link href={item.pathName != 'informatii' ? `/cont/${item.pathName }`: '/cont'} key={item.name+index} className='z-50 h-fit w-full flex flex-row items-center rounded-[10px] bg-[#FAFAFA]  px-6 py-4 cursor-pointer group'>
                <div className='bg-[#F2F4FF] rounded-[4px] w-8 h-8 flex items-center justify-center mr-6'>
                  <Image 
                    src={item?.svg ? item.svg : ''}
                    width={128}
                    height={128}
                    alt='.'
                    className='w-4 h-auto'
                  />
                </div>
                <p className='font-semibold text-secondary'>{ item?.name }</p>
              </Link>
            ))
          }

          <button 
            onClick={() => {signOut(auth); router.replace('/')}}
            className='z-50 h-fit w-full flex flex-row items-center rounded-[10px] bg-[#FAFAFA]  px-6 py-4 cursor-pointer group'
          >
            <div className='bg-[#F2F4FF] rounded-[4px] w-8 h-8 flex items-center justify-center mr-6'>
              <Image 
                src='/images/Cont/turn-off.svg'
                width={128}
                height={128}
                alt='.'
                className='w-4 h-auto'
              />
            </div>
            <p className='font-semibold text-secondary'>Log-out</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountMenu