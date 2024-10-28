import React from 'react'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  styleProps?: string
  required?: boolean
  title: string
  type?: string
}

const FormInput = ({ placeholder, setValue, title, value, required, styleProps, type }: Props) => {
  return (
    <div>
      <h2 className='text-[14px] font-semibold text-secondary mt-6 mb-2 ml-1'>{title}</h2>
      <input 
        className={'text-base p-4 rounded-xl border-2 border-primary outline-none w-full ' + (styleProps ? styleProps : '')}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value) }
        type={type ? type : 'text'}
        required={required ? required : false}
      />
    </div>
  )
}

export default FormInput