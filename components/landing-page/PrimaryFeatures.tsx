import React from 'react'
const features = [
  "💡 Accesează fonduri europene fără FIRME DE CONSULTANȚĂ",
  "📘 Ghid complet pentru redactarea oricărui proiect",
  "⚡ Rezultate rapide și pași simpli de urmat",
  "🎯 Ședință de consultanță GRATUITĂ – pentru întrebări"
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