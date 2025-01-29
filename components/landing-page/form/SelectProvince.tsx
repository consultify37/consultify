import React from 'react'
import { provinces } from '../../../utils/provinces'

const SelectProvince = () => {
  return (
    <div className='w-full'>
      <div className="mt-4">
        <span className="label-text">Județ*</span>
      </div>
      <select required name='Province' className="select select-bordered w-full mt-1" defaultValue='default'>
        <option disabled value={'default'}>Selectează Județ</option>
        { provinces.map((province) => (
          <option value={province.code} key={province.code}>{ province.province }</option>
        ))}
      </select>
    </div>
  )
}

export default SelectProvince