import React from 'react'
import Carousel from 'react-elastic-carousel'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    profilePic: '/landing-page/images/testimoniale/Răzvan Boghian - profil.png',
    name: 'Răzvan Boghian',
    image: '/landing-page/images/testimoniale/Razvan Boghian poza recenzie.jpg',
    text: 'Am cumpărat flashcard-urile pentru că aveam nevoie de ceva clar și organizat despre accesarea fondurilor. Sincer, mi-au depășit așteptările. Explicațiile sunt la obiect, fără bălării, și m-au făcut să înțeleg mai ușor pașii. Plus că sesiunea de consultanță mi-a fost super utilă, am primit răspunsuri clare la toate întrebările mele. Recomand dacă vrei să economisești timp și să înțelegi exact ce ai de făcut.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Alina Fotache - profil.png',
    name: 'Alina Fotache',
    image: '/landing-page/images/testimoniale/Alina Fotache poza recenzie.jpg',
    text: 'Mi-am luat două exemplare, unul pentru mine și unul pentru un prieten care voia să aplice și el. Chiar sunt făcute bine, informațiile sunt structurate logic și ușor de parcurs. În plus, mi-a plăcut că nu sunt doar teorie, ci efectiv explicații aplicate pe ce trebuie să faci. Ședința de consultanță a fost un mare plus, pentru că aveam câteva nelămuriri și mi-au fost clarificate rapid.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Doina Haruță - profil.png',
    name: 'Doina Hăruță',
    image: '/landing-page/images/testimoniale/Doina Haruta poza recenzie.JPG',
    text: 'Am fost un pic sceptică la început, dar m-au ajutat mai mult decât mă așteptam. Nu sunt genul care să înțeleagă rapid lucrurile birocratice, dar explicațiile sunt foarte clare și ușor de urmărit. Mi-a fost mult mai simplu să îmi dau seama ce am de făcut, iar ședința de consultanță a fost exact ce trebuia ca să îmi răspundă la întrebările pe care le aveam. Chiar a meritat! '
  },
  {
    profilePic: '/landing-page/images/testimoniale/Roxana Bradu - profil.png',
    name: 'Roxana Bradu',
    image: '/landing-page/images/testimoniale/Roxana Bradu - poza recenzie.jpg',
    text: 'Dacă ai în plan să accesezi fonduri nerambursabile, acest pachet este aur curat! Flashcard-urile sunt bine structurate și ușor de parcurs, iar exemplele practice m-au ajutat să aplic teoria pe ideea mea de afacere. Recomand 100%!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Ștefan Cristoi - profil.png',
    name: 'Ștefan Cristoi',
    image: '/landing-page/images/testimoniale/Stefan Cristoi - recenzie.JPG',
    text: 'Eu și fratele meu ne-am hotărât să începem o afacere împreună, așa că am luat două exemplare de flashcard-uri, să fim siguri că înțelegem bine tot procesul. Mi-a plăcut mult faptul că sunt bine structurate, fără informații complicate sau inutile. Ne-am dat seama rapid ce trebuie să facem, iar după consultanță am fost și mai siguri că merită să aplicăm pentru finanțare.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Cristian Munteanu.png',
    name: 'Cristian Munteanu',
    image: '/landing-page/images/testimoniale/Cristian Munteanu - poza recenzie.jpg',
    text: 'Dacă ești ca mine și nu ai chef să sapi prin 100 de pagini de legislație ca să înțelegi cum funcționează fondurile europene, flashcard-urile astea sunt aur. Le parcurgi rapid, îți faci o idee clară și nu pierzi timp cu detalii inutile. Eu le-am luat și am reușit să îmi clarific exact ce trebuie să fac ca să aplic. Mi-a prins bine și sesiunea de consultanță, pentru că aveam câteva întrebări mai specifice. '
  }
]

const testimonials2 = [
  {
    profilePic: '/landing-page/images/testimoniale/Matei Emanuel - poza profil.png',
    name: 'Matei Emanuel',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/matei+emanuel+-+clip+recenzie.mp4',
    poster: '/landing-page/images/testimoniale/Matei Emanuel Poster.png',
    // text: 'Am cumpărat flashcard-urile pentru că voiam informații clare despre accesarea fondurilor nerambursabile. Materialele sunt structurate foarte bine și explică totul simplu și logic. După ce le-am parcurs, am decis să merg mai departe cu echipa Consultify, iar acum am finalizat cu succes implementarea proiectului Start-Up Nation 2022.'
  },
  {
    profilePic: '/landing-page/images/testimoniale/natalia batranu - poza profil.png',
    name: 'Natalia Bătrânu',
    poster: '/landing-page/images/testimoniale/Natalia Batranu Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Natalia+Batranu+-+clip+.mp4',
    // text: 'Am cumpărat flashcard-urile pentru că îmi doream o metodă clară și organizată de a înțelege procesul de accesare a fondurilor nerambursabile. Explicațiile sunt concise, structurate perfect și m-au ajutat să îmi clarific pașii necesari. După ce le-am parcurs, am decis să colaborez cu echipa Consultify, iar acum am finalizat cu succes implementarea proiectului meu. Tot procesul a fost mult mai simplu cu sprijinul lor!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Negru Andreea - poza de profil.png',
    name: 'Negru Andreea',
    poster: '/landing-page/images/testimoniale/Negru Andreea Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/negru+andreea+-+clip+.mp4',
    // text: 'Am cumpărat flashcard-urile pentru că aveam nevoie de o metodă clară și structurat explicată pentru accesarea fondurilor nerambursabile. Informațiile sunt foarte bine organizate și m-au ajutat să înțeleg exact ce trebuie să fac. După ce le-am parcurs, am decis să merg mai departe și să colaborez cu echipa Consultify. Acum, am finalizat cu succes implementarea proiectului meu și mă bucur că am făcut această alegere!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Nastase Alin - Poza.png',
    name: 'Năstase Alin',
    poster: '/landing-page/images/testimoniale/Nastase Alin Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Nastase+Alin+-+clip+.mp4',
    // text: 'Când am cumpărat flashcard-urile, căutam o soluție simplă și eficientă pentru a înțelege procesul de accesare a fondurilor nerambursabile. Mi-a plăcut că informațiile sunt structurate clar, fără termeni complicați sau explicații inutile. A fost exact ce aveam nevoie pentru a lua o decizie informată. După ce le-am parcurs, am decis să colaborez cu echipa Consultify pentru finanțare, iar acum, proiectul meu este implementat cu succes. Recomand tuturor celor care vor să înceapă corect acest proces!'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Dragoș Precup - profil.png',
    name: 'Dragoș Precup',
    poster: '/landing-page/images/testimoniale/Dragoș Precup Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Dragos%CC%A6+Precup+-+clip.mp4'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Lavinia MIliche - profil.png',
    name: 'Lavinia Miliche',
    poster: '/landing-page/images/testimoniale/Lavinia Miliche Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Lavinia+Miliche+-+clip+.mp4'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Ligia Oltean - Profil.png',
    name: 'Ligia Oltean',
    poster: '/landing-page/images/testimoniale/Ligia Oltean Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Ligia+Oltean+-+clip+.mp4'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Marian Ionescu - profil.png',
    name: 'Marian Ionescu',
    poster: '/landing-page/images/testimoniale/Marian Ionescu Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Marian+Ionescu+-+clip+.mp4'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Mario Diculescu - profil.png',
    name: 'Mario Diculescu',
    poster: '/landing-page/images/testimoniale/Mario Diculescu Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Mario+Diculescu+-+clip.mp4'
  },
  {
    profilePic: '/landing-page/images/testimoniale/Radu Dorobant - profil.png',
    name: 'Radu Dorobanț',
    poster: '/landing-page/images/testimoniale/Radu Dorobanț Poster.png',
    video: 'https://f005.backblazeb2.com/file/inspirely-consultify-socialy-creditfy/landing-page/Radu+Dorobant%CC%A6+-+clip.mp4'
  },
]

const LandingTestimonials = () => {
  return (
    <div className='flex flex-col mt-8 carousel-landing'>
      <Carousel 
        showArrows={false}
        className='flex h-full items-stretch'
        enableAutoPlay={true}
        autoPlaySpeed={12000}
      >
        { testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Carousel>

      <Carousel 
        showArrows={false}
        className='flex h-full items-stretch mt-8'
        // enableAutoPlay={true}
        // autoPlaySpeed={15000}
      >
        { testimonials2.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Carousel>
    </div>
  )
}

export default LandingTestimonials