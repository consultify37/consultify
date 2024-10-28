import React, { useState } from 'react'
import AdminLayout from '../../../../../components/admin-nav/AdminLayout'
import { User } from '../../../../../types'
import FormInput from '../../../../../components/admin/users/FormInput'
import ProfileImageEditComponent from '../../../../../components/admin/users/ProfileImageEditComponent'
import ReactLoading from 'react-loading'
import Permisions from '../../../../../components/admin/users/Permisions'
import { NextPageContext } from 'next'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import toast from 'react-hot-toast'
import { uploadFile } from '../../../../../utils/b2_storage/upload_file'
import { useRouter } from 'next/navigation'

type Props = {
  user: User
}

const UserPage = ({ user }: Props) => {
  const router = useRouter()
  const [profilePic, setProfilePic] = useState< File | string  | null >( user.profilePic && user.profilePic.image ? user.profilePic.image : null )
  const [name, setName] = useState(user.name ? user.name : '')
  const [displayName, setDisplayName] = useState(user.name ? user.name : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [numeRol, setNumeRol] = useState(user.role ? user.role : '')
  const [inactive, setInactive] = useState(user.inactive)
  const [permisiuni, setPermisiuni] = useState< string[] >(user.roles ? user.roles : [])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const handleSaveUserData = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if ( password != '' && password != confirmPassword ) {
      toast.error('Parola și confirmarea parolei nu corespund.')
      setIsLoading(false)
      return
    }

    if ( password != '' && password.length < 6 ) {
      toast.error('Parola trebuie să aibă minim 6 caractere.')
      setIsLoading(false)
      return
    }

    try {
      var result
      const docRef = doc(db, 'users', user.id)

      if ( profilePic && typeof profilePic != 'string'  ) {
        result = await uploadFile(profilePic)

        const data = {
          email: user.email, 
          password: password != '' ? password : null, 
          name, 
          profilePic: { file: result, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result.fileName}` }
        }
        
        await updateDoc(docRef, data)
      } else {
        const data = {
          email: user.email, 
          password: password != '' ? password : null, 
          name
        }
        
        await updateDoc(docRef, data)
      }   

      setPassword("")
      setConfirmPassword("")
      setDisplayName(name)
      toast.success('Datele user-ului au fost modificate cu succes.', { duration: 3000 })
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading(false)

    e.preventDefault()
  }

  const handleSavePermisions = async (e: any) => {
    e.preventDefault()
    if ( numeRol == '' ) {
      toast.error('Adaugă nume rol.')
      return
    }

    setIsLoading2(true)

    try {
      const docRef = doc(db, 'users', user.id)

      await updateDoc(docRef, {
        role: numeRol,
        roles: permisiuni.length == 1 && permisiuni.includes('editor') ? [] : permisiuni
      })

      toast.success('Permisiunile user-ului au fost modificate cu succes.', { duration: 3000 })
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading2(false)
  }

  const handleInactiveButton = async () => {
    if (confirm(`Ești sigur că vrei să ${inactive ? 'deblochezi' : 'blochezi'} user-ul?`)) {
      const docRef = doc(db, 'users', user.id)

      await updateDoc(docRef, { inactive: !inactive })
      toast.success(`Contul a fost ${ inactive ? 'activat' : 'dezactivat' } cu succes.`, { duration: 3000 })
      setInactive(!inactive)
    }
  }

  const handleDeleteUser = async () => {
    if (confirm(`Ești sigur că vrei să ștergi user-ul? Acțiunea este definitivă.`)) {
      const docRef = doc(db, 'users', user.id)

      await deleteDoc(docRef)
      toast.success(`Contul a fost șters cu succes.`)
      router.push('/admin/users')
    }
  }

  return (
    <AdminLayout>
      <div className='flex flex-row'>
        <form 
          onSubmit={handleSaveUserData}
          className='bg-admin-background rounded-3xl w-[calc((100%-48px)/3)] min-h-[calc(100vh-32px)] mr-6 min-w-[400px] max-w-[520px] p-8 flex flex-col justify-between'
        >
          <div>
            <h1 className='text-[28px] text-secondary font-bold'>{displayName}</h1>
            <h2 className='text-[15px] text-[#848484] mb-8 ml-1'>{user.email}</h2>
            
            <ProfileImageEditComponent 
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
              placeholder='introdu aici'
              setValue={setPassword}
              value={password}
              title='Setează parola'
              type='password'
            />
            <FormInput 
              placeholder='confirmă aici'
              setValue={setConfirmPassword}
              value={confirmPassword}
              title='Confirmă parola'
              type='password'
            />
          </div>
          
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center' /> :
            <button 
              type='submit'
              className="bg-primary cursor-pointer font-semibold flex items-center w-full justify-center py-3 text-onPrimary rounded-lg hover:scale-[1.05] transition-all"
            >
              Salvează modificările
            </button> 
          }
        </form>
        
        <form 
          onSubmit={handleSavePermisions}
          className='bg-admin-background rounded-3xl w-[calc((100%-48px)/3)] min-h-[calc(100vh-32px)] mr-6 min-w-[400px] max-w-[520px] p-8 flex flex-col justify-between'
        >
          <div>
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

          { isLoading2 ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='self-center'  /> :
            <button 
              type='submit'
              className="bg-primary cursor-pointer font-semibold flex items-center w-full justify-center py-3 text-onPrimary rounded-lg hover:scale-[1.05] transition-all"
            >
              Salvează modificările
            </button> 
          }
        </form>

        <div className='w-[calc((100%-48px)/3)] mr-6 min-w-[180px] max-w-[400px] mt-2 flex flex-col items-center'>
          <div 
            className='w-full py-4 rounded-2xl flex items-center justify-center'
            style={{background: inactive ? '#FF0F0F' : '#04D200'}}
          >
            <p className='text-white font-semibold'>{inactive ? 'blocat' : 'activ'}</p>
          </div>

          <button 
            onClick={handleInactiveButton}
            className='font-semibold mt-8 hover:scale-105 transition-all'
            style={{color: inactive ? '#04D200' : '#FF0F0F'}}
          >
            { inactive ? 'Activează' : 'Blochează'} contul
          </button>
          <button 
            onClick={handleDeleteUser}
            className='text-[#FF0F0F] font-semibold mt-8 hover:scale-105 transition-all'
          >
            Șterge contul definitiv
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UserPage

export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id as string
  const userSnap = await getDoc(doc(db, 'users', id))
  const { createdAt, ...userData }: any = userSnap.data()
  const user = { id: userSnap.id, ...userData }

  return { props: { user }}
}