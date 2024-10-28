import { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import { useAuthContext } from '../../../context/AuthContext'
import { collection, getDocs, orderBy, query, where, limit } from '@firebase/firestore'
import { db } from '../../../firebase'
import { Order, Product } from '../../../types'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement} from 'chart.js'
import { Doughnut, Line } from "react-chartjs-2"
import ReactLoading from 'react-loading'
import Image from 'next/image'
import Link from 'next/link'
import Dots from '../../../components/admin/users/Dots'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

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
  products: Product[]
}

const Ecommerce = ({ products }: Props) => {
  const { currentUser } = useAuthContext()
  const today = new Date()
  
  var years: number[] = []
  for (let i = today.getFullYear(); i >= 2024; i--) {
    years.push(i)
  }

  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [chartData, setChartData] = useState< any | null >(null)
  const [doughnutData, setDoughnutData] = useState< any | null >(null)
  const [percentages, setPercentages] = useState< number[] >([0,0,0,0])
  const [isLoadingChart, setIsLoadingChart] = useState(false)
  const [n_orders, setN_orders] = useState(0)
  const [n_products, setN_products] = useState(0)

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

    const canale: number[] = orders.reduce((prev, curr) => {
      const unknown = prev[0] + (curr.channel == 'unknown' ? 1 : 0)
      const google = prev[1] + (curr.channel == 'google' ? 1 : 0)
      const social = prev[2] + (curr.channel == 'social-media' ? 1 : 0)
      const email = prev[3] + (curr.channel == 'email' ? 1 : 0)

      return [unknown, google, social, email]
    }, [0,0,0,0])

    const percentages = canale.map((item) => (Math.round(item/orders.length*100)))

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

    setDoughnutData({
      labels: ['unknown','google', 'social media', 'email'],
      datasets: [{
        label: '',
        data: canale,
        backgroundColor: ['#787878', '#FB8351', '#0F52FF', '#01EA88']
      }]
    })

    setPercentages(percentages)

    setN_orders(orders.length)
    
    const total_price = orders.reduce((prev, curr) => (prev + curr.line_items.data.reduce((prev, curr) => (prev + curr.amount_total), 0)), 0)/100
    setN_products(total_price)

    setIsLoadingChart(false)

  }, [month, year])

  useEffect(() => {
    fetchOrders()
  }, [month, year, fetchOrders])

  return (
    <AdminLayout color='white'>
      <div className='flex flex-row'>
        <div className='flex flex-col w-2/3 pr-8'>
          { (currentUser?.roles.includes('admin') || currentUser?.roles.includes('produse')) &&
            <>
              <h2 className='font-bold text-secondary text-[28px]'>Vânzări</h2>
              <div className='w-full bg-admin-background rounded-[24px] p-6 mt-4'>
                <div className='flex flex-row justify-between items-center'>
                  <p className='text-secondary'>Stadiu vânzări</p>
                  <div className='flex flex-row items-center'>
                    { isLoadingChart && <ReactLoading type="spin" color="#0F52FF" width={20} height={20} /> }
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
                        {years.map((category, index) => (
                          <option 
                            key={category}
                            value={'' + index} 
                          >
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className='mt-4 h-60'>
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
                  <p className='text-secondary text-[14px] font-semibold'>produse vândute</p>
                </div>             
              </div>
            </>
          }
        </div>

        <div className='flex flex-col w-1/3'>
          <h2 className='font-bold text-secondary text-[28px]'>Canale vânzări</h2>
          <div className='w-full bg-admin-background rounded-[24px] p-6 mt-4 flex flex-col items-center justify-between'>
            <div className='h-48'>
              { doughnutData &&
                <Doughnut 
                  data={doughnutData}
                />
              }
            </div>
            <div className='w-full flex flex-col'>
            <div className='flex flex-row justify-between items-center mt-10'>
                <div className='flex flex-row items-center'>
                  <div className='w-2 h-2 bg-[#787878] rounded-full mr-2'></div>
                  <p className='text-[14px] font-semibold text-[#A8A8A8]'>unknown</p>
                </div>
                <p className='text-[14px] font-semibold text-secondary'>{percentages[0]}%</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <div className='w-2 h-2 bg-[#FB8351] rounded-full mr-2'></div>
                  <p className='text-[14px] font-semibold text-[#A8A8A8]'>google</p>
                </div>
                <p className='text-[14px] font-semibold text-secondary'>{percentages[1]}%</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <div className='w-2 h-2 bg-[#0F52FF] rounded-full mr-2'></div>
                  <p className='text-[14px] font-semibold text-[#A8A8A8]'>social media</p>
                </div>
                <p className='text-[14px] font-semibold text-secondary'>{percentages[2]}%</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <div className='w-2 h-2 bg-[#01EA88] rounded-full mr-2'></div>
                  <p className='text-[14px] font-semibold text-[#A8A8A8]'>email</p>
                </div>
                <p className='text-[14px] font-semibold text-secondary'>{percentages[3]}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='flex flex-col w-1/3 mt-8'>
          <div className='flex flex-col w-full rounded-[24px] bg-admin-background p-6'>
            <h2 className='font-bold text-secondary text-[16px]'>Comenzi</h2>

            <div className='flex flex-row items-center mt-2'>
              <Image 
                src='/images/Shop/shopping-basket (2) 1.svg'
                width={128}
                height={128}
                alt='.'
                className='w-8 h-auto mr-4'
              />
              <p className='text-[40px] font-bold text-secondary mt-1'>{n_orders}</p>
            </div>
          </div>

          <div className='flex flex-col w-full rounded-[24px] bg-admin-background p-6 mt-4'>
            <h2 className='font-bold text-secondary text-[16px]'>Vânzări</h2>

            <div className='flex flex-row items-center mt-2'>
              <Image 
                src='/images/Shop/coins (2) 1.svg'
                width={128}
                height={128}
                alt='.'
                className='w-8 h-auto mr-4'
              />
              <p className='text-[40px] font-bold text-secondary mt-1'>{n_products} lei</p>
            </div>
          </div>
        </div>

        <div className='w-2/3 pl-8 mt-8'>
          <div className='w-full bg-admin-background rounded-[24px] pt-6'>
            <div className='flex flex-row items-center justify-between pb-4 border-[#EAEAEA] border-b-[1px] px-6'>
              <h2 className='font-bold text-secondary text-[16px]'>Ultimele produse adăugate</h2>
              <Link href={`/admin/produse`} className="text-primary font-bold text-sm self-end underline hover:scale-105 transition-all">Vezi toate produsele</Link>
            </div>

            { products.map((product, index) => (
              <div 
                className={'flex flex-row items-center justify-between pt-[15px] py-[14px] p-6 ' + (index == 0 && products.length > 1 ? 'border-[#EAEAEA] border-b-[1px]' : '')}
                key={product.id}
              >
                <Image
                  src={product.image.image}
                  alt="cart image"
                  placeholder="blur"
                  blurDataURL="/images/whyus-cart-image.png"
                  width={152}
                  height={264}
                  className="w-[90px] h-[90px] object-contain rounded-[12px]"
                />
                <p className='font-bold text-secondary text-center'>{ product.name }</p>
                  
                <p className="text-price text-[16px] font-bold sm:text-[18px]">
                  {" "}
                  {product.price} lei{" "}
                  {product.onSale && (
                    <s className="text-[#7C9EF8] text-[14px] font-base opacity-90">
                      {product.oldPrice} lei
                    </s>
                  )}{" "} 
                </p>
                <div className='mr-2'>
                  <Dots
                    to={`/admin/produse/edit/${product.id}`}
                  />
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Ecommerce

export const getServerSideProps = async () => {
	const collectionRef = query(collection(db, 'products'), where('active', '==', true), orderBy('lastUpdated', 'desc'), limit(2))
	const collectionSnap = await getDocs(collectionRef)
	
	const products: Product[] = collectionSnap.docs.map((doc) => {
		const { lastUpdated, ...data } = doc.data()

		return ({ id: doc.id, ...data } as Product)
	})

  return { props: { products }}
}