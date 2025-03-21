import React, { useState } from 'react'
import AdminLayout from '../../../../../components/admin-nav/AdminLayout'
import Dropdown from '../../../../../components/admin/editProgram/Dropdown'
import BulletPointsContainer from '../../../../../components/admin/editProgram/BulletPointsContainer'
import FormInput from '../../../../../components/admin/editProgram/FormInput'
import ImageFormComponent from '../../../../../components/admin/editProgram/ImageFormComponent'
import FormTextArea from '../../../../../components/admin/editProgram/FormTextArea'
import Conditions from '../../../../../components/admin/editProgram/Conditions'
import AdminFaq from '../../../../../components/admin/editProgram/AdminFaq'
import { Condition, Faq, Program } from '../../../../../types'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import { uploadFile } from '../../../../../utils/b2_storage/upload_file'
import { useRouter } from 'next/navigation'
import ReactLoading from 'react-loading'
import { NextPageContext } from 'next'
import { deleteFile } from '../../../../../utils/b2_storage/delete_file'
import toast from 'react-hot-toast'

type Props ={
  categories: string[]
  program: Program
}

const EditProgram = ({ categories, program }: Props) => {
  const router = useRouter()
  const [bulletPoints, setBulletPoints] = useState< string[] >(program.bulletPoints ? program.bulletPoints : [])
  const [categorie, setCategorie] = useState< string | null >(program.categorie ? program.categorie : null)
  const [keywords, setKeywords] = useState(program.keywords ? program.keywords : '')
  const [status, setStatus] = useState< string | null >(program.status ? program.status : null)
  const [title, setTitle] = useState(program.title ? program.title : '')
  const [text1, setText1] = useState(program.text1 ? program.text1 : '')
  const [text2, setText2] = useState(program.text2 ? program.text2 : '')
  const [suma, setSuma] = useState(program.suma ? program.suma : '')
  const [descriere, setDescriere] = useState(program.descriere ? program.descriere :'')
  const [title2, setTitle2] = useState(program.title2 ? program.title2 : '')
  const [suma2, setSuma2] = useState(program.suma2 ? program.suma2 :'')
  const [title3, setTitle3] = useState(program.title3 ? program.title3 :'')
  const [descriere3, setDescriere3] = useState(program.descriere3 ? program.descriere3 :'')
  const [imaginePrincipala, setImaginePrincipala] = useState< File | string | null >(program.imaginePrincipala && program.imaginePrincipala.file && program.imaginePrincipala.file.fileName ? `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${program.imaginePrincipala.file.fileName}` : null)
  const [backgroundImage, setBackgroundImage]= useState< File | string | null >(program.backgroundImage && program.backgroundImage.file && program.backgroundImage.file.fileName ? `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${program.backgroundImage.file.fileName}` : null)
  const [conditions, setConditions] = useState< Condition[] >(program.conditions ? program.conditions : [])
  const [faqs, setFaqs] = useState< Faq[] >(program.faqs ? program.faqs : [])
  const [isLoading, setIsLoading] = useState(false)

  const statuses = ['NULL', 'PUBLICAT ÎN MONITORUL OFICIAL', 'LANSAT ÎN CONSULTARE PUBLICĂ', 'APEL DESCHIS', 'APEL ÎNCHIS']

  const oldImaginePrincipala = program.imaginePrincipala && program.imaginePrincipala.file ? program.imaginePrincipala : null
  const oldBackgroundImage = program.backgroundImage && program.backgroundImage.file ? program.backgroundImage : null

  const handleUpload = async (e: any) => {
    setIsLoading(true)
    e.preventDefault()

    if ( imaginePrincipala == null ) {
      'Alege o imagine principală. Apoi încearcă din nou.'
    }

    if ( backgroundImage == null ) {
      'Alege o imagine de fundal. Apoi încearcă din nou.'
    }

    try {
      var newImaginePrincipala
      var newBackgroundImage

      if ( typeof imaginePrincipala != 'string' && imaginePrincipala != oldImaginePrincipala )  {
        try {
          newImaginePrincipala = await uploadFile(imaginePrincipala!)
          oldImaginePrincipala?.file && await deleteFile(oldImaginePrincipala?.file)
        } catch (e) {
          throw e
        }
      } else {
        newImaginePrincipala = oldImaginePrincipala?.file
      }

      if ( typeof backgroundImage != 'string' && backgroundImage != oldBackgroundImage )  {
        try {
          newBackgroundImage = await uploadFile(backgroundImage!)
          oldBackgroundImage?.file && await deleteFile(oldBackgroundImage?.file)
        } catch (e) {
          throw e
        }
      } else {
        newBackgroundImage = oldBackgroundImage?.file
      }

      const newData = {
        site: process.env.SITE,
        bulletPoints,
        keywords,
        categorie,
        status: status != 'NULL' ? status : null,
        title,
        text1,
        text2,
        suma, 
        descriere,
        title2,
        title3,
        suma2,
        descriere3,
        conditions,
        faqs,
        imaginePrincipala: { file: newImaginePrincipala, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${newImaginePrincipala.fileName}` },
        backgroundImage: { file: newBackgroundImage, image: `https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/${newBackgroundImage.fileName}` }
      }
      
      await updateDoc(doc(db, 'programe-fonduri', program.id), newData)

      router.push('/admin/programe-fonduri')
    } catch (e) {
      toast.error('Ceva nu a mers bine, încearcă din nou!')
    }

    setIsLoading(false)
  }

  const leavePage = () => {
    if (confirm('Ești sigur că vrei să părăsești pagina? Toate modificările vor fi pierdute.')) {
      router.push('/admin/programe-fonduri')
    }
  }

  return (
    <AdminLayout>
      <div className='flex flex-row justify-between w-full max-w-[1000px] items-center'>
        <h1 className='text-[28px] text-secondary font-bold '>Editează program</h1>

        <button onClick={leavePage} >
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
      
      <form onSubmit={handleUpload}>
        <div className='flex flex-row mt-8 mb-16'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-8 xl:mr-16'>
          <Dropdown 
              placeholder='Selectează categoria'
              values={categories}
              selectedValue={categorie}
              setSelectedValue={setCategorie}
            />
            <div className='mt-8'></div>
            <Dropdown 
              placeholder='Selectează status'
              values={statuses}
              selectedValue={status}
              setSelectedValue={setStatus}
              id='toggle_dropdown0'
            />
            <div className='mt-8'></div>
            <BulletPointsContainer 
              bulletPoints={bulletPoints}
              setBulletPoints={setBulletPoints}
            />
          </div>

          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'>
            <FormInput 
              value={title}
              setValue={setTitle}
              placeholder='Titlu'
              required={true}
            />

            <FormInput
              value={text1}
              setValue={setText1}
              placeholder='Text 1'
              styleProps='mt-8'
              required={true}
            />

            <FormInput
              value={text2}
              setValue={setText2}
              placeholder='Text 2'
              styleProps='mt-8'
              required={true}
            />

            <FormInput
              value={suma}
              setValue={setSuma}
              placeholder='Suma de finanțare'
              styleProps='mt-8'
              required={true}
            />

            <FormInput
              value={keywords}
              setValue={setKeywords}
              placeholder='Cuvinete cheie'
              styleProps='mt-8'
              // required={true}
            />
          </div>
        </div>

        <h1 className='text-[28px] text-secondary font-bold '>Adaugă imaginea de fundal ( 1066 x 362 )</h1>
        
        <ImageFormComponent
          image={backgroundImage}
          setImage={setBackgroundImage}
          id={'fileinput1'}
        />


        <div className='flex flex-row mt-8'>
          <div className='flex flex-col w-[calc(50%-32px)] min-w-[220px] max-w-[480px] mr-16'>
            <FormInput 
              placeholder='Titlu'
              value={title2}
              setValue={setTitle2}
              required={true}
            />
            <FormInput 
              placeholder='Suma de finanțare'
              value={suma2}
              setValue={setSuma2}
              styleProps='mt-8'
              required={true}
            />
          </div>

          <FormTextArea
            value={descriere}
            setValue={setDescriere}
            placeholder='Descriere'
            styleProps='w-[calc(50%-32px)] min-w-[220px] max-w-[480px] h-48 resize-none'
            required={true}
          />
        </div>

        <h1 className='text-[28px] text-secondary font-bold mt-8'>Adaugă imaginea principală ( 1065 x 283 )</h1>
        
        <ImageFormComponent 
          image={imaginePrincipala}
          setImage={setImaginePrincipala}
          id={'fileinput2'}
        />

        <h1 className='text-[28px] text-secondary font-bold mt-8'>Cui i se adresează?</h1>
        <div className='mt-8 flex flex-row'>
          <FormInput 
            placeholder='Titlu'
            value={title3}
            setValue={setTitle3}
            styleProps='mr-16 h-fit w-[calc(50%-32px)] min-w-[220px] max-w-[480px]'
            required={true}
          />
          <FormTextArea
            value={descriere3}
            setValue={setDescriere3}
            placeholder='Descriere'
            styleProps='w-[calc(50%-32px)] min-w-[220px] max-w-[480px] h-48 resize-none'
            required={true}
          />
        </div>

        <h1 className='text-[28px] text-secondary font-bold mt-8'>Condițiile de aplicare</h1>
        <Conditions 
          conditions={conditions}
          setConditions={setConditions}
        />

        <h1 className='text-[28px] text-secondary font-bold mt-12'>Întrebări frecvente</h1>
        <AdminFaq 
          faqs={faqs}
          setFaqs={setFaqs}
        />

        <div className='w-full flex justify-center items-center'>
          { isLoading ?
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} /> :
            <button 
              type='submit'
              className="bg-primary cursor-pointer font-semibold flex items-center justify-center w-[80%] py-3 text-white rounded-lg hover:scale-[1.05] transition-all mt-8"
            >
            Salvează
          </button>
          }
        </div>
      </form>
    </AdminLayout>
  )
}

export default EditProgram

export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id as string
  const programSnap = await  getDoc(doc(db, 'programe-fonduri', id))
  const program = { id: programSnap.id, ...programSnap.data() }

  const docsRef = query(collection(db, 'categories'), where('site', '==', process.env.SITE))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( doc.data().category ))

  return { props: { categories, program }}
}