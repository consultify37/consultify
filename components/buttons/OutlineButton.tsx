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
      className='px-12 py-3 lg:py-4 w-full border-2 border-primary max-w-[700px] flex items-center justify-center rounded-full hover:scale-105 transition-all'
    >
      <p className='text-secondary font-semibold text-[14px] text-center'>{ title }</p>
    </div>
  )
}

const OutlineButton = ({ title, href, onClick }: Props) => {
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

export default OutlineButton