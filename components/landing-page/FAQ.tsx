import React from 'react'

const questions = [
  { 
    question: 'Ce se întâmplă dacă pun o întrebare?',
    answear: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies nibh vel massa iaculis porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium ac orci at convallis. Vivamus a auctor sapien, sed viverra erat. Cras aliquam auctor urna. Pellentesque molestie orci quis leo ornare dapibus. Nulla auctor finibus aliquam. Etiam vitae efficitur orci, id gravida sapien. Nulla facilisis est lorem, tincidunt elementum felis bibendum eu.'
  },
  { 
    question: 'Ce se întâmplă dacă pun o întrebare?',
    answear: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies nibh vel massa iaculis porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium ac orci at convallis. Vivamus a auctor sapien, sed viverra erat. Cras aliquam auctor urna. Pellentesque molestie orci quis leo ornare dapibus. Nulla auctor finibus aliquam. Etiam vitae efficitur orci, id gravida sapien. Nulla facilisis est lorem, tincidunt elementum felis bibendum eu.'
  },
  { 
    question: 'Ce se întâmplă dacă pun o întrebare?',
    answear: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies nibh vel massa iaculis porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium ac orci at convallis. Vivamus a auctor sapien, sed viverra erat. Cras aliquam auctor urna. Pellentesque molestie orci quis leo ornare dapibus. Nulla auctor finibus aliquam. Etiam vitae efficitur orci, id gravida sapien. Nulla facilisis est lorem, tincidunt elementum felis bibendum eu.'
  },
  { 
    question: 'Ce se întâmplă dacă pun o întrebare?',
    answear: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies nibh vel massa iaculis porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium ac orci at convallis. Vivamus a auctor sapien, sed viverra erat. Cras aliquam auctor urna. Pellentesque molestie orci quis leo ornare dapibus. Nulla auctor finibus aliquam. Etiam vitae efficitur orci, id gravida sapien. Nulla facilisis est lorem, tincidunt elementum felis bibendum eu.'
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