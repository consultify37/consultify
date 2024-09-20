import React from 'react'

type Props = {
  text: string
  className: string
}

const FormatText2 = ({ text, className }: Props) => {
  return (
    <>
      {
        text.split('\n').map((item, index) => (
            <p className={className} key={index}>{item}</p>
        )) 
      }
    </>
  )
}

export default FormatText2