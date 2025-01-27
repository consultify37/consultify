import React from 'react'
const features = [
  "💸 Informare despre cum sa atragi fonduri",
  "🕰️ Scurt și la obiect",
  "🎯 Cel mai eficient ghid din România",
  "🌟 Ședință de consultanță GRATUITĂ"
]

const PrimaryFeatures = () => {
  return (
    <div className='space-y-2'>
      { features.map((feature) => (
        <p key={feature} className='font-semibold text-[17px]'>{feature}</p>
      ))}
    </div>
  )
}

export default PrimaryFeatures