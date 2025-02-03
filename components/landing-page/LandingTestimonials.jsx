import React from 'react'
import Carousel from 'react-elastic-carousel'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    profilePic: '/landing-page/images/testimoniale/Răzvan Boghian.png',
    name: 'Răzvan Boghian',
    image: '/landing-page/images/Group 726.png',
    text: 'La început, nu eram sigur dacă un astfel de pachet mi-ar fi de folos, dar am zis să încerc. A fost cea mai bună decizie! Flashcard-urile sunt simple și clare, iar la ședința de consultanță am primit răspunsuri concrete la toate întrebările mele'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Alina Fotache.png',
    name: 'Alina Fotache',
    image: '/landing-page/images/Group 726.png',
    text: 'Am cumpărat pachetul pentru că voiam să aflu mai multe despre cum pot să îmi deschid o afacere cu ajutorul fondurilor europene. Flashcard-urile sunt foarte bine explicate, iar sesiunea de consultanță gratuită m-a ajutat să înțeleg exact ce trebuie să fac pentru a obține finanțare.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Doina Haruță.png',
    name: 'Doina Hăruță',
    image: '/landing-page/images/Group 726.png',
    text: 'Am cumpărat pachetul pentru că voiam să înțeleg mai bine procesul de aplicare la Start-Up Nation. Explicațiile sunt clare și la obiect, iar exercițiile practice m-au ajutat să îmi dau seama ce trebuie să fac concret. Sesiunea de consultanță inclusă a fost un mare plus!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Roxana Bradu.png',
    name: 'Roxana Bradu',
    image: '/landing-page/images/Group 726.png',
    text: 'Dacă ai în plan să accesezi fonduri nerambursabile, acest pachet este aur curat! Flashcard-urile sunt bine structurate și ușor de parcurs, iar exemplele practice m-au ajutat să aplic teoria pe ideea mea de afacere. Recomand 100%!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Ștefan Cristoi.png',
    name: 'Ștefan Cristoi',
    image: '/landing-page/images/Group 726.png',
    text: 'Nu știam de unde să încep cu documentația pentru fonduri, dar aceste flashcard-uri m-au ghidat pas cu pas. Îmi place că sunt concepute într-un mod interactiv și nu trebuie să citesc sute de pagini pentru a înțelege esențialul. Un must-have dacă vrei să accesezi fonduri!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Cristian Munteanu.png',
    name: 'Cristian Munteanu',
    image: '/landing-page/images/Group 726.png',
    text: 'Nu știam de unde să încep cu documentația pentru fonduri, dar aceste flashcard-uri m-au ghidat pas cu pas. Îmi place că sunt concepute într-un mod interactiv și nu trebuie să citesc sute de pagini pentru a înțelege esențialul. Un must-have dacă vrei să accesezi fonduri!'
  }
]

const testimonials2 = [
  {
    profilePic: '/landing-page/images/testimoniale/Matei Emanuel - poza profil.png',
    name: 'Matei Emanuel',
    video: '/landing-page/images/testimoniale/matei emanuel - clip recenzie.mp4',
    poster: '/landing-page/images/testimoniale/Matei Emanuel Poster.png',
    text: 'Am cumpărat flashcard-urile pentru că voiam informații clare despre accesarea fondurilor nerambursabile. Materialele sunt structurate foarte bine și explică totul simplu și logic. După ce le-am parcurs, am decis să merg mai departe cu echipa Consultify, iar acum am finalizat cu succes implementarea proiectului Start-Up Nation 2022.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/natalia batranu - poza profil.png',
    name: 'Natalia Bătrânu',
    poster: '/landing-page/images/testimoniale/Natalia Batranu Poster.png',
    video: '/landing-page/images/testimoniale/Natalia Batranu - clip .mp4',
    text: 'Am cumpărat flashcard-urile pentru că îmi doream o metodă clară și organizată de a înțelege procesul de accesare a fondurilor nerambursabile. Explicațiile sunt concise, structurate perfect și m-au ajutat să îmi clarific pașii necesari. După ce le-am parcurs, am decis să colaborez cu echipa Consultify, iar acum am finalizat cu succes implementarea proiectului meu. Tot procesul a fost mult mai simplu cu sprijinul lor!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Negru Andreea - poza de profil.png',
    name: 'Negru Andreea',
    poster: '/landing-page/images/testimoniale/Negru Andreea Poster.png',
    video: '/landing-page/images/testimoniale/negru andreea - clip .mp4',
    text: 'Am cumpărat flashcard-urile pentru că aveam nevoie de o metodă clară și structurat explicată pentru accesarea fondurilor nerambursabile. Informațiile sunt foarte bine organizate și m-au ajutat să înțeleg exact ce trebuie să fac. După ce le-am parcurs, am decis să merg mai departe și să colaborez cu echipa Consultify. Acum, am finalizat cu succes implementarea proiectului meu și mă bucur că am făcut această alegere!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Nastase Alin - Poza.png',
    name: 'Năstase Alin',
    poster: '/landing-page/images/testimoniale/Nastase Alin Poster.png',
    video: '/landing-page/images/testimoniale/Nastase Alin - clip .mp4',
    text: 'Când am cumpărat flashcard-urile, căutam o soluție simplă și eficientă pentru a înțelege procesul de accesare a fondurilor nerambursabile. Mi-a plăcut că informațiile sunt structurate clar, fără termeni complicați sau explicații inutile. A fost exact ce aveam nevoie pentru a lua o decizie informată. După ce le-am parcurs, am decis să colaborez cu echipa Consultify pentru finanțare, iar acum, proiectul meu este implementat cu succes. Recomand tuturor celor care vor să înceapă corect acest proces!'
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