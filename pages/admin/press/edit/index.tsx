import React, { useState } from 'react'
import AdminLayout from '../../../../components/admin-nav/AdminLayout'
import Dropdown from '../../../../components/admin/editProgram/Dropdown'
import { useRouter } from 'next/navigation'
import FormInput from '../../../../components/admin/editProgram/FormInput'
import { addDoc, collection, getDocs, query, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../../../../firebase'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import ImageListComponent from '../../../../components/admin/ImageListComponent'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { uploadFileToStorage } from '../../../../utils/uploadFileToStorage'

type Props = {
  categories: string[]
}

const Edit = ({ categories }: Props) => {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState< string | null >(null)
  const [file, setFile] = useState< string | File | null >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState< any[] >([])

  const handleUpload = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if ( !file ) {
      toast.error('Adaugă un fișier.')
      setIsLoading(false)
      return
    }

    try {
      var fileSnapshot
      var fileUrl
      
      if ( typeof file != 'string') {
        const reference = ref(storage, file?.name)
        fileSnapshot = await uploadBytes(reference, file!)

        fileUrl = await getDownloadURL(reference)
      } else {
        toast.error('Alege un fișier. Apoi încearcă din nou.')
        setIsLoading(false)
        return
      }

      try {
        var smallLogosPromises = images.map((image) => {
          return new Promise(async (resolve, reject) => {
            try {
              const smallLogo = await uploadFileToStorage(image)
              resolve(smallLogo)
            } catch (e) {
              reject (e)
            }
          })
        })

        var smallLogos = await Promise.all(smallLogosPromises)
      } catch (e) {
        throw e
      }
      console.log(smallLogos)
      await addDoc(collection(db, 'press-releases'), {
        title,
        category,
        createdAt: serverTimestamp(),
        smallLogos,
        file: {
          fileName: fileSnapshot.ref.fullPath,
          url: fileUrl
        }
      })

      toast.success('Comunicatul de presă a fost adăugat cu succes!', { duration: 3000, style: { textAlign: 'center' }})
      router.push('/admin/press')
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine. Încearcă din nou!', { duration: 3000, style: { textAlign: 'center' }})
    }

    setIsLoading(false)
  }

  const leavePage = () => {
    if (confirm('Ești sigur că vrei să părăsești pagina? Toate modificările vor fi pierdute.')) {
      router.push('/admin/press')
    }
  }

  return (
    <AdminLayout>
      <div className='flex flex-row justify-between w-full max-w-[1000px] items-center'>
        <h1 className='text-[28px] text-secondary font-bold '>Adaugă un comunicat de presă</h1>

        <button onClick={leavePage}>
          <svg 
            className='w-[36px] h-[36px] hover:scale-105 transition-all cursor-pointer' 
            viewBox="0 0 24 24" 
            fill="#8717F8" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path fillRule="evenodd" clipRule="evenodd" d="M9.70725 2.4087C9 3.03569 9 4.18259 9 6.4764V17.5236C9 19.8174 9 20.9643 9.70725 21.5913C10.4145 22.2183 11.4955 22.0297 13.6576 21.6526L15.9864 21.2465C18.3809 20.8288 19.5781 20.62 20.2891 19.7417C21 18.8635 21 17.5933 21 15.0529V8.94711C21 6.40671 21 5.13652 20.2891 4.25826C19.5781 3.37999 18.3809 3.17118 15.9864 2.75354L13.6576 2.34736C11.4955 1.97026 10.4145 1.78171 9.70725 2.4087ZM12 10.1686C12.4142 10.1686 12.75 10.52 12.75 10.9535V13.0465C12.75 13.48 12.4142 13.8314 12 13.8314C11.5858 13.8314 11.25 13.48 11.25 13.0465V10.9535C11.25 10.52 11.5858 10.1686 12 10.1686Z" fill="#260056"></path> 
              <path d="M7.54717 4.5C5.48889 4.503 4.41599 4.54826 3.73223 5.23202C3 5.96425 3 7.14276 3 9.49979V14.4998C3 16.8568 3 18.0353 3.73223 18.7676C4.41599 19.4513 5.48889 19.4966 7.54717 19.4996C7.49985 18.8763 7.49992 18.1557 7.50001 17.3768V6.6227C7.49992 5.84388 7.49985 5.1233 7.54717 4.5Z" fill="#260056"></path> 
            </g>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleUpload} className='flex flex-col justify-between h-full'>
        <div className='flex flex-row mt-16 mb-16'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-8 xl:mr-16'>
            <FormInput 
              value={title}
              setValue={setTitle}
              placeholder='Titlu'
              required={true}
              styleProps='mb-4'
            />

            <Dropdown
              placeholder='Selectează categoria'
              values={categories}
              selectedValue={category}
              setSelectedValue={setCategory}
              id='toggle_dropdown'
            />
          </div>

          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>
            <ImageListComponent 
              images={images}
              setImages={setImages}
            />
          </div>
        </div>
      

        <div className='mt-auto flex flex-row items-center justify-between w-full mb-8'>
          <div className='flex flex-row items-center'>
            <input
              type='file'
              id='product'
              accept='application/pdf'
              hidden
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <label 
              htmlFor='product'
              className='bg-admin-card p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4'
            >
              <p className='text-[14px] font-semibold text-secondary'>Încarcă fișierul în format pdf</p>
            </label>
            { file && 
              <div>
                <p className='text-[14px] text-[#00C572] font-semibold max-w-[600px]'>{typeof file != 'string' ? file.name : '' }</p>
                <p className='text-[14px] text-[#00C572] font-semibold'>{typeof file != 'string' ? (Math.round(file.size/10000))/100 + ' Mb' : '' }</p>
              </div>
            }
          </div>
          
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mx-12' /> :
            <button 
              type='submit'
              className='bg-primary p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4'
            >
              <p className='text-[14px] font-semibold text-onPrimary'>Adaugă comunicatul</p>
            </button> 
          }
        </div>   
      </form>
    </AdminLayout>
  )
}

export default Edit

export const getServerSideProps = async () => {
  const docsRef = query(collection(db, 'press-categories'))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( doc.data().category ))

  return { props: { categories }}
}