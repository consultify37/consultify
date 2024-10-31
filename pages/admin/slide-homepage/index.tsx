import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import InputField from '../../../components/admin/InputField'
import SlideHomePageImages from '../../../components/admin/SlideHomePageImages'
import Image from 'next/image'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import ReactLoading from 'react-loading'
import { deleteFile } from '../../../utils/b2_storage/delete_file'
import { Slide } from '../../../types'
import toast from 'react-hot-toast'
import { uploadFile } from '../../../utils/b2_storage/upload_file'
import { useAuthContext } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'

const SlideHomepage = () => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const [link, setLink] = useState("")
  const [slides, setSlides] = useState< Slide[] >([])
  const [newImage, setNewImage] = useState< File | null >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const fetchSlides = async () => {
    setIsFetching(true)

    const docsRef = query(collection(db, 'slides-homepage'), where('site', '==', process.env.SITE))
    const docsSnap = await getDocs(docsRef)

    const data: any[] = docsSnap.docs.map(doc => (
      { id: doc.id, ...doc.data() }
    ))
    
    setSlides(data)
    setIsFetching(false)
  } 

  useEffect(() => {
    if ( !currentUser?.roles.includes('banner-homepage') ) {
      toast.error('Nu aveți permisie să modificați banners.', {duration: 3000})
      router.push('/admin')
    }

    fetchSlides()
  }, [])
  
  const handleDelete = async (slide: Slide) => {
    setIsFetching(true)

    if (!confirm('Ești sigur că vrei să elimini slide-ul? Acțiunea este ireversibilă.')) {
      setIsFetching(false)
      return
    }

    if ( slide.file ) {
      try {
        const docRef = doc(db, 'slides-homepage', slide.id! )
        await deleteDoc(docRef)
        await deleteFile(slide.file)
      } catch (e) {
        toast.error('Ceva nu a mers bine. Încearcă din nou!')
      }
    }

    setSlides((slides) => slides.filter((item) => item != slide))
    setIsFetching(false)
  }

  const handleUpload = async (e: any) => {
    e.preventDefault()
    if ( !newImage ) {
      toast.error('Adaugă imaginea!')
      return
    }

    setIsLoading(true)


    try {
      const result = await uploadFile(newImage!)
      
      await addDoc(collection(db, 'slides-homepage'), { link, file: result, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result.fileName}`, site: process.env.SITE })  

      setSlides(slides => [{ link, image: newImage!, file: null}, ...slides])
      setLink("")
      setNewImage(null)
      toast.success('Slide adăugat cu succes!')
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading(false)
  }

  return (
    <AdminLayout>
      <h1 className='text-[28px] text-secondary font-bold '>Adaugă o imagine în slide - 1066 x 411</h1>
      <div className='mt-8 flex flex-row'>
        <form 
          className='flex flex-col mr-16'
          onSubmit={handleUpload}
        >
          { newImage ?
              <Image 
                src={URL.createObjectURL(newImage)}
                width={1066}
                height={411}
                alt={newImage.name}
                className='rounded-xl h-[186px] w-[484px]'
              /> : 
              <div className='flex justify-center items-center rounded-xl bg-white h-[186px] w-[484px]'>
                <input 
                  type='file'
                  id='slide-image'
                  accept="image/*"
                  hidden
                  onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
                />
    
                <label htmlFor='slide-image' className='rounded-full bg-admin-card p-4 flex items-center justify-center cursor-pointer hover:scale-[1.05] transition-all'>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.0051994 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.80629 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H13V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V13H8C7.73479 13 7.48043 12.8946 7.2929 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.2929 11.2929C7.48043 11.1054 7.73479 11 8 11H11V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12Z" fill="#8717F8"/>
                  </svg>
                </label>       
              </div>
          }
          
          { newImage ?
            <div className='flex flex-row justify-between items-center px-2 mt-4 mb-8'>
              <p className='text-lg text-secondary font-semibold'>{newImage.name}</p>
              <p 
                className='text-lg text-red-500 underline underline-offset-1 font-semibold cursor-pointer'
                onClick={() => setNewImage(null)}
              >
                șterge
              </p>
            </div> :
            <div className='h-[76px]'></div>
          }

          <InputField 
            text={link}
            setText={setLink}
            placeholder='Atașează link-ul aici'
            required={true}
          />

            { isLoading ?
              <div className='mt-8 w-full flex items-center justify-center'>
                <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
              </div> :
              <button 
                className='rounded-xl bg-primary w-full flex items-center justify-center hover:scale-[1.05] transition-all mt-8 p-4'
                type='submit'
              >
                <p  className='text-onPrimary text-base font-semibold'>Adaugă</p>
              </button>
            }
        </form>

        <SlideHomePageImages 
          slides={slides}
          handleDelete={handleDelete}
          isFetching={isFetching}
        />
      </div>
    </AdminLayout>
  )
}

export default SlideHomepage