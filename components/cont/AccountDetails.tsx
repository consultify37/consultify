import React, { useEffect, useState } from 'react'
import { User } from '../../types'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthContext } from '../../context/AuthContext'
import { deleteUser, signInWithEmailAndPassword, updatePassword } from 'firebase/auth'

const AccountDetails = () => {
  const { setCurrentUser, currentUser } = useAuthContext()
  const [name, setName] = useState( currentUser?.name ? currentUser.name : '' )
  const [phone, setPhone] = useState( currentUser?.phone ? currentUser.phone : '' )
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const [invoicePreference, setInvoicePreference] = useState(currentUser && currentUser.invoicePreference ? currentUser.invoicePreference : 'person')
  const [companyName, setCompanyName] = useState(currentUser && currentUser.company && currentUser.company.name ? currentUser.company.name : '')
  const [companyIdentityNumber, setCompanyIdentityNumber] = useState(currentUser && currentUser.company && currentUser.company.identityNumber ? currentUser.company.identityNumber : '' )
  const [street, setStreet] = useState(currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : '')
  const [county, setCounty] = useState(currentUser && currentUser && currentUser.address?.county ? currentUser.address.county : '')
  const [city, setCity] = useState(currentUser && currentUser.address && currentUser.address.city ? currentUser.address.city : '')
  const [isLoading3, setIsLoading3] = useState(false)

  useEffect(() => {
    setName(currentUser?.name ? currentUser.name : '')
    setPhone(currentUser?.phone ? currentUser.phone : '')

    setInvoicePreference(currentUser && currentUser.invoicePreference ? currentUser.invoicePreference : 'person')
    setCompanyName(currentUser && currentUser.company && currentUser.company.name ? currentUser.company.name : '')
    setCompanyIdentityNumber(currentUser && currentUser.company && currentUser.company.identityNumber ? currentUser.company.identityNumber : '' )
    setStreet(currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : '')
    setCounty(currentUser && currentUser && currentUser.address?.county ? currentUser.address.county : '')
    setCity(currentUser && currentUser.address && currentUser.address.city ? currentUser.address.city : '')
  }, [currentUser])

  const handleSaveBillingDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading3(true)

    try {
      const docRef = doc(db, 'users', currentUser?.id!)

      await updateDoc(docRef, {
        invoicePreference,
        address: {
          street,
          county,
          city
        },
        company: {
          name: companyName,
          identityNumber: companyIdentityNumber
        }
      })

      setCurrentUser(currentUser => ({ ...currentUser, name, phone: phone != '' ? phone : null } as User))
      toast.success('Datele contului au fost modificate cu succes.')
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou.')
    }

    setIsLoading3(false)
  }

  const handleSaveInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const docRef = doc(db, 'users', currentUser?.id!)

      await updateDoc(docRef, {
        name,
        phone
      })

      setCurrentUser(currentUser => ({ ...currentUser, name, phone: phone != '' ? phone : null } as User))
      toast.success('Datele contului au fost modificate cu succes.')
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou.')
    }

    setIsLoading(false)
  } 

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading2(true)

    try {
      await signInWithEmailAndPassword(auth, currentUser?.email!, oldPassword)

    } catch (e: any) {
      if (e.code == 'auth/invalid-login-credentials') {
        toast.error('Parola veche nu este corectă. Încearcă din nou.')
      } else {
        e.message ? toast.error(e.message.replace('Firebase: ')) : toast.error('Ceva nu a mers bine. Încearcă din nou.')
      }
      
      setIsLoading2(false)
      return
    }

    if ( password != confirmPassword ) {
      toast.error('Parola și confirmă parola nu corespund. Verică și încearcă din nou.')
      setIsLoading2(false)
      return
    }

    if ( password.length < 6) {
      toast.error('Parola trebuie să aibă cel puțin 6 caractere. Modifică și  încearcă din nou.')
      setIsLoading2(false)
      return
    }

    try {
      await updatePassword(auth.currentUser!, password)

      toast.success('Parola a fost modificată.')
      setPassword('')
      setOldPassword('')
      setConfirmPassword('')
    } catch (e: any) {
      e.message ? toast.error(e.message.replace('Firebase: ')) : toast.error('Ceva nu a mers bine. Încearcă din nou.')
    }

    setIsLoading2(false)
  }

  const handleDeleteAccount = async () => {
    if (confirm('Ești sigur că vrei să ștergi contul? Accesul la produsele cumpărate va fi pierdut. Acțiunea este ireversibilă.')) {
      if (confirm('ATENȚIE! Ești sigur că vrei să ștergi contul? Accesul la produsele cumpărate va fi pierdut. Acțiunea este ireversibilă.')) {
        try {
          auth.currentUser && await deleteUser(auth.currentUser)
        } catch (e) {
          toast.error('Ceva nu a mers bine. Încearcă din nou.')
        }
      }
    }
  }

  return (
    <div className='w-full lg:ml-12'>
      <h1 className='text-base mt-6 lg:mt-0 lg:text-[20px] font-bold text-secondary'>Detaliile contului</h1>

      <form 
        onSubmit={handleSaveInfo}
        className='flex flex-col items-center rounded-[12px] border-2 border-[#EDF0FF] mt-4 p-4 py-6 lg:py-8'
      >
        <p className='text-[14px] lg:text-base font-semibold text-secondary self-start ml-1'>email: {currentUser?.email}</p>
        <div className='w-full flex flex-col lg:flex-row items-center'>
          <input 
            className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mr-4'
            placeholder='nume și prenume'
            value={name}
            onChange={(e) => setName(e.target.value) }
            required
          />
          <input 
            className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4'
            placeholder='telefon'
            value={phone}
            onChange={(e) => setPhone(e.target.value) }
            type='tel'
          />
        </div>

        <div className='border-t-2 border-t-[#EDF0FF] mt-4 lg:mt-6 pt-4 lg:pt-6 flex flex-col lg:flex-row lg:justify-between items-center w-full'>
          <button 
            className='text-[#FF0F0F] font-semibold text-[14px] lg:mt-0'
            type='button'
            onClick={handleDeleteAccount}
          >
            Șterge contul definitiv
          </button>

          <div className='flex items-center justify-center h-[45px] lg:h-[53px] mt-4 lg:mt-0 w-full lg:w-fit'>
            { isLoading ?
              <ReactLoading type="spin" color="#8717F8" width={24} height={24} className='lg:mx-32'/> :
              <button
                type='submit'
                className='px-16 xl:px-20 py-3 lg:py-4 lg:w-fit w-full bg-primary flex items-center justify-center rounded-[10px] lg:rounded-[12px] hover:scale-105 transition-all'
              >
                <p className='text-onPrimary font-semibold text-[14px] '>Salvează modificările</p>
              </button>
            }
          </div>
        </div>
      </form>

      <h1 className='text-base mt-6 lg:mt-12 lg:text-[20px] font-bold text-secondary'>Detalii de facturare</h1>

      <form 
        onSubmit={handleSaveBillingDetails}
        className='flex flex-col items-center rounded-[12px] border-2 border-[#EDF0FF] mt-4 p-4 py-6 lg:py-8'
      >
        <div className='flex flex-col lg:flex-row gap-4 self-start'>
          <div
            className='flex flex-row items-center cursor-pointer w-fit'
            onClick={() => setInvoicePreference('person') }
          >
            <div 
              className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
              style={{ background: invoicePreference == 'person' ? '#260056' : 'transparent' }}
            ></div>
            <p className='text-secondary font-bold text-[14px]'>persoană fizică</p>
          </div>

          <div
            className='flex flex-row items-center cursor-pointer w-fit'
            onClick={() => setInvoicePreference('company') }
          >
            <div 
              className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
              style={{ background: invoicePreference == 'company' ? '#260056' : 'transparent' }}
            ></div>
            <p className='text-secondary font-bold text-[14px]'>persoană juridică</p>
          </div>
        </div>

        { invoicePreference == 'company' ?
          <div className='w-full flex flex-col lg:flex-row items-center'>
            <input 
              className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mt-6 lg:mr-4'
              placeholder='nume companie'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value) }
            />
            <input 
              className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mt-6'
              placeholder='CUI'
              value={companyIdentityNumber}
              onChange={(e) => setCompanyIdentityNumber(e.target.value) }
            />
          </div> : null
        }

        <div className='w-full flex flex-col lg:flex-row items-center'>
          <input 
            className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mt-6 lg:mr-4'
            placeholder='adresa'
            value={street}
            onChange={(e) => setStreet(e.target.value) }
          />
          <input 
            className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mt-6'
            placeholder='județ / sector'
            value={county}
            onChange={(e) => setCounty(e.target.value) }
          />
        </div>

        <input 
          className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4 lg:mt-6 lg:w-[calc(50%-8px)] lg:self-start'
          placeholder='localitate'
          value={city}
          onChange={(e) => setCity(e.target.value) }
        />

        <div className='border-t-2 border-t-[#EDF0FF] mt-4 lg:mt-6 pt-4 lg:pt-6 flex flex-col lg:flex-row lg:justify-end items-center w-full'>

          <div className='flex items-center justify-center h-[45px] lg:h-[53px] mt-4 lg:mt-0 w-full lg:w-fit'>
            { isLoading3 ?
              <ReactLoading type="spin" color="#8717F8" width={24} height={24} className='lg:mx-32'/> :
              <button
                type='submit'
                className='px-16 xl:px-20 py-3 lg:py-4 lg:w-fit w-full bg-primary flex items-center justify-center rounded-[10px] lg:rounded-[12px] hover:scale-105 transition-all'
              >
                <p className='text-onPrimary font-semibold text-[14px] '>Salvează modificările</p>
              </button>
            }
          </div>
        </div>
      </form>

      <h1 className='text-base mt-6 lg:mt-12 lg:text-[20px] font-bold text-secondary'>Schimbă parola</h1>

      <form 
        onSubmit={handleChangePassword}
        className='flex flex-col items-center rounded-[12px] border-2 border-[#EDF0FF] mt-4 p-4 py-6 lg:py-8 w-full lg:w-[51%]'
      >
        <input 
          className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full'
          placeholder='parolă veche'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value) }
          required
          type='password'
        />
        <input 
          className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4'
          placeholder='parola nouă'
          value={password}
          onChange={(e) => setPassword(e.target.value) }
          type='password'
        />
        <input 
          className='text-[14px] lg:text-base p-4 py-3 lg:py-4 rounded-2xl border-2 border-primary outline-none w-full mt-4'
          placeholder='confirmă parola nouă'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value) }
          type='password'
        />

        <div className='border-t-2 border-t-[#EDF0FF] mt-4 lg:mt-6 pt-4 lg:pt-6 flex flex-col lg:flex-row lg:justify-between items-center w-full'>

          <div className='flex items-center justify-center h-[45px] lg:h-[53px] w-full'>
            { isLoading2 ?
              <ReactLoading type="spin" color="#8717F8" width={24} height={24} /> :
              <button
                type='submit'
                className='py-3 lg:py-4 w-full bg-primary flex items-center justify-center rounded-[10px] lg:rounded-[12px] hover:scale-105 transition-all'
              >
                <p className='text-onPrimary font-semibold text-[14px] '>Salvează noua parolă</p>
              </button> 
            } 
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountDetails