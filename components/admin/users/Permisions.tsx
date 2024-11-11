import React from 'react'

const Permisiuni = [
  // { name: 'Admin', value: 'admin' },
  { name: 'Pagină blog', value: 'pagina-blog'},
  { name: 'Banner homepage', value: 'banner-homepage'},
  { name: 'Users', value: 'users' },
  { name: 'Produse', value: 'produse' },
  { name: 'Consultify', value: 'consultify' },
  { name: 'Socialy', value: 'socialy' },
  { name: 'Creditfy', value: 'creditfy' },
  { name: 'Comunicate de presă', value: 'press'}
]

type Props = {
  permisiuni: string[]
  setPermisiuni: React.Dispatch<React.SetStateAction<string[]>>
}

const Permisions = ({ permisiuni, setPermisiuni }: Props) => {
  const handleClick = (value: string) => {
    if ( !permisiuni.includes(value) ) {
      setPermisiuni([value, ...permisiuni])
    } else {
      setPermisiuni(permisiuni.filter(item => item != value ))
    }
  }

  return (
    <div className='mt-8'>
      { Permisiuni.map((item) => (
        <div
          key={item.value}
          className='flex flex-row items-center mt-4 cursor-pointer'
          onClick={() => handleClick(item.value) }
        >
          <div 
            className='w-4 h-4 border-secondary border-[1.5px] rounded-[4px] mr-4'
            style={{ background: permisiuni.includes(item.value) ? '#8717F8' : 'transparent' }}
          ></div>
          <p className='text-secondary font-semibold text-[14px]'>{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Permisions