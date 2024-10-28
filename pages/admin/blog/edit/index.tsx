import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../../components/admin-nav/AdminLayout'
import FormInput from '../../../../components/admin/editProgram/FormInput'
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic"
import ImageComponentBlog from '../../../../components/admin/blog/ImageComponentBlog'
import ImageListComponentBlog from '../../../../components/admin/blog/ImageListComponentBlog'
import { addDoc, collection, getDocs, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../firebase'
import BulletPointsContainer from '../../../../components/admin/editProgram/BulletPointsContainer'
import { ArticleCategory } from '../../../../types'
import Categories from '../../../../components/admin/blog/Categories'
import toast from 'react-hot-toast'
import { uploadFile } from '../../../../utils/b2_storage/upload_file'
import { useRouter } from 'next/navigation'
import ReactLoading from 'react-loading'
import FormTextArea from '../../../../components/admin/editProgram/FormTextArea'

type Props = {
  initialCategories: ArticleCategory[]
}

const Edit = ({ initialCategories }: Props) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[])
  
  const toolbarOptions = useMemo(() => (
    {
      container: [[{ 'header': [1, 2, 3, false] }], [{ 'list': 'bullet'}, {'list': 'ordered'}, 'bold', 'italic', 'link']], //[[{ 'header': [1, 2, 3, false] }], ['bold', 'italic',{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }, { 'color': [] }, { 'background': [] }, 'link']]
    }
  ), []) 
  
  const modules = { 
    toolbar: toolbarOptions,
  }

  const router = useRouter()

  const [title, setTitle] = useState('')
  const [mainImage, setMainImage] = useState< any >(null)
  const [images, setImages] = useState< any[] >([])
  const [keywords, setKeywords] = useState< string[] >([])
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState< ArticleCategory[] >(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [duration, setDuration] = useState('')
  const [author, setAuthor] = useState('')
  const [authorDescription, setAuthorDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [active, setActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState('')

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( !mainImage ) {
      toast.error("Adaugă imaginea principală.") 
      return
    }

    setIsLoading(true)

    try {
      var formattedContent = content
      var result: any
      var results: any[]
      var promises: Promise<any>[] = []

      if ( typeof mainImage != 'string' ) {
        result = await uploadFile( mainImage! )
      }

      images.forEach((image) => {
        const result: Promise<any> = new Promise(async (resolve, reject) => {
          try {
            if ( typeof image != 'string' ) {
              const result = await uploadFile(image)
              resolve({ file: result, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result.fileName}` })
            } else {
              reject('error')
            }
          } catch (e) {
            reject(e)
          }
        })

        promises.push(result)
      }) 

      results = await Promise.all(promises)

      results.forEach((image, index) => {
        formattedContent = formattedContent.replace(`&lt;img id="${index}" /&gt;`, `<img src="${image.image}" alt="${image.file.fileName}" />`)
      })

      const data = {
        mainImage: { file: result, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${result.fileName}` },
        images: results,
        title,
        description,
        content,
        formattedContent,
        duration,
        featured,
        active,
        author,
        authorDescription,
        category: selectedCategory,
        keywords,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }

      await addDoc(collection(db, 'articles'), data)

      toast.success('Articol adăugat cu succes.', { duration: 3000 })
      setTimeout(() => {
       router.push('/admin/blog')
      }, 200)
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou.')
    }

    setIsLoading(false)
  }
  
  return (
    <AdminLayout>
      <form 
        className='flex flex-row w-full min-h-[calc(100vh-128px)]'
        onSubmit={handleUpload}
      >
        <div className='flex flex-col w-[calc(71%-32px)] mr-8'>
          <FormInput 
            placeholder='Adaugă titlu'
            setValue={setTitle}
            value={title}
            required
          />

          {/* <div className='w-[484px]'>
            <ImageComponent 
              image={mainImage}
              setImage={setMainImage}
              title='Imaginea principală'
              style='h-[146px] object-contain'
            />
          </div> */}

          <ReactQuill 
            placeholder=''
            theme="snow" 
            className="mt-8 h-[calc(100vh-128px-32px-32px-64px)]"
            modules={modules}
            value={content} 
            onChange={setContent} 
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-[72px]'>Adaugă descriere</p>
          <FormTextArea 
            placeholder='Descriere'
            setValue={setDescription}
            value={description}
            required
            styleProps='h-44 resize-none'
          />
        </div>

        <div className='flex flex-col w-[29%]'>
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='my-4 self-center' /> :
            <button 
              type='submit'
              className='w-full py-[19px] bg-primary rounded-[10px] hover:scale-105 transition-all'
            >
              <p className='text-[14px] font-semibold text-onPrimary'>Publică articolul</p>
            </button>
          }

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-8'>Articol activ</p>
          <div
            className='flex flex-row items-center cursor-pointer w-fit'
            onClick={() => setActive(!active) }
          >
            <div 
              className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
              style={{ background: active ? '#8717F8' : 'transparent' }}
            ></div>
            <p className='text-secondary font-semibold text-[16px] pt-[2px]'>articol activ</p>
          </div>

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-8'>Featured</p>
          <div
            className='flex flex-row items-center cursor-pointer w-fit'
            onClick={() => setFeatured(!featured) }
          >
            <div 
              className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-2'
              style={{ background: featured ? '#8717F8' : 'transparent' }}
            ></div>
            <p className='text-secondary font-semibold text-[16px] pt-[2px]'>featured</p>
          </div>

          <ImageComponentBlog 
            image={mainImage}
            setImage={setMainImage}
          />

          <ImageListComponentBlog 
            images={images}
            setImages={setImages}
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-6'>Adaugă keywords</p>
          <BulletPointsContainer 
            bulletPoints={keywords}
            setBulletPoints={setKeywords}
            placeholder='adaugă keyword'
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-6'>Selectează categoria</p>
          <Categories 
            categories={categories}
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            setSelectedCategory={setSelectedCategory}
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-6'>Timp de citire</p>
          <FormInput 
            placeholder='ex: 5 minute'
            setValue={setDuration}
            value={duration}
            required
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-6'>Autor</p>
          <FormInput 
            placeholder='adaugă autorul'
            setValue={setAuthor}
            value={author}
            required
          />

          <p className='text-secondary text-[15px] font-semibold mb-2 mt-6'>Funcție autor</p>
          <FormInput 
            placeholder='adaugă funcția autorului'
            setValue={setAuthorDescription}
            value={authorDescription}
            required
          />

        </div>
      </form>
    </AdminLayout>
  )
}

export default Edit

export const getServerSideProps = async () => {
  const docsRef = query(collection(db, 'blog-categories'))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( { id: doc.id, ...doc.data()} ))

  return { props: { initialCategories: categories }}
}