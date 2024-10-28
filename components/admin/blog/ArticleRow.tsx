import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Article } from '../../../types'

type Props = {
  article: Article
  handleDelete: (article: Article) => Promise<void>
}

const ArticleRow = ({ article, handleDelete }: Props) => {
  return (
    <tr className='bg-admin-card'>
      <td className='py-3 font-bold text-secondary pl-8 rounded-s-lg'>{article.title}</td>
      <td className='py-3 font-bold pl-8 text-secondary' >{ article.category }</td>
      <td className='py-3 font-bold text-secondary' >{ article.keywords.join(', ') }</td>
      <td className='py-3 font-bold pl-10 text-secondary' >{ article.formattedCreatedAt }</td>
      <td className='rounded-e-lg'>
        <div className='flex flex-row items-center'>
          <Link
            href={`/admin/blog/edit/${article.id}`}
            className='bg-[#EAEDFF] rounded-lg p-2 px-4 mr-2 hover:scale-105 transition-all'
          >
            <p className='text-[16px] font-semibold text-secondary'>editează</p>
          </Link>
          <button 
            onClick={() => handleDelete(article)}
            className='bg-[#EAEDFF] rounded-md p-2 hover:scale-105 transition-all'
          >
            <Image 
              src='/images/admin/trash.svg'
              width={16}
              height={16}
              alt='thrash'
              className='w-5 h-5'
            />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ArticleRow