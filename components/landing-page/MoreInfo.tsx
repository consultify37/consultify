import React from 'react'

const infos = [
  "✅ Criteriile de eligibilitate",
  "✅ Pașii necesari pentru aplicare",
  "✅ Cum să-ți structurezi un plan de afaceri",
  "✅ Aspecte-cheie despre finanțare"
]

const MoreInfo = () => {
  return (
    <div className='my-8'>
      <h2 className='font-bold text-[21px] text-center mb-4'>Află informații precum</h2>
      { infos.map((info) => (
        <p className='font-semibold text-[17px] mt-2' key={info}>{info}</p>
      ))}
    </div>
  )
}

export default MoreInfo