import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Inside = ({title}: {title: string}) => {
  return (
    <div
      className='px-12 py-3 lg:py-4 w-full bg-primary max-w-[700px] border-b-2 border-primary flex items-center justify-center rounded-full hover:scale-105 transition-all'
    >
      <p className='text-onPrimary font-semibold text-[14px] text-center'>{ title }</p>
    </div>
  )
}

const FillButton = ({ title, href, onClick }: Props) => {
  return (
    <>
      { href ? 
        <Link href={href}>
          <Inside title={title} />
        </Link> : 
        <button onClick={onClick}>
          <Inside title={title} />
        </button>
      }
    </>
  )
}

export default FillButton