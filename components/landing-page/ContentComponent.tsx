import React from 'react'
import Bolder from './Bolder'
import Image from 'next/image'

type Props = {
  title: string,
  image: string,
  text1: string,
  text2?: string
  text3?: string
}

const ContentComponent = ({ text1, text2, text3 , image, title}: Props) => {
  return (
    <div className='flex flex-col gap-y-4 mt-8'>
      <h2 className='font-bold text-[21px]'>{title}</h2>
      <Bolder text={text1} />
      <Image 
        src={image}
        width={1024}
        height={1024}
        alt={title}
        className='w-full h-auto rounded-lg'
      />
      { text2 && <Bolder text={text2} />}
      { text3 && <Bolder text={text3} />}
    </div>
  )
}

export default ContentComponent