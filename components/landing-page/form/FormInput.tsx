import React from 'react'

type Props = {
  type: string
  name: string
  placheholder: string
  svg?: JSX.Element
  className?: string
  label: string
  required?: boolean
}

const FormInput = ({ name, placheholder, svg, type, label, className='', required=true }: Props) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <label className="input input-bordered flex items-center gap-2 w-full">
        { svg && svg }
        <input type={type} required={required} name={name} className="grow" placeholder={placheholder} />
      </label>
    </div>
  )
}

export default FormInput