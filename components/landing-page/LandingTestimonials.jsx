import React from 'react'
import Carousel from 'react-elastic-carousel'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    profilePic: '/landing-page/images/andrei mihaiescu.png',
    name: 'Andrei Mihaiescu',
    image: '/landing-page/images/Group 726.png',
    text: 'La început, nu eram sigur dacă un astfel de pachet mi-ar fi de folos, dar am zis să încerc. A fost cea mai bună decizie! Flashcard-urile sunt simple și clare, iar la ședința de consultanță am primit răspunsuri concrete la toate întrebările mele'
  },
  {
    profilePic: '/landing-page/images/ramona-trandafir.png',
    name: 'Ramona Trandafir',
    image: '/landing-page/images/Group 726.png',
    text: 'Am cumpărat pachetul pentru că voiam să aflu mai multe despre cum pot să îmi deschid o afacere cu ajutorul fondurilor europene. Flashcard-urile sunt foarte bine explicate, iar sesiunea de consultanță gratuită m-a ajutat să înțeleg exact ce trebuie să fac pentru a obține finanțare.'
  },
  {
    profilePic: '/landing-page/images/andrei mihaiescu.png',
    name: 'Andrei Mihaiescu',
    image: '/landing-page/images/Group 726.png',
    text: 'La început, nu eram sigur dacă un astfel de pachet mi-ar fi de folos, dar am zis să încerc. A fost cea mai bună decizie! Flashcard-urile sunt simple și clare, iar la ședința de consultanță am primit răspunsuri concrete la toate întrebările mele'
  }
]

const testimonials2 = [
  {
    profilePic: '/landing-page/images/ramona-trandafir.png',
    name: 'Ramona Trandafir',
    image: '/landing-page/images/Group 726.png',
    text: 'Am cumpărat pachetul pentru că voiam să aflu mai multe despre cum pot să îmi deschid o afacere cu ajutorul fondurilor europene. Flashcard-urile sunt foarte bine explicate, iar sesiunea de consultanță gratuită m-a ajutat să înțeleg exact ce trebuie să fac pentru a obține finanțare.'
  },
  {
    profilePic: '/landing-page/images/andrei mihaiescu.png',
    name: 'Andrei Mihaiescu',
    image: '/landing-page/images/Group 726.png',
    text: 'La început, nu eram sigur dacă un astfel de pachet mi-ar fi de folos, dar am zis să încerc. A fost cea mai bună decizie! Flashcard-urile sunt simple și clare, iar la ședința de consultanță am primit răspunsuri concrete la toate întrebările mele'
  },
  {
    profilePic: '/landing-page/images/ramona-trandafir.png',
    name: 'Ramona Trandafir',
    image: '/landing-page/images/Group 726.png',
    text: 'Am cumpărat pachetul pentru că voiam să aflu mai multe despre cum pot să îmi deschid o afacere cu ajutorul fondurilor europene. Flashcard-urile sunt foarte bine explicate, iar sesiunea de consultanță gratuită m-a ajutat să înțeleg exact ce trebuie să fac pentru a obține finanțare.'
  }
]

const LandingTestimonials = () => {
  return (
    <div className='flex flex-col mt-8 carousel-landing'>
      <Carousel 
        showArrows={false}
        className='flex h-full items-stretch'
      >
        { testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Carousel>

      <Carousel 
        showArrows={false}
        className='flex h-full items-stretch mt-8'
      >
        { testimonials2.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Carousel>
    </div>
  )
}

export default LandingTestimonials