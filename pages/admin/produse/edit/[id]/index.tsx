import React, { useState } from 'react'
import AdminLayout from '../../../../../components/admin-nav/AdminLayout'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../../../../../firebase'
import FormTextArea from '../../../../../components/admin/editProgram/FormTextArea'
import FormInput from '../../../../../components/admin/editProgram/FormInput'
import Dropdown from '../../../../../components/admin/editProgram/Dropdown'
import ImageComponent from '../../../../../components/admin/produse/ImageComponent'
import BulletPointsContainer from '../../../../../components/admin/editProgram/BulletPointsContainer'
import { Faq, Product } from '../../../../../types'
import AdminFaq from '../../../../../components/admin/editProgram/AdminFaq'
import { uploadFile } from '../../../../../utils/b2_storage/upload_file'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { NextPageContext } from 'next'
import { deleteFile } from '../../../../../utils/b2_storage/delete_file'
import Link from 'next/link'
import { UploadResult, deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

type Props = {
  categories: string[]
  product: Product
}

const Edit = ({ categories, product }: Props) => {
  const router = useRouter()
  const [name, setName] = useState(product.name ? product.name : '')
  const [category, setCategory] = useState< string | null >(product.category ? product.category : null)
  const [description, setDescription] = useState( product.description ? product.description : '' )
  const [description2, setDescription2] = useState( product.description2 ? product.description2 : '')
  const [reasons, setReasons] = useState< string[] >( product.reasons ? product.reasons : [] )
  const [title3, setTitle3] = useState( product.title3 ? product.title3 : '' )
  const [description3, setDescription3] = useState( product.description3 ? product.description3 : '')
  const [price, setPrice] = useState< number | null >( product.price ? product.price : null )
  const [oldPrice, setOldPrice] = useState< number | null >( product.oldPrice ? product.oldPrice : null )
  const [image, setImage] = useState< File | string | null >( product.image && product.image.image ? product.image.image : null )
  const [onSale, setOnSale] = useState( product.onSale ? product.onSale : false  )
  const [faqs, setFaqs] = useState< Faq[] >( product.faqs ? product.faqs : [])
  const [file, setFile] = useState< string | File | null >( product.file && product.file.url ? product.file.url : null )
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState( product.active )
  const [featured, setFeatured] = useState( product.featured ? product.featured : false )

  const oldImage = product.image && product.image.file ? product.image : null
  const oldFile = product.file && product.file.file ? product.file : null

  const handleUpload = async (e: any) => {
    setIsLoading(true)
    e.preventDefault()

    if ( image == null ) {
      toast.error('Alege o imagine principală. Apoi încearcă din nou.')
      setIsLoading(false)
      return
    }

    if ( file == null ) {
      toast.error('Alege un fișier. Apoi încearcă din nou.')
      setIsLoading(false)
      return
    }

    if (price && price <= 2.0 ) {
      toast.error('Prețul trebuie să fie mai mare de 2.')
      setIsLoading(false)
      return
    }

    if (String(price).split(".")[1]?.length > 2) {
      toast.error('Prețul poate avea maxim 2 zecimale.')
      setIsLoading(false)
      return
    }

    if (String(oldPrice).split(".")[1]?.length > 2) {
      toast.error('Prețul vechi poate avea maxim 2 zecimale.')
      setIsLoading(false)
      return
    }

    try {

      var newImage
      var newFileSnapshot: UploadResult | null
      var newFileUrl: string | null

      if ( typeof image != 'string' )  {
        try {
          try {
            oldImage?.file && await deleteFile(oldImage?.file)
          } catch (e) {}
          
          newImage = await uploadFile(image!)

        } catch (e) {
          throw e
        }
      } else {
        newImage = oldImage ? oldImage.file : null
      }

      if ( typeof file != 'string' )  {
        try {
          const reference = ref(storage, file?.name)
          try {
            oldFile && oldFile.file && await deleteObject(ref(storage, oldFile?.file.fileName))
          } catch (e) {}
          
          newFileSnapshot = await uploadBytes(reference, file!)

          newFileUrl = await getDownloadURL(reference)
          
        } catch (e: any) {
          throw e
        }
      } else {
        newFileUrl = oldFile ? oldFile.url : null
        newFileSnapshot = null
      }

      var newData

      if (newFileSnapshot) {
        newData = {
          site: process.env.SITE,
          active,
          featured,
          name,
          category,
          description,
          description3,
          description2,
          reasons,
          title3,
          price: Math.round(price! * 100) / 100,
          oldPrice: oldPrice ? Math.round(oldPrice! * 100) / 100 : null,
          onSale,
          faqs,
          image: newImage ? { file: newImage, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${newImage.fileName}` } : null,
          file: { file: { fileName: newFileSnapshot.ref.fullPath, fileId: newFileSnapshot.ref.fullPath }, url: newFileUrl }
        }
      } else {
        newData = {
          site: process.env.SITE,
          active,
          featured,
          name,
          category,
          description,
          description3,
          description2,
          reasons,
          title3,
          price: Math.round(price! * 100) / 100,
          oldPrice: oldPrice ? Math.round(oldPrice! * 100) / 100 : null,
          onSale,
          faqs,
          image: newImage ? { file: newImage, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${newImage.fileName}` } : null,
        }
      }
      
      await updateDoc(doc(db, 'products', product.id!), newData)

      toast.success('Produsul a fost modificat cu succes.', { duration: 3000 })
      router.push('/admin/produse')
    } catch (e) {
      console.log(e)
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading(false)
  }

  const leavePage = () => {
    if (confirm('Ești sigur că vrei să părăsești pagina? Toate modificările vor fi pierdute.')) {
      router.push('/admin/produse')
    }
  }
  
  return (
    <AdminLayout>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-[28px] text-secondary font-bold '>Editează produsul</h1>
        <div className='flex flex-row items-center'>
          <div 
            className='py-3 px-12 mr-4 rounded-2xl flex items-center justify-center'
            style={{background: active ? '#04D200' : '#FF0F0F'}}
          >
            <p className='text-white font-semibold'>{active ? 'activ' : 'inactiv'}</p>
          </div>

          <button
            onClick={leavePage}
            className='p-2 hover:scale-105 transition-all w-full mr-4'
          >
            <Image 
              src='/images/admin/X.svg'
              width={16}
              height={16}
              alt='X'
              className='w-4 h-4'
            />
          </button>
        </div>
      </div>

      <form
        onSubmit={handleUpload}
      >
        <div className='flex flex-row mt-8'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-8 xl:mr-16'>
            <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Numele produsului</h2>
            <FormInput
              value={name}
              setValue={setName}
              placeholder='ex: Ghid fonduri 2022'
              required={true}
            />

            <h2 className='text-[14px] font-semibold text-secondary mt-8 mb-2 ml-1'>Descriere 1</h2>
            <FormTextArea
              value={description}
              setValue={setDescription}
              placeholder='Descriere 1'
              styleProps='w-[calc(50%-32px)] min-w-[220px] max-w-[480px] h-36 resize-none'
              required={true}
            />

            <h2 className='text-[14px] font-semibold text-secondary mt-8 mb-2 ml-1'>Descriere 2</h2>
            <FormTextArea
              value={description2}
              setValue={setDescription2}
              placeholder='Descriere 2'
              styleProps='w-[calc(50%-32px)] min-w-[220px] max-w-[480px] h-36 resize-none'
              required={true}
            />
            <h2 className='text-[14px] font-semibold text-secondary mt-8 mb-2 ml-1'>De ce să alegi produsul?</h2>
            <BulletPointsContainer 
              bulletPoints={reasons}
              setBulletPoints={setReasons}
            />
          </div>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>

            <div
              className='flex flex-row items-center cursor-pointer mb-3 w-fit'
              onClick={() => setActive(!active) }
            >
              <div 
                className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-4'
                style={{ background: active ? '#8717F8' : 'transparent' }}
              ></div>
              <p className='text-secondary font-semibold text-[16px] pt-[2px]'>Produs activ</p>
            </div>

            <div
              className='flex flex-row items-center cursor-pointer mb-3 w-fit'
              onClick={() => setFeatured(!featured) }
            >
              <div 
                className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-4'
                style={{ background: featured ? '#8717F8' : 'transparent' }}
              ></div>
              <p className='text-secondary font-semibold text-[16px] pt-[2px]'>Featured</p>
            </div>

            <div
              className='flex flex-row items-center cursor-pointer mb-6 w-fit'
              onClick={() => { setOnSale(!onSale); onSale && setOldPrice(null) } }
            >
              <div 
                className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-4'
                style={{ background: onSale ? '#8717F8' : 'transparent' }}
              ></div>
              <p className='text-secondary font-semibold text-[16px] pt-[2px]'>Produs la reducere</p>
            </div>

            <div className='flex flex-row'>
              <div className='mr-4 w-[calc(100%-8px)]'>
                <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Preț vechi</h2>
                <input 
                  className={'text-base p-4 rounded-xl border-2  outline-none w-full' + (onSale ? ' border-primary' : '') }
                  placeholder='ex: 129,99'
                  type='number'
                  value={oldPrice ? oldPrice : ''}
                  onChange={(e) => setOldPrice(e.target.value != '' ? Number(e.target.value) : null) }
                  disabled={!onSale}
                />
              </div>

              <div className='w-[calc(100%-8px)]'>
                <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1'>Preț</h2>
                <input 
                  className='text-base p-4 rounded-xl border-2 border-primary outline-none w-full '
                  placeholder='ex: 100,99'
                  type='number'
                  value={price ? price : ''}
                  onChange={(e) => setPrice(Number(e.target.value != '' ? Number(e.target.value) : null)) }
                  required
                />
              </div>
            </div>

            <h2 className='text-[14px] font-semibold text-secondary mt-8 mb-2 ml-1'>Categoria</h2>
            <Dropdown
              values={categories}
              selectedValue={category}
              setSelectedValue={setCategory}
            />

            <ImageComponent 
              image={image}
              setImage={setImage}
              style='object-contain'
            />
          </div>
        </div>

        <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-8'>Întrebări frecvente</h2>
        <AdminFaq 
          faqs={faqs}
          setFaqs={setFaqs}
        />

        <h2 className='text-[14px] font-semibold text-secondary mb-2 ml-1 mt-12'>Cui i se adresează?</h2>
        <FormInput
          value={title3}
          setValue={setTitle3}
          placeholder='ex: Ghid fonduri 2022'
          required={true}
        />

        <FormTextArea
          value={description3}
          setValue={setDescription3}
          placeholder='Descriere 1'
          styleProps='h-48 resize-none mt-6'
          required={true}
        />

        <div className='mt-16 flex flex-row items-center justify-between w-full'>
          <div className='flex flex-row items-center'>
            <input
              type='file'
              id='product'
              hidden
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <label 
              htmlFor='product'
              className='bg-admin-card p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4'
            >
              <p className='text-[14px] font-semibold text-secondary'>Încarcă fișierul</p>
            </label>
            { file && typeof file == 'string' ?
              <Link href={ file } target='_blank'>
                <p className='text-[14px] text-[#00C572] font-semibold'>{product.file.file.fileName}</p>
                <p className='text-[14px] text-[#00C572] font-semibold'></p>
              </Link> :
              <div>
                <p className='text-[14px] text-[#00C572] font-semibold'>{ file && typeof file != 'string' ? file.name : ''}</p>
                <p className='text-[14px] text-[#00C572] font-semibold'>{ file && typeof file != 'string' ? (Math.round(file.size/10000))/100 + ' Mb' : '' }</p>
              </div>
            }
          </div>
          
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} className='mx-12' /> :
            <button 
              type='submit'
              className='bg-primary p-4 px-8 rounded-[10px] cursor-pointer hover:scale-105 transition-all mr-4'
            >
              <p className='text-[14px] font-semibold text-onPrimary'>Salvează modificările</p>
            </button> 
          }
        </div>   
      </form>

    </AdminLayout>
  )
}

export default Edit

export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id as string
  const productSnap = await  getDoc(doc(db, 'products', id))
  const product = { id: productSnap.id, ...productSnap.data(), lastUpdated: null }

  const docsRef = query(collection(db, 'product-categories'))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( doc.data().category ))

  return { props: { categories, product }}
}