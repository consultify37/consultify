import Image from 'next/image'
import Link from 'next/link'

type Props = {
  images: any[]
  setImages: React.Dispatch<React.SetStateAction<any[]>>
  setImagesToBeDeleted?: React.Dispatch<React.SetStateAction<any[]>>
}

const ImageListComponentBlog = ({ images, setImages, setImagesToBeDeleted }: Props) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files && e.target.files[0] ) {
      setImages([...images, e.target.files[0]])
    }
  }

  const handleDelete = async (index: number) => {
    if ( images[index].file ) {
      setImagesToBeDeleted && setImagesToBeDeleted(imagesToBeDeleted => [...imagesToBeDeleted, images[index].file])
    }

    setImages(images.filter((item, i) => i != index))
  } 

  return (
    <div className='mt-6'>
      <p className='text-secondary text-[15px] font-semibold mb-2'>Listă imagini conținut</p>
      {/* { image ?
          <div className='relative flex flex-row justify-between items-end px-2 mt-8 mb-2'>
            <p className='text-secondary font-semibold text-[14px] overflow-hidden'>{typeof image != 'string' ? image.name : '' }</p>
            <div className='absolute bg-gradient-to-r from-transparent to-admin-background h-5 w-24 right-[54px] top-0'></div>
            <p 
              className='underline underline-offset-1 font-semibold cursor-pointer text-red-500'
              onClick={() => setImage(null)}
            >
              șterge
            </p>
          </div> :
          <div className='h-[64px]'></div>
        } */}

        {
          images.map((image, index) => (
            <div key={index} className='relative flex flex-row justify-between items-end px-2 mb-2'>
            { image && image.image ?
              <Link href={image.image} target='_blank'>
                <p className='text-secondary font-semibold text-[14px] overflow-hidden whitespace-nowrap'>{index}. { image && image.file ? image.file.fileName : image.name }</p>
              </Link> : 
              <p className='text-secondary font-semibold text-[14px] overflow-hidden whitespace-nowrap'>{index}. { image && image.file ? image.file.fileName : image.name }</p>
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
          <p className='text-[14px] font-semibold text-onPrimary'>Adaugă imagine</p>
        </label>
    </div>
  )
}

export default ImageListComponentBlog