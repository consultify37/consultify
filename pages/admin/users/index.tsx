import { useEffect, useState } from 'react'
import { User } from '../../../types'
import Link from 'next/link'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import Image from 'next/image'
import Dots from '../../../components/admin/users/Dots'
import { collection, getDocs, or, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import toast from 'react-hot-toast'

const Users = () => {
  const [users, setUsers] = useState< User[] >([])

  const fetchUsers = async () => {
    try {
      const docsRef = query(collection(db, 'users'), or(where('roles', 'array-contains-any', ['admin','editor']), where('isCreating', '==', true)))
      const docsSnap = await getDocs(docsRef)

      const users: User[] = docsSnap.docs.map((doc) => (
        { id: doc.id, ...doc.data() } as User
      ))

      setUsers(users)
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine. Reîmprospăteză pagina!')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <AdminLayout>
      <div className='flex flex-row justify-end'>
        <Link
          href='/admin/users/adauga'
          className='rounded-xl bg-primary text-onPrimary font-semibold flex p-4 px-14 items-center justify-center hover:scale-[1.05] transition-all'
        >
          Adaugă user
        </Link>
      </div>

      <table className='w-full mt-3 text-left border-separate border-spacing-y-5'>
        <thead className='bg-admin-header'>
          <tr>
            <th className='pl-8 py-4 rounded-s-lg'>Nume</th>
            <th className='py-4'>Email</th>
            <th className='py-4'>Rol</th>
            <th className='py-4'>Status</th>
            <th className='py-4 rounded-e-lg'>Info</th>
          </tr> 
        </thead>
        <tbody className=''>
          { users.map((user) => (
            <tr 
              className='bg-admin-card'
              key={user.id}
            >
              <td className='pl-8 rounded-s-lg'>
                <div className='flex flex-row items-center'>
                  <Image 
                    src={user.profilePic ? user.profilePic.image : '/images/person.jpeg' }
                    width={512}
                    height={512}
                    alt={user.name}
                    className='w-14 h-14 my-3 rounded-full mr-3 object-cover'
                  />
                  <p className='font-semibold'>{user.name}</p>
                </div>
              </td>
              <td className='py-4 font-semibold'>{user.email}</td>
              <td className='py-4 font-semibold'>{user.role ? user.role : "" }</td>
              { user.isCreating ?
                <td className='py-4' style={{color: '#FFA500'}} >se crează...</td> :
                <td className='py-4 font-semibold' style={{color: user.inactive ? '#FF0F0F' : '#04D200'}} >{user.inactive ? 'blocat' : 'activ'}</td>
              }
              <td className='rounded-e-lg'>
                { !user.isCreating &&
                  <Dots 
                    to={`/admin/users/user/${user.id}`}
                  />
                }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </AdminLayout>
  )
}

export default Users

