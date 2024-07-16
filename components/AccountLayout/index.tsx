import { useRouter } from 'next/router'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import Head from 'next/head'
import PageHeader from '../Header/PageHeader'
import AccountMenu from '../cont/AccountMenu'

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
  children: React.ReactNode 
}

const AccountLayout = ({ children, pathName }: Props) => {
  const router = useRouter()
  const { currentUser, isLoadingAuth } = useAuthContext()

  if ( !isLoadingAuth && !currentUser ) {
    router.replace('/login')
  }

  return (
    <>
      <Head>
        <title>{`${process.env.SITE} | ${menuItems.find((item) => item.pathName == pathName)?.name }`}</title>
      </Head>

      <PageHeader title={currentUser && currentUser.name ? `Bine ai venit, ${ currentUser.name }!` : 'Bine ai venit!'}>
        {
          currentUser ?
          <p className='text-[rgba(255,255,255,0.75)] font-semibold z-10 mt-2 text-[16px] md:text-[22px]'>
            {
              currentUser.invoicePreference ?
              ( currentUser.invoicePreference == 'company' ? 'persoană juridică' : 'persoană fizică' ) :
              null
            }
          </p> : null
        }
      </PageHeader>

      <div className='-mt-2 sm:mt-0 md:-mt-12 flex flex-col lg:flex-row px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] pb-16 lg:pb-24'>
        <AccountMenu
          pathName={pathName}
        />
        { children }
      </div>
    </>
  )
}

export default AccountLayout