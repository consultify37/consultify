import React from 'react'

type Props = {
  text: string
}

const FormatTextBold = ({ text }: Props) => {
  return (
    <span>
      {
        text.split('*').map((item1, index) => (
          <span key={item1+index}>
              { index == 1 ? 
                <span className="font-bold">
                  {
                    item1.split('/').map((item2, index) => (
                      <span key={item2+index}>
                          {index == 1 ? <span className="italic">{item2}</span> : <span>{item2}</span>}
                      </span>
                    ))
                  }
                </span> : 
                <span>
                  {
                    item1.split('/').map((item2, index) => (
                      <span key={item2+index}>
                          {index == 1 ? <span className="italic">{item2}</span> : <span>{item2}</span>}
                      </span>
                    ))
                  }
                </span>}
          </span>
      ))
      }
    </span>
  )
}

export default FormatTextBold