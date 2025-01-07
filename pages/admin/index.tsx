import { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../components/admin-nav/AdminLayout'
import { useAuthContext } from '../../context/AuthContext'
import { collection, getDocs, orderBy, query, where, limit } from '@firebase/firestore'
import { db } from '../../firebase'
import { Article, Order, Slide, User } from '../../types'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import { Line } from "react-chartjs-2"
import ReactLoading from 'react-loading'
import { formatDate } from '../../utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from '../../components/admin/Carousel'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const monthsDictionary = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie'
]

type Props = {
  article: Article
  users: User[]
  banners: Slide[]
}

const Admin = ({ article, users, banners }: Props) => {
  const { currentUser } = useAuthContext()
  const today = new Date()
  
  var years: number[] = []
  for (let i = today.getFullYear(); i >= 2024; i--) {
    years.push(i)
  }

  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [chartData, setChartData] = useState< any | null >(null)
  const [isLoadingChart, setIsLoadingChart] = useState(false)

  const getDaysInMonth = (month: number, year: number) => {
    var date = new Date(year, month, 1)
    var days = []
    while (date.getMonth() === month) {
      days.push(date.getDate())
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const fetchOrders = useCallback(async () => {
    setIsLoadingChart(true)
    var startDate = new Date(year, month, 1)
    var lastDate = new Date(year, month + 1, 0, 23, 59, 59, 999)

    const q = query(collection(db, 'orders'), where('createdAt', '>=', startDate), where('createdAt', '<=', lastDate), orderBy('createdAt', 'asc'))
    const ordersSnapshot = await getDocs(q)

    const orders: Order[] = ordersSnapshot.docs.map((doc) => {
      const createdAt = new Date(doc.data().createdAt.seconds*1000)
      
      return { ...doc.data(), id: doc.id, createdAt: createdAt.getDate().toString() } as Order
    })

    const dates = getDaysInMonth(month, year)

    const comenzi: any[] = dates.map((date) => {
      const comenzi = orders.filter((order) => order.createdAt == date.toString() ) 
      return (comenzi.length)
    })

    const vanzari: any[] = dates.map((date) => {
      const comenzi = orders.filter((order) => order.createdAt == date.toString() ) 
      
      return comenzi.reduce((prev, curr) => (prev + curr.number_of_items), 0)
    })

    setChartData({
      labels: dates, 
      datasets: [
        {
          label: 'comenzi', 
          lineTension: 0.5, 
          data: comenzi, 
          borderColor: '#FB8351', 
          backgroundColor: '#FB835180'
        }, 
        {
          label: 'vânzări', 
          lineTension: 0.5, 
          data: vanzari, 
          borderColor: '#04D200', 
          backgroundColor: '#04D20080'
        }
      ]
    })

    setIsLoadingChart(false)

  }, [month, year])

  useEffect(() => {
    fetchOrders()
  }, [month, year, fetchOrders])

  if ( !currentUser?.roles ) {
    return <AdminLayout>{null}</AdminLayout>
  }

  return (
    <AdminLayout color='white'>
      <div className='flex flex-row'>
        { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('produse') || currentUser?.roles.includes('banner-homepage')) &&
          <div className='flex flex-col w-2/3 pr-8'>
            { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('produse')) &&
              <>
                <h2 className='font-bold text-secondary text-[28px]'>Vânzări</h2>
                <div className='w-full bg-admin-background rounded-[24px] p-6 mt-4'>
                  <div className='flex flex-row justify-between items-center'>
                    <p className='text-secondary'>Stadiu vânzări</p>
                    <div className='flex flex-row items-center'>
                      { isLoadingChart && <ReactLoading type="spin" color="#8717F8" width={20} height={20} /> }
                      <select 
                        className="bg-transparent text-[#8B8B8B] text-[14px] outline-none border-[#CCCCCC] border-[1px] rounded-[4px] p-2 cursor-pointer mx-2" 
                        name="luna"
                        onChange={(e) => setMonth(Number(e.target.value))}
                        value={month}
                      >
                          {monthsDictionary.map((category, index) => (
                            <option 
                              key={category}
                              value={'' + index} 
                            >
                              {category}
                            </option>
                          ))}
                      </select>
                      <select 
                        className="bg-transparent text-[#8B8B8B] text-[14px] outline-none border-[#CCCCCC] border-[1px] rounded-[4px] p-2 cursor-pointer" 
                        name="an"
                        onChange={(e) => setYear(Number(e.target.value))}
                        value={year}
                      >
                          {years.map((category) => (
                            <option 
                              key={category}
                              value={category} 
                            >
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className='mt-4 h-52'>
                    { chartData && 
                      <Line 
                        data={chartData}
                        options={{
                          scales: {
                            y: {min: 0}
                          },
                          maintainAspectRatio: false,
                          responsive: true
                        }}
                    />
                    }
                  </div>  
                  <div className='w-full flex flex-row items-center justify-center mt-1'>
                    <div className='w-3 h-3 rounded-full bg-[#FB8351] mr-2'></div>
                    <p className='text-secondary text-[14px] font-semibold mr-4'>comenzi</p>
                    <div className='w-3 h-3 rounded-full bg-[#0BD002] mr-2'></div>
                    <p className='text-secondary text-[14px] font-semibold'>vânzări</p>
                  </div>             
                </div>
              </>
            }

            { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('banner-homepage')) &&
              <div className='flex flex-col w-full mt-4'>
                <h2 className='font-bold text-secondary text-[28px]'>Homepage - Inspirely</h2>
                <div className='w-full flex flex-col bg-admin-background rounded-[24px] p-6 mt-4'>
                  <Carousel
                    banners={banners}
                  />
                  <Link href={`/admin/slide-homepage`} className="text-primary font-bold text-sm underline hover:scale-105 transition-all self-end">Vezi mai mult</Link>
                </div>
              </div> 
            }
          </div>
        }

        <div className='flex flex-col w-1/3'>
          { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('pagina-blog')) &&
            <>
              <h2 className='font-bold text-secondary text-[28px]'>Blog</h2>
              <div className='w-full bg-admin-background rounded-[24px] p-6 mt-4'>
                <div className="p-2 pb-[10px]">
                  <h3 className='text-secondary font-bold text-base'>{article.title}</h3>
                  <p className="text-secondary text-[14px] pt-2">{article.description}</p>
                  <div className="flex flex-row items-center mt-2">
                    <Image 
                      src='/images/blog/clock.svg'
                      width={24}
                      height={24}
                      alt="clock svg"
                      className="w-[14px] h-[14px] mr-2"
                    />
                    <p className="font-semibold text-secondary pt-[3px]">{article.duration}</p>
                  </div>
                  <div className='flex items-center justify-between px-[2px] pt-2'>
                      <p className='text-[#828282] text-sm'>{article.formattedCreatedAt}</p>
                      <Link href={`/admin/blog/edit/${article.id}`} className="text-primary font-bold text-sm underline hover:scale-105 transition-all">Vezi mai mult</Link>
                  </div>
                </div>
              </div>
            </> 
          }

          { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('users')) && 
            <>
              <h2 className='font-bold text-secondary text-[28px] mt-4'>Users</h2>
              <div className='w-full flex flex-col justify-between bg-admin-background rounded-[24px] pb-6 mt-4 h-full'>
                <div>
                  { users.map((user, index) => (
                    <div key={user.id} className='border-[#EAEAEA]' style={{borderBottomWidth: index != users.length-1 ? '1px' : '0px' }}>
                      <Link 
                        href={`/admin/users/user/${user.id}`}
                        key={user.id}
                        className='w-full flex flex-row items-center p-6 py-4'
                      >
                        <Image 
                          src={user && user.profilePic ? user.profilePic.image : '/images/person.jpeg' }
                          width={512}
                          height={512}
                          alt={currentUser?.name || 'profil' }
                          className='w-14 h-14 object-cover rounded-full mr-3'
                        />
                        <div>
                          <p className='text-[16px] text-secondary font-bold mt-1'>{user?.name || ""}</p>
                          <p className='relative -top-1 text-[14px] text-[#787878] font-semibold'>{user?.role || ""}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <Link href={`/admin/users`} className="text-primary font-bold text-sm self-end underline hover:scale-105 transition-all mr-6">Vezi mai mult</Link>
              </div>
            </> 
          }
          
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin

export const getServerSideProps = async () => {
  const articlesSnap = await getDocs(query(collection(db, 'articles'), orderBy('createdAt', 'desc'), limit(1)))
  const articles: Article[] = articlesSnap.docs.map((doc) => {
    const { lastUpdated, createdAt, ...data } = doc.data()
    return ({ id: doc.id, formattedCreatedAt: formatDate(new Date(createdAt.seconds*1000)), ...data } as Article) 
  })

  const docsRef = query(collection(db, 'users'), where('roles', 'array-contains-any', ['admin','editor']), limit(3))
  const docsSnap = await getDocs(docsRef)

  const users: User[] = docsSnap.docs.map((doc) => (
    { id: doc.id, ...doc.data() } as User
  ))

  const slidesRef = query(collection(db, 'slides-homepage'), where('site', '==', process.env.SITE))
  const slidesSnap = await getDocs(slidesRef)

  const slides = slidesSnap.docs.map((doc) => (
    { id: doc.id, ...doc.data() }
  ))

  return {
    props: { article: articles[0], users, banners: slides },
  }
}