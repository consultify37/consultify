import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import Categories from '../../../components/admin/Categories'
import { Category } from '../../../types'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import FormTextArea from '../../../components/admin/editProgram/FormTextArea'
import ImageComponent from '../../../components/admin/produse/ImageComponent'
import { uploadFile } from '../../../utils/b2_storage/upload_file'
import { deleteFile } from '../../../utils/b2_storage/delete_file'

const CategoriiPrograme = () => {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState< Category[] >([])
  const [image, setImage] = useState< File | string | null >(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const fetchCategories = async () => {
    setIsFetching(true)
    const docsRef = query(collection(db, 'product-categories'))
    const docsSnap = await getDocs(docsRef)

    const data = docsSnap.docs.map((doc) => (
      { id: doc.id, ...doc.data()} as Category
    ))

    console.log(data)

    setCategories(data)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if ( image == null ) {
      'Alege o imagine principală. Apoi încearcă din nou.'
    }

    try {
      var result1: any

      if ( typeof image != 'string')  {
        try {
          result1 = await uploadFile(image!)
        } catch (e) {
          throw e
        }
      }

      const doc = await addDoc(collection(db, 'product-categories'), { category: category, site: process.env.SITE, description: description, image: { file: result1, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result1.fileName}` }, })
      setCategories((categories) => [{ id: doc.id, category: category, description: description, image: { file: result1, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result1.fileName}` }, }, ...categories ])
      setCategory('')
      setDescription('')
      setImage(null)
      toast.success('Categorie adăugat cu succes.', { duration: 3000 })
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }

    setIsLoading(false)
  }

  const handleDelete = async (category: Category) => {
    setIsFetching(true)

    if (!confirm('Ești sigur că vrei să elimini categoria? Acțiunea este ireversibilă.')) {
      setIsFetching(false)
      return
    }

    try {
      const docRef = doc(db, 'product-categories', category.id! )
      await deleteDoc(docRef)

      setCategories((categories) => categories.filter((item) => category.id != item.id ))

      category.image && await deleteFile({ fileId: category.image.file.fileId, fileName: category.image.file.fileName })
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }

    setIsFetching(false)
  }

  return (
    <AdminLayout>
      <h1 className='text-[28px] text-secondary font-bold '>Categorii produse</h1>
      <div className='flex flex-row mt-8'>
        <form 
          className='mr-16 w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'
          onSubmit={handleAddCategory}
        >
          <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Numele categoriei</h2>
          <div className='relative'>
            <input 
              className='text-base p-4 rounded-xl border-2 border-primary outline-none w-full pr-[52px]'
              placeholder='ex: Template-uri'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

              { isLoading ?
                <div className='absolute top-[18px] right-6 flex items-center'>
                  <ReactLoading type="spin" color="#8717F8" width={22} height={22} />
                </div> :
                <button 
                  className='absolute top-[18px] right-6 flex items-center cursor-pointer hover:scale-[1.05] transition-all'
                  type='submit'
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.0051994 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.80629 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H13V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V13H8C7.73479 13 7.48043 12.8946 7.2929 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.2929 11.2929C7.48043 11.1054 7.73479 11 8 11H11V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12Z" fill="#8717F8"/>
                  </svg>
                </button>
              }
          </div>
          
          <h2 className='text-[14px] font-semibold text-secondary mt-8 mb-2 ml-1'>Descrierea categoriei</h2>
          <FormTextArea
            value={description}
            setValue={setDescription}
            placeholder='descrierea categoriei'
            styleProps='w-[calc(50%-32px)] min-w-[220px] max-w-[480px] h-44 resize-none'
            required={true}
          />

          <ImageComponent 
            image={image}
            setImage={setImage}
            style='object-cover'
          />
        </form>

        <div className='w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>
          <Categories 
            categories={categories}
            handleDelete={handleDelete}
            isFetching={isFetching}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default CategoriiPrograme

