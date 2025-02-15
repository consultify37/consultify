import React from 'react'

type Props = {
  text: string
}

const Bolder = ({ text }: Props) => {
  return (
    <>
      { text.split('<br>').map((line, index) => (
        <p key={index} className='text-sm'>
          { line.split('<b>').map((item, index) => (
            <span key={index}>
              { index%2 == 0 ?
                <span className=''>
                  { item.split('<i>').map((item1, index) => (
                    <span key={index}>
                      { index%2 == 0 ?
                        item1 :
                        <span className='italic'>
                          { item1 }
                        </span>
                      }
                    </span>
                  )) }
                </span> :
                <span className='font-bold'>
                  { item }
                </span>
              }
            </span>
          ))}
        </p>
      ))}
    </>
  )
}

export default Bolder