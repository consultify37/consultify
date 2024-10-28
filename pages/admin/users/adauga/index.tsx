import React, { useState } from 'react'
import AdminLayout from '../../../../components/admin-nav/AdminLayout'
import ProfileImageComponent from '../../../../components/admin/users/ProfileImageComponent'
import FormInput from '../../../../components/admin/users/FormInput'
import Permisions from '../../../../components/admin/users/Permisions'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { uploadFile } from '../../../../utils/b2_storage/upload_file'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import axios from 'axios'

const Add = () => {
  const router = useRouter()
  const [profilePic, setProfilePic] = useState< File | null >(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [numeRol, setNumeRol] = useState('')
  const [permisiuni, setPermisiuni] = useState< string[] >([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if ( password != confirmPassword ) {
      toast.error('Parola și confirmarea parolei nu corespund.')
      setIsLoading(false)
      return
    }

    if ( password.length < 6 ) {
      toast.error('Parola trebuie să aibă minim 6 caractere.')
      setIsLoading(false)
      return
    }

    try {
      var result

      if ( profilePic ) {
        result = await uploadFile(profilePic)
      }

      const data = {
        email, 
        password, 
        name, 
        role: numeRol, 
        roles: permisiuni, 
        profilePic: result ? { file: result, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result.fileName}` } : null
      }
      
      const response = await axios.post('https://createuser-75cxgdbjwq-ey.a.run.app', data)

      toast.success('User adăugat cu succes.', { duration: 3000 })
      router.push('/admin/users')
    } catch (e: any) {
      if (e.response.status == 404) {
        toast.error('Adresă de email deja folosită.')
        setIsLoading(false)
        return
      }

      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading(false)
  }

  const leavePage = () => {
    if (confirm('Ești sigur că vrei să părăsești pagina? Toate modificările vor fi pierdute.')) {
      router.push('/admin/users')
    }
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className='flex flex-col justify-between h-full'>
        <div className='flex flex-row items-start'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-8 xl:mr-16'>
            <h1 className='text-[28px] text-secondary font-bold mb-8'>Adaugă un user nou</h1>
            <ProfileImageComponent 
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />

            <FormInput 
              placeholder='introdu numele aici'
              setValue={setName}
              value={name}
              title='Setează numele'
              required
            />
            <FormInput 
              placeholder='introdu adresa aici'
              setValue={setEmail}
              value={email}
              title='Setează email-ul'
              type='email'
              required
            />
            <FormInput 
              placeholder='introdu aici'
              setValue={setPassword}
              value={password}
              title='Setează parola'
              type='password'
              required
            />
            <FormInput 
              placeholder='confirmă aici'
              setValue={setConfirmPassword}
              value={confirmPassword}
              title='Confirmă parola'
              type='password'
              required
            />
          </div>

          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>
            <h1 className='text-[28px] text-secondary font-bold mb-8'>Permisiuni</h1>
            <FormInput 
              placeholder='nume rol'
              setValue={setNumeRol}
              value={numeRol}
              title='Nume rol'
              required
            />

            <Permisions 
              permisiuni={permisiuni}
              setPermisiuni={setPermisiuni}
            />
          </div>

          <button type='button' onClick={leavePage} className='-ml-7'>
            <Image
              src='/images/admin/door.svg'
              width={24}
              height={24}
              alt='leave'
              className='w-8 h-auto'
            />
          </button>
        </div>

        <div className='w-full flex items-center justify-center max-w-[960px] mt-12'>
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} /> :
            <button 
              type='submit'
              className="bg-primary cursor-pointer font-semibold flex items-center px-12 justify-center py-4 text-onPrimary rounded-lg hover:scale-[1.05] transition-all"
            >
              Salvează utilizatorul
            </button> 
          }
        </div>
      </form>
    </AdminLayout>
  )
}

export default Add