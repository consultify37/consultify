import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  image: any
  setImage: React.Dispatch<React.SetStateAction<any>>
}

const ImageComponentBlog = ({ image, setImage }: Props) => {
  return (
    <div>
      { image ?
          <div className='relative flex flex-row justify-between items-end px-2 mt-6 mb-2'>
            { image && image.image ? 
              <Link href={image.image} target='_blank'>
                <p className='text-secondary font-semibold text-[14px] overflow-hidden'>{ image && image.file && image.file.fileName }</p>
              </Link> :
              <p className='text-secondary font-semibold text-[14px] overflow-hidden'>{ image && image.name && image.name }</p>
            }
            <div className='absolute bg-gradient-to-r from-transparent to-admin-background h-5 w-24 right-[54px] top-0'></div>
            <p 
              className='underline underline-offset-1 font-semibold cursor-pointer text-red-500'
              onClick={() => setImage(null)}
            >
              șterge
            </p>
          </div> :
          <div className='h-[32px]'></div> //64px
        }

        <input 
          type='file'
          id='main'
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
        <label
          htmlFor='main' 
          className='w-full py-[19px] bg-primary rounded-[10px] flex flex-row items-center justify-center hover:scale-105 transition-all cursor-pointer'
        >
          <Image 
            src='/images/admin/picture.svg'
            width={15}
            height={15}
            alt='picture'
            className='w-4 h-4 mr-2'
          />
          <p className='text-[14px] font-semibold text-onPrimary'>{ image ? 'Schimbă imagine principală' : 'Adaugă imagine principală' }</p>
        </label>
    </div>
  )
}

export default ImageComponentBlog