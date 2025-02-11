import Image from 'next/image'
import React from 'react'

type Props = {
  testimonial: {
    profilePic: string
    name: string
    image?: string
    video?: string
    text: string
    poster?: string
  }
}

const TestimonialCard = ({ testimonial }: Props) => {
  return (
    <div className='bg-white rounded-lg p-4 w-full mx-6 text-[13px] flex flex-col h-full'>
      <div className='flex flex-row items-center gap-x-2'>
        <Image 
          src={testimonial.profilePic}
          width={128}
          height={128}
          alt={testimonial.name}
          className='w-[52px] h-[52px] rounded-full object-cover bg-[#f0f1f3]'
        />
        <div className=''>
          <p className='text-yellow-500'>★★★★★</p>
          <p className='text-[#8A8A8A]'>{testimonial.name}</p>
        </div>
      </div>

      { testimonial.text ?
        <p className='mt-2 mb-2'>{testimonial.text}</p> :
        <div className='h-8'></div>
      }
      { testimonial.image ?
        <Image 
          src={testimonial.image}
          width={512}
          height={512}
          alt={testimonial.name}
          className='rounded-lg mt-auto aspect-[11/16] object-cover bg-[#f0f1f3]'
        /> :
        <video width="100%" controls poster={testimonial.poster} className='rounded-lg mt-auto bg-[#f0f1f3]'>
          <source src={testimonial.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      }
    </div>
  )
}

export default TestimonialCard