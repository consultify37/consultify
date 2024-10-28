import React from 'react'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import toast from 'react-hot-toast'
import { deleteFile } from '../../../utils/b2_storage/delete_file'
import ArticleRow from './ArticleRow'

type Article = any

type Props = {
  articles: Article[]
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>
}

const ArticlesTable = ({ articles, setArticles }: Props) => {
  const articles1 = [
    {
      id: '1',
      title: 'Cum a afectat pandemia piața digitală?',
      category: 'Bussiness',
      keywords: ['keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword'],
      createdAt: '12/02/2022'
    },
    {
      id: '2',
      title: 'Cum a afectat pandemia piața digitală?',
      category: 'Bussiness',
      keywords: ['keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword'],
      createdAt: '12/02/2022'
    },
    {
      id: '3',
      title: 'Cum a afectat pandemia piața digitală?',
      category: 'Bussiness',
      keywords: ['keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword'],
      createdAt: '12/02/2022'
    },
  ]

  const handleDelete = async (article: Article) => {
    if ( confirm('Ești sigur că vrei să ștergi articolul? Acțiunea este definitivă.' )) {
      const docRef = doc(db, 'articles', article.id!)

      try {
        await deleteDoc(docRef)

        setArticles(articles.filter((item) => item.id != article.id ))

        article.file && await deleteFile({ fileId: article.file.file.fileId, fileName: article.file.file.fileName })
        article.image && await deleteFile({ fileId: article.image.file.fileId, fileName: article.image.file.fileName })
      } catch (e: any) {
        console.log(e)

        if ( e.code || e.message ) {
          e.message ? toast.error(e.message) : toast.error('Ceva nu a mers bine, încearcă din nou.')
          const collectionRef = collection(db, 'articles')

          await addDoc(collectionRef, { 
            code: e.code ? e.code : null , 
            message: e.message ? e.message : null, 
            severity: 'error', 
            createdAt: '12/02/2022' 
          })
        }
      }
    }
    
  }

  return (
    <div>
      <table className='w-full mt-3 text-left border-separate border-spacing-y-5 table-fixed'>
        <thead className='bg-admin-header'>
          <tr>
            <th className='pl-8 py-4 rounded-s-lg'>Titlu Articol</th>
            <th className='py-4 pl-8'>Categorie</th>
            <th className='py-4'>Keywords</th>
            <th className='py-4 pl-10'>Data</th>
            <th className='py-4 rounded-e-lg'></th>
          </tr> 
        </thead>
        <tbody className=''>
          { articles.map((article) => (
            <ArticleRow
              key={article.id}
              handleDelete={handleDelete}
              article={article as Article}
            />
          )) }
        </tbody>
      </table>
    </div>
  )
}

export default ArticlesTable