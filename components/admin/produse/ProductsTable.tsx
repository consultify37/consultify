import React from 'react'
import { Product } from '../../../types'
import ProductRow from './ProductRow'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import toast from 'react-hot-toast'
import { deleteFile } from '../../../utils/b2_storage/delete_file'

type Props = {
  products: Product[]
  category: string
  onlySales: boolean
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductsTable = ({ products, category, onlySales, setProducts }: Props) => {

  const handleDelete = async (product: Product) => {
    if ( confirm('Ești sigur că vrei să ștergi produsul? Acțiunea este definitivă.' )) {
      if ( confirm('Doar ca să fim siguri, mai cerem o confirmare. Produsul poate fii deja folosit de clienți. Dacă vrei ca acesta să nu mai apară în shop îl poți face inactiv.') ) {
        if ( confirm('Ultima șansă, fii foarte atent, acțiunea este definitivă.') ) {
          const docRef = doc(db, 'products', product.id!)

          try {
            await deleteDoc(docRef)

            setProducts(products.filter((product) => product.id != product.id ))

            product.file && await deleteFile({ fileId: product.file.file.fileId, fileName: product.file.file.fileName })
            product.image && await deleteFile({ fileId: product.image.file.fileId, fileName: product.image.file.fileName })
          } catch (e: any) {
            console.log(e)

            if ( e.code || e.message ) {
              e.message ? toast.error(e.message) : toast.error('Ceva nu a mers bine, încearcă din nou.')
              const collectionRef = collection(db, 'products')

              await addDoc(collectionRef, { 
                code: e.code ? e.code : null , 
                message: e.message ? e.message : null, 
                severity: 'error', 
                createdAt: new Date() 
              })
            }
          }
        }
      }
    }
    
  }

  return (
    <div>
      <table className='w-full mt-3 text-left border-separate border-spacing-y-5'>
        <thead className='bg-admin-header'>
          <tr>
            <th className='pl-8 py-4 rounded-s-lg'>Poza</th>
            <th className='py-4'>Nume produs</th>
            <th className='py-4'>Preț</th>
            <th className='py-4'>Categorie</th>
            <th className='py-4'>Status</th>
            <th className='py-4 rounded-e-lg'></th>
          </tr> 
        </thead>
        <tbody className=''>
          { products.filter((product) => {
          if ( category == 'Toate' && !onlySales ) {
            return true

          } else if ( category == 'Toate' && onlySales ) {
            return product.onSale

          } else if ( category != 'Toate' && !onlySales ) {
            return product.category == category 

          } else if ( category != 'Toate' && onlySales ) {
            return product.onSale && product.category == category 
          }       

        }).map((product) => (
            <ProductRow 
              key={product.id}
              handleDelete={handleDelete}
              product={product as Product}
            />
          )) }
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable