import React from 'react'

type Props = {
  text: string
}

const Bolder = ({ text }: Props) => {
  return (
    <p className='text-sm'>
      { text.split('<b>').map((item, index) => (
        <span key={index}>
          { index%2 == 0 ?
            <span className=''>
              { item }
            </span> :
            <span className='font-bold'>
              { item }
            </span>
          }
        </span>
      ))}
    </p>
  )
}

export default Bolder