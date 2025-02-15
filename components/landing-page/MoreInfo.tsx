import React from 'react'

const infos = [
  "✅ Criterii de eligibilitate explicate pe înțelesul tuturor",
  "✅ Pașii clari pentru a aplica fără stres",
  "✅ Cum să-ți structurezi un plan de afaceri pentru a obține finanțarea",
  "✅ Cum să gestionezi bugetul proiectului"
]

const MoreInfo = () => {
  return (
    <div className='my-8'>
      <h2 className='font-bold text-[21px] text-center mb-4'>Ce vei învăța din agenda:</h2>
      { infos.map((info) => (
        <p className='font-semibold text-[17px] mt-2' key={info}>{info}</p>
      ))}
    </div>
  )
}

export default MoreInfo