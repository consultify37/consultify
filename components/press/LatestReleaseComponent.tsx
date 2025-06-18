import React from 'react'
import { PressRealease } from '../../types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  release: PressRealease
}

const LatestReleaseComponent = ({release}: Props) => {
  return (
    <div className='w-full bg-admin-card p-8 rounded-[36px] shadow-lg flex flex-col items-center gap-3 lg:gap-4 mx-4 lg:mx-8'>
      <div className='flex flex-row gap-2 items-center'>
        { release.smallLogos.map((logo) => (
          <Image 
            src={logo.url}
            width={64}
            height={64}
            alt='.'
            key={logo.fileName}
            className='h-10 w-auto'
          />
        ))}
        
      </div>
      <p className='lg:text-2xl font-semibold text-secondary text-center lg:px-8'>{release.title}</p>
      <p className='text-sm lg:text-lg font-semibold text-primary text-center'>{release.date} <span className='text-2xl'>·</span> {release.category}</p>
      <div className='flex flex-row gap-4'>
        <Link 
          href={`/comunicate-de-presa/${release.id}`}
          className='text-sm lg:text-base p-2 px-8 text-secondary rounded-full font-semibold border-primary border-2 hover:scale-105 transition-all'
        >
          detalii
        </Link>
        <Link 
          href={release.file.url}
          download
          target='_blank'
          className='text-sm lg:text-base p-2 px-8 text-white rounded-full font-semibold bg-primary border-primary border-2 hover:scale-105 transition-all'
        >
          descarcă
        </Link>
      </div>
    </div>
  )
}

export default LatestReleaseComponent