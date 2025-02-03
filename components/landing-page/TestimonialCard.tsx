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
          width={256}
          height={256}
          alt={testimonial.name}
          className='w-[52px] h-[52px] rounded-full object-cover'
          unoptimized
        />
        <div className=''>
          <p className='text-yellow-500'>★★★★★</p>
          <p className='text-[#8A8A8A]'>{testimonial.name}</p>
        </div>
      </div>

      <p className='mt-2 mb-2'>{testimonial.text}</p>
      { testimonial.image ?
        <Image 
          src={testimonial.image}
          width={512}
          height={512}
          alt={testimonial.name}
          className='rounded-lg mt-auto'
        /> :
        <video width="100%" controls poster={testimonial.poster} className='rounded-lg mt-auto'>
          <source src={testimonial.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      }
    </div>
  )
}

export default TestimonialCard