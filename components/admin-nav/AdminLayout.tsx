import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { signOut } from "firebase/auth"
import ReactLoading from 'react-loading'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'

type Props = {
  children: React.ReactNode
  color?: string
}

const AdminLayout = ({ children, color='admin-background' }: Props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const path = usePathname()
  const [isLoadingSignout, setIsLoadingSignout] = useState(false)

  useEffect(() => {
    if ( !currentUser || !currentUser.roles || (!currentUser!.roles.includes("editor") && !currentUser!.roles.includes("admin") ) ) {
      // toast.error('Nu aveți permisii suficiente să accesați această pagină.', { duration: 3000 })
      router.push('/admin/login')
    }

  }, [router, currentUser])

  const signout = async () => {
    setIsLoadingSignout(true)
    router.push('/admin/login')
    await signOut(auth)
    toast.success('Te-ai delogat cu succes!')
    setIsLoadingSignout(false)
  }

  return (
    <div>
      <Head>
        <title>Consultify | Admin</title>
      </Head>
      <div className='flex flex-row w-screen min-h-screen p-4'>
        <div className='bg-secondary fixed rounded-3xl w-1/5 min-w-[256px] max-w-80 mr-8 h-[calc(100vh-32px)] flex flex-col justify-between p-4'>
          <div className='flex flex-col'>
            <Image
              src="/images/logo.svg"
              width={120}
              height={38}
              className=" w-[180px] mt-6 ml-6"
              alt="Consultify logo"
            />
            <div className='bg-white rounded-xl w-[calc(100%-16px)] p-2 flex flex-row items-center mt-8 ml-2'>
              <Image 
                src={currentUser && currentUser.profilePic ? currentUser.profilePic.image : '/images/person.jpeg' }
                width={512}
                height={512}
                alt={currentUser?.name || 'profil' }
                className='w-14 h-14 object-cover rounded-full mr-3'
              />
              <div>
                <p className='text-[16px] text-secondary font-bold mt-1'>{currentUser?.name || ""}</p>
                <p className='relative -top-1 text-[14px] text-[#787878] font-semibold'>{currentUser?.role || ""}</p>
              </div>
            </div>
            <div className='flex flex-col mt-8 gap-y-6 ml-6'>
              <Link href='/admin' className='flex flex-row items-center'>
                <Image 
                  src='/images/admin/dashboard.svg'
                  width={32}
                  height={32}
                  alt='window'
                  className='w-4 h-4 mr-[10px]'
                />
                <p className='text-lg font-bold text-onSecondary'>
                  dashboard
                </p>
              </Link>
              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('banner-homepage')) &&
                <Link href='/admin/slide-homepage' className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/window.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    homepage
                  </p>
                </Link>
              }

              {
                currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('consultify')) && 
                <Link href='/admin/categorii-programe'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/apps 1.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    categorii programe
                  </p>
                </Link>
              }

{
                currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('consultify')) && 
                <Link href='/admin/programe-fonduri'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/articles.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-5 h-5 mr-[6px] mt-[2px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    programe fonduri
                  </p>
                </Link>
              }

              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('comenzi-shop-fizic')) && 
                <Link href='/admin/comenzi-shop-fizic' className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/e-commerce.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    comenzi shop fizic
                  </p>
                </Link>
              }

              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('produse')) && 
                <Link href='/admin/e-commerce' className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/e-commerce.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    e-commerce
                  </p>
                </Link>
              }

              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('produse')) &&
                <Link href='/admin/produse' className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/products.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    produse
                  </p>
                </Link>
              } 

              {
                currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('produse')) &&
                <Link href='/admin/categorii-produse'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/apps 1.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    categorii produse
                  </p>
                </Link>
              }
              
              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('pagina-blog')) &&
                <Link href='/admin/blog'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/blog.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    blog
                  </p>
                </Link>
              }

              {/* { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('press')) &&
                <Link href='/admin/press-categories'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/apps 1.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    categorii comunicate
                  </p>
                </Link>
              } */}

              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('press')) &&
                <Link href='/admin/press'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/newspaper.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    comunicate de presă
                  </p>
                </Link>
              }

              { currentUser?.roles && (currentUser.roles.includes('admin') || currentUser.roles.includes('users')) &&
                <Link href='/admin/users'className='flex flex-row items-center'>
                  <Image 
                    src='/images/admin/user.svg'
                    width={32}
                    height={32}
                    alt='window'
                    className='w-4 h-4 mr-[10px]'
                  />
                  <p className='text-lg font-bold text-onSecondary'>
                    users
                  </p>
                </Link>
              }
            </div>
          </div>

          { isLoadingSignout ?
            <div className='w-full flex flex-col items-center justify-center'>
              <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
            </div> :
            <button 
              className="bg-primary font-bold flex items-center justify-center w-full mx-auto px-12 py-3 text-onPrimary rounded-[28.5px] hover:scale-[1.05] transition-all"
              onClick={signout}
            >
                logout
            </button> 
          }
        </div>
        <div className='w-1/5 min-w-[256px] max-w-80 mr-8 h-[calc(100vh-32px)]'></div>

        { !path?.includes('admin/users/user/') ?
          <div className={`bg-${color} rounded-3xl w-[calc(80%-32px)] min-h-[calc(100vh-32px)] p-12`}>
            { children } 
          </div>:
          <div className='w-[calc(80%-32px)] min-h-[calc(100vh-32px)]'>
            { children }
          </div>
        }
      </div>
    </div>
  )
}

export default AdminLayout