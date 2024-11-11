import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import Link from 'next/link'
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import ReactLoading from 'react-loading'
import { PressRealease, Program } from '../../../types'
import toast from 'react-hot-toast'
import { deleteObject, ref } from 'firebase/storage'

const Press = () => {
  const [releases, setRealeases] = useState< PressRealease[] >([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchPrograme = async () => {
    setIsFetching(true)

    const docsRef = query(collection(db, 'press-releases'))
    const docsSnap = await getDocs(docsRef)

    const data: PressRealease[] = docsSnap.docs.map(doc => (
      { id: doc.id, ...doc.data() } as any
    ))
    console.log(data)
    setRealeases(data)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchPrograme()
  }, [])

  const handleDelete = async (realease: PressRealease) => {
    setIsFetching(true)
    
    if (!confirm('Ești sigur că vrei să elimini comunicatul de presă? Acțiunea este ireversibilă.')) {
      setIsFetching(false)
      return
    }
    
    try {
      const docRef = doc(db, 'press-releases', realease.id)

      try {
        await deleteObject(ref(storage, realease.file.fileName))

        var results = realease.smallLogos.map((smallLogo) => {
          return new Promise(async (resolve, reject) => {
            try {
              await deleteObject(ref(storage, smallLogo.fileName))
              resolve({})
            } catch { reject({}) }
          })
        })

        await Promise.all(results)
      } catch {}

      await deleteDoc(docRef)

      setRealeases(realeases => realeases.filter((item) => realease.id != item.id ))
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }
 
    setIsFetching(false)
  }

  return (
    <AdminLayout>
      <h1 className='text-[28px] text-secondary font-bold '>Comunicate de presă</h1>
      <div className='grid grid-cols-2 gap-6 mt-8 max-w-[984px]'>
        <Link 
          className='rounded-xl bg-primary max-w-[480px] flex items-center justify-center hover:scale-[1.05] transition-all p-4'
          href='/admin/press/edit'
        >
          <p  className='text-onPrimary text-base font-semibold'>Adaugă</p>
        </Link>

        {
          isFetching ?
          <div className='w-full max-w-[480px] flex flex-col items-center justify-center'>
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
          </div> :
          <>
          { releases.map((item) => (
              <div className='relative rounded-xl bg-admin-card max-w-[480px] p-4' key={item.id}>
                <p className='text-secondary text-base font-semibold max-w-[85%]'>{item.title}</p>

                <div className='absolute flex flex-row items-center top-4 right-4'>
                  <Link href={`/admin/press/edit/${item.id}`}>
                    <svg className='hover:scale-[1.05] transition-all cursor-pointer mr-4' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.999996 4.75024H3.73599C3.95062 5.53997 4.41916 6.23713 5.06931 6.73417C5.71946 7.2312 6.5151 7.50049 7.33347 7.50049C8.15185 7.50049 8.94749 7.2312 9.59764 6.73417C10.2478 6.23713 10.7163 5.53997 10.931 4.75024H22.9999C23.2651 4.75024 23.5195 4.64489 23.707 4.45735C23.8946 4.26981 23.9999 4.01546 23.9999 3.75025C23.9999 3.48503 23.8946 3.23068 23.707 3.04314C23.5195 2.85561 23.2651 2.75025 22.9999 2.75025H10.931C10.7163 1.96052 10.2478 1.26336 9.59764 0.766325C8.94749 0.26929 8.15185 0 7.33347 0C6.5151 0 5.71946 0.26929 5.06931 0.766325C4.41916 1.26336 3.95062 1.96052 3.73599 2.75025H0.999996C0.734781 2.75025 0.480428 2.85561 0.292892 3.04314C0.105356 3.23068 0 3.48503 0 3.75025C0 4.01546 0.105356 4.26981 0.292892 4.45735C0.480428 4.64489 0.734781 4.75024 0.999996 4.75024ZM7.33297 2.00025C7.67909 2.00025 8.01743 2.10289 8.30522 2.29518C8.593 2.48747 8.8173 2.76078 8.94976 3.08055C9.08221 3.40032 9.11687 3.75219 9.04934 4.09165C8.98182 4.43112 8.81515 4.74294 8.57041 4.98768C8.32566 5.23242 8.01385 5.39909 7.67438 5.46661C7.33492 5.53414 6.98305 5.49948 6.66328 5.36703C6.34351 5.23458 6.0702 5.01027 5.87791 4.72249C5.68562 4.43471 5.58298 4.09636 5.58298 3.75025C5.58351 3.28628 5.76805 2.84147 6.09613 2.5134C6.4242 2.18532 6.86901 2.00078 7.33297 2.00025Z" fill="#8717F8"/>
                      <path d="M22.9999 11H20.2639C20.0496 10.2101 19.5813 9.51268 18.9312 9.01544C18.2811 8.5182 17.4854 8.24878 16.6669 8.24878C15.8485 8.24878 15.0528 8.5182 14.4027 9.01544C13.7526 9.51268 13.2842 10.2101 13.07 11H0.999996C0.734781 11 0.480428 11.1054 0.292892 11.2929C0.105356 11.4804 0 11.7348 0 12C0 12.2652 0.105356 12.5196 0.292892 12.7071C0.480428 12.8946 0.734781 13 0.999996 13H13.07C13.2842 13.7899 13.7526 14.4873 14.4027 14.9846C15.0528 15.4818 15.8485 15.7512 16.6669 15.7512C17.4854 15.7512 18.2811 15.4818 18.9312 14.9846C19.5813 14.4873 20.0496 13.7899 20.2639 13H22.9999C23.2651 13 23.5195 12.8946 23.707 12.7071C23.8946 12.5196 23.9999 12.2652 23.9999 12C23.9999 11.7348 23.8946 11.4804 23.707 11.2929C23.5195 11.1054 23.2651 11 22.9999 11ZM16.6669 13.75C16.3208 13.75 15.9825 13.6474 15.6947 13.4551C15.4069 13.2628 15.1826 12.9895 15.0502 12.6697C14.9177 12.3499 14.883 11.9981 14.9506 11.6586C15.0181 11.3191 15.1848 11.0073 15.4295 10.7626C15.6742 10.5178 15.9861 10.3512 16.3255 10.2836C16.665 10.2161 17.0169 10.2508 17.3366 10.3832C17.6564 10.5157 17.9297 10.74 18.122 11.0278C18.3143 11.3155 18.4169 11.6539 18.4169 12C18.4164 12.464 18.2319 12.9088 17.9038 13.2368C17.5757 13.5649 17.1309 13.7495 16.6669 13.75Z" fill="#8717F8"/>
                      <path d="M22.9999 19.2502H10.931C10.7163 18.4605 10.2478 17.7634 9.59764 17.2663C8.94749 16.7693 8.15185 16.5 7.33347 16.5C6.5151 16.5 5.71946 16.7693 5.06931 17.2663C4.41916 17.7634 3.95062 18.4605 3.73599 19.2502H0.999996C0.734781 19.2502 0.480428 19.3556 0.292892 19.5431C0.105356 19.7307 0 19.985 0 20.2502C0 20.5155 0.105356 20.7698 0.292892 20.9574C0.480428 21.1449 0.734781 21.2502 0.999996 21.2502H3.73599C3.95062 22.04 4.41916 22.7371 5.06931 23.2342C5.71946 23.7312 6.5151 24.0005 7.33347 24.0005C8.15185 24.0005 8.94749 23.7312 9.59764 23.2342C10.2478 22.7371 10.7163 22.04 10.931 21.2502H22.9999C23.2651 21.2502 23.5195 21.1449 23.707 20.9574C23.8946 20.7698 23.9999 20.5155 23.9999 20.2502C23.9999 19.985 23.8946 19.7307 23.707 19.5431C23.5195 19.3556 23.2651 19.2502 22.9999 19.2502ZM7.33297 22.0002C6.98686 22.0002 6.64851 21.8976 6.36073 21.7053C6.07294 21.513 5.84864 21.2397 5.71619 20.9199C5.58374 20.6002 5.54908 20.2483 5.61661 19.9088C5.68413 19.5694 5.8508 19.2576 6.09554 19.0128C6.34028 18.7681 6.6521 18.6014 6.99157 18.5339C7.33103 18.4664 7.6829 18.501 8.00267 18.6335C8.32244 18.7659 8.59575 18.9902 8.78804 19.278C8.98033 19.5658 9.08297 19.9041 9.08297 20.2502C9.08217 20.7141 8.89755 21.1588 8.56953 21.4868C8.24151 21.8148 7.79686 21.9994 7.33297 22.0002Z" fill="#8717F8"/>
                    </svg>
                  </Link>

                  <svg onClick={() => handleDelete(item) } className='hover:scale-[1.05] transition-all cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#8717F8"/>
                    <rect x="14.8281" y="7.75732" width="2" height="10" rx="1" transform="rotate(45 14.8281 7.75732)" fill="#8717F8"/>
                    <rect x="16.2422" y="14.8286" width="2" height="10" rx="1" transform="rotate(135 16.2422 14.8286)" fill="#8717F8"/>
                  </svg>
                </div>
              </div>
            ))

            }
          </>
        }
        
      </div>
    </AdminLayout>
  )
}

export default Press