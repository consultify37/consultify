import React, { useEffect, useRef, useState } from 'react'

type Props = {
  values: string[]
  selectedValue: string | null
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>
}

const Dropdown = ({ values, selectedValue, setSelectedValue }: Props) => {
  const [toggle, setToggle] = useState(false)

  return (
    <div className='w-full min-w-[220px] max-w-[480px] mb-8'>
      <input aria-hidden="true" type="checkbox" name="toggle_dropdown" id="toggle_dropdown" className="hidden peer z-[11]" checked={toggle} onChange={() => setToggle(toggle => !toggle)}></input>
      <div className='relative'>
        <label role="button" htmlFor="toggle_dropdown" aria-label="dropdown" id="dropdown">
          <div className='flex flex-row w-full items-center justify-between bg-secondary border-secondary border-2 rounded-xl p-4 px-6 shadow-md z-[11]'> 
            <p className='text-white font-semibold'>{ selectedValue ? selectedValue : 'Selectează categoria' }</p>
            <svg width="14" height="6" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg" 
              aria-hidden='true' id='chevron-down'
              className='transition duration-300'
            >
              <path d="M10.7715 0.206184C10.6985 0.140851 10.6116 0.0889952 10.5159 0.0536073C10.4201 0.0182193 10.3175 0 10.2138 0C10.11 0 10.0074 0.0182193 9.91162 0.0536073C9.81588 0.0889952 9.72899 0.140851 9.65596 0.206184L6.05779 3.39864C5.98476 3.46397 5.89787 3.51583 5.80213 3.55122C5.7064 3.58661 5.60371 3.60482 5.5 3.60482C5.39629 3.60482 5.2936 3.58661 5.19787 3.55122C5.10213 3.51583 5.01524 3.46397 4.94221 3.39864L1.34404 0.206184C1.27101 0.140851 1.18412 0.0889952 1.08838 0.0536073C0.992646 0.0182193 0.88996 0 0.786248 0C0.682536 0 0.57985 0.0182193 0.484115 0.0536073C0.388379 0.0889952 0.301488 0.140851 0.228454 0.206184C0.0821305 0.336784 0 0.513451 0 0.697599C0 0.881748 0.0821305 1.05841 0.228454 1.18901L3.83447 4.38844C4.27639 4.78004 4.87543 5 5.5 5C6.12457 5 6.72361 4.78004 7.16553 4.38844L10.7715 1.18901C10.9179 1.05841 11 0.881748 11 0.697599C11 0.513451 10.9179 0.336784 10.7715 0.206184Z" fill="#fff"/>
            </svg>
          </div>
        </label>

        <div 
          className='absolute top-11 pt-2 flex-col z-10 w-full bg-secondary rounded-b-xl shadow-md pb-1'
          id='dropdown-container'
          style={{visibility: toggle ? 'visible' : 'hidden'}}
        >
          {
            values.map((value, index) => (
              <div key={value+index} className='px-1'>
                <div
                  className='w-full rounded-xl bg-secondary hover:bg-primary px-5 py-3 cursor-pointer group'
                  onClick={() => {
                    setToggle(false)
                    setSelectedValue(value)
                  }}
                >
                  <p className='text-onSecondary group-hover:text-onPrimary font-semibold'>{value}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dropdown