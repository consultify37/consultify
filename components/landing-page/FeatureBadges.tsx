import React from 'react'

const features = [
  "🚚 Transport gratuit",
  "📞 Suport 24/7",
  "🎯 Simplu si Util"
]

const FeatureBadges = () => {
  return (
    <div className='mt-6 flex items-center justify-between text-[12px] gap-x-1 font-semibold'>
      { features.map((feature) => (
        <div key={feature} className='bg-admin-card px-2 py-[2px] rounded-md'>
          { feature }
        </div>
      )) }
    </div>
  )
}

export default FeatureBadges