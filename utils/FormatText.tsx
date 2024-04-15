import React from 'react'

type Props = {
  text: string
  className: string
}

const FormatText = ({ text, className }: Props) => {
  return (
    <>
      {
        text.split('\n').map((item, index) => (
          <div key={index} className='self-start'>
            <p className={className} key={index}>{item}</p>
            { index != text.split('\n').length && item != "" && <br />}
          </div>
        )) 
      }
    </>
  )
}

export default FormatText