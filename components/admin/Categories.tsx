import React from 'react'
import { Category } from '../../types'
import ReactLoading from 'react-loading'

type Props = {
  categories: Category[]
  handleDelete: (category: Category) => Promise<void>
  isFetching: boolean
}

const Categories = ({ categories, handleDelete, isFetching }: Props) => {
  return (
    <div className='w-full'>
      {
        isFetching ?
        <div className='flex flex-col justify-center items-center mt-64 w-[242px] xl:w-[484px]'>
          <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
        </div>  :
        <div className='flex flex-col w-full'>
          { categories.map((category, index) => (
            <div 
              key={category.category+index}
              className='relative w-full rounded-xl bg-admin-card p-4 mb-4 border-2 border-admin-card'
            >
              <p className='text-secondary text-base font-semibold'>{category.category}</p>

              <div 
                className='absolute h-full flex items-center top-0 right-4 hover:scale-[1.05] transition-all cursor-pointer'
                onClick={() => handleDelete(category)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#8717F8"/>
                  <rect x="14.8281" y="7.75732" width="2" height="10" rx="1" transform="rotate(45 14.8281 7.75732)" fill="#8717F8"/>
                  <rect x="16.2422" y="14.8284" width="2" height="10" rx="1" transform="rotate(135 16.2422 14.8284)" fill="#8717F8"/>
                </svg>
              </div>
            </div>
          ))} 
        </div>
      }
    </div>
  )
}

export default Categories