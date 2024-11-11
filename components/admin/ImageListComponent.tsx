import Image from 'next/image'
import Link from 'next/link'

type Props = {
  images: any[]
  setImages: React.Dispatch<React.SetStateAction<any[]>>
  setImagesToBeDeleted?: React.Dispatch<React.SetStateAction<any[]>>
}

const ImageListComponent = ({ images, setImages, setImagesToBeDeleted }: Props) => {
  console.log(images)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files && e.target.files[0] ) {
      setImages([...images, e.target.files[0]])
    }
  }

  const handleDelete = async (index: number) => {
    if ( images[index].fileName ) {
      setImagesToBeDeleted && setImagesToBeDeleted(imagesToBeDeleted => [...imagesToBeDeleted, images[index]])
    }

    setImages(images.filter((item, i) => i != index))
  } 

  return (
    <div className=''>
        {
          images.map((image, index) => (
            <div key={index} className='relative flex flex-row justify-between items-end px-2 mb-2'>
            { image && image.url ?
              <Link href={image.url} target='_blank'>
                <p className='text-secondary font-semibold text-[14px] overflow-hidden whitespace-nowrap'>{index}. { image && image.fileName ? image.fileName : image.name }</p>
              </Link> : 
              <p className='text-secondary font-semibold text-[14px] overflow-hidden whitespace-nowrap'>{index}. { image && image.fileName ? image.fileName : image.name }</p>
            }
            <div className='absolute bg-gradient-to-r from-transparent to-admin-background h-5 w-24 right-[54px] top-0'></div>
            <p 
              className='underline underline-offset-1 font-semibold cursor-pointer text-red-500'
              onClick={() => handleDelete(index)}
            >
              șterge
            </p>
          </div>
          ))
        }

        <input 
          type='file'
          id='list'
          accept="image/*"
          hidden
          onChange={handleInput}
        />
        <label
          htmlFor='list' 
          className='w-full py-[19px] bg-primary rounded-[10px] flex flex-row items-center justify-center hover:scale-105 transition-all cursor-pointer'
        >
          <Image 
            src='/images/admin/picture.svg'
            width={15}
            height={15}
            alt='picture'
            className='w-4 h-4 mr-2'
          />
          <p className='text-[14px] font-semibold text-onPrimary'>Adaugă logo mic</p>
        </label>
    </div>
  )
}

export default ImageListComponent