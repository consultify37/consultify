import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { useCartContext } from '../../../context/CartContext'
import Image from 'next/image'

const VoucherForm = () => {
  const { setCoupon, coupon } = useCartContext()
  const [userCode, setUserCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const applyCode = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('https://getdiscountcode-75cxgdbjwq-ey.a.run.app', {
        code: userCode
      })

      if ( !response.data.active || !response.data.coupon.valid ) {
        toast.error('Codul introdus nu mai este valabil.')
        setUserCode('')
        setIsLoading(false)
        return
      }

      setCoupon({ 
        code: response.data.code,
        name: response.data.coupon.name,
        id: response.data.coupon.id,
        amount_off: response.data.coupon.amount_off,
        percent_off: response.data.coupon.percent_off
      })
      
      toast.success('Voucher adăugat cu succes!')
    } catch (e: any) {
      if ( e.response && e.response.status == '404' ) {
        toast.error('Codul introdus nu există.')
      } else {
        toast.error('Ceva nu a mers bine. Încearcă din nou!')
        console.log(e)
      }
    }

    setUserCode('')
    setIsLoading(false)
  }

  const removeCode = () => {
    setCoupon(null)
    toast.success('Voucher eliminat cu succes!')
  } 

  return (
    <div className='rounded-[10px] border-2 border-[#F2F4FF] p-4 py-6 mt-8'>
      <p className='text-secondary font-bold text-[18px]'>Adaugă un voucher cadou:</p>

      <form onSubmit={applyCode} className='flex flex-col items-center'>
        <input 
          className='text-base text-[11px] mt-6 pl-4 p-3 lg:text-[15px] w-full max-w-[400px] rounded-full border-2 border-primary outline-none'
          placeholder='Cod voucher'
          type='text'
          value={userCode}
          onChange={(e) => setUserCode(e.target.value) }
          required
        />

        { coupon &&
          <div className='w-full flex justify-between items-center mt-6'>
            <p className='font-semibold text-secondary'>{ coupon.name } | { coupon.code }</p>
            <button
              type='button'
              onClick={removeCode}
            >
              <Image
                src='/images/x.svg'
                width={32}
                height={32}
                alt='.'
                className='w-3 h-3 -mt-[1px] hover:scale-105 transition-all'
              />
            </button>
          </div>        
        }

        <div className='flex items-center justify-center w-full h-[45px] lg:h-[53px] max-w-[400px] mt-6'>
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} /> :
            <button
              type='submit'
              className='py-3 lg:py-4 w-full bg-primary flex items-center justify-center rounded-full hover:scale-105 transition-all'
            >
              <p className='text-onPrimary font-semibold text-[14px]'>Aplică</p>
            </button>
          }
        </div>
      </form>
    </div>
  )
}

export default VoucherForm