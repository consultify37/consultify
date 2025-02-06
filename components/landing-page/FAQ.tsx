import React from 'react'
import Bolder from './Bolder'

const questions = [
  { 
    question: '1. Ce conțin flashcard-urile și cum mă pot ajuta?',
    answear: 'Flashcard-urile sunt structurate astfel încât să îți ofere rapid informații esențiale despre accesarea fondurilor nerambursabile. Ai explicații clare despre eligibilitate, etapele procesului, greșeli de evitat și sfaturi practice. Practic, sunt un ghid compact care îți simplifică drumul către finanțare, fără să pierzi timp căutând informații peste tot.'
  },
  { 
    question: '2. Trebuie să am cunoștințe în domeniu ca să le înțeleg?',
    answear: 'Nu, flashcard-urile sunt concepute pentru oricine vrea să acceseze fonduri, indiferent de experiență. Explicațiile sunt simple, fără termeni complicați, astfel încât să înțelegi totul ușor, chiar dacă nu ai mai avut contact cu acest domeniu.'
  },
  { 
    question: '3. După ce le parcurg, ce ar trebui să fac mai departe?',
    answear: 'Odată ce ai parcurs flashcard-urile și ai înțeles pașii esențiali, următorul pas este să aplici ceea ce ai învățat. Poți începe să pregătești documentele de bază și să îți consolidezi planul de afaceri. De asemenea, ai la dispoziție sesiunea de consultanță gratuită, unde poți pune întrebări specifice și primi îndrumări personalizate pentru proiectul tău.'
  },
  { 
    question: '4. Sunt utile și dacă încă nu am o firmă?',
    answear: 'Da, sunt chiar ideale dacă ești la început și vrei să îți clarifici pașii înainte de a lua decizii importante. Îți explică ce tipuri de afaceri pot primi finanțare și cum să îți pregătești terenul pentru a obține fondurile mai ușor.'
  },
  { 
    question: '5. Cât durează să învăț din ele și să înțeleg procesul?',
    answear: 'Depinde de tine! Flashcard-urile sunt concepute să fie ușor de parcurs și să îți ofere informațiile rapid. În câteva ore poți avea o imagine clară despre cum funcționează procesul și ce ai de făcut mai departe.'
  }
]

const FAQ = () => {
  return (
    <div>
      <h2 className='text-[27px] font-bold mt-12 text-center'>Întrebări frecvente</h2>
      <div className='mt-4 space-y-3'>
        { questions.map((question, index) => (
          <div key={index} className="collapse collapse-arrow bg-[#FBF7FF]">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-sm font-bold">{question.question}</div>
            <div className="collapse-content">
              <p className='text-xs text-[#3F3F3F]'>{question.answear}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ