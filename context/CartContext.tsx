import { useContext, useState, createContext, useEffect, Dispatch, SetStateAction } from "react"
import { Product } from "../types"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import Modal from "../components/shop/Modal"


type CartContextType = {
  cart: Product[]
  handleAddProduct: (product: Product) => void
  handleRemoveProduct: (product: Product) => void
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>
  setCoupon: Dispatch<any>
  coupon: any
}

const Context = createContext<CartContextType | null>(null)

type Props = { 
  children: React.ReactNode 
} 

export const CartContext = ({ children }: Props) => {
  const [cart, setCart] = useState< Product[] >([])
  const [coupon, setCoupon] = useState< any | null >(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const fetchCartProducts = async () => {
    const session_id = Cookies.get('cart_session_id')

    if ( session_id ) {
      // if an order document was created, the payment was completed and we need to remove the items in the cart
      try {
        const q = query(collection(db, 'orders'), where('checkout_session_id', '==', session_id))
        const snap = await getDocs(q)

        if ( !snap.empty ) {
          Cookies.remove('cart_session_id')
          Cookies.remove('cart')
        }
      } catch (e) {
        console.log(e)
      }
    }

    const stringifiedCartIds = Cookies.get('cart')

    try {
      if ( stringifiedCartIds && JSON.parse( stringifiedCartIds ).length != 0 ) {
        const cartIds = JSON.parse( stringifiedCartIds ).slice(0, 30)
  
        const docsRef = query(collection(db, 'products'), where('active', '==', true), where(documentId(), 'in', cartIds))
        const docsSnap = await getDocs(docsRef)

        const products: Product[] = docsSnap.docs.map((doc) => (
          { id: doc.id, ...doc.data() } as Product
        ))

        setCart(products)
      } 
    } catch (e) {
      console.log(e)
    }
 
  }

  useEffect(() => {
    fetchCartProducts()
  }, [])
  
  const handleAddProduct = ( product: Product ) => {
    if ( cart.findIndex(((item) => item.id == product.id )) != -1 ) {
      toast.success('Produsul este deja în coșul de cumpărături.')
      return
    }
    setCart(cart => [product, ...cart])

    const cartIds = [product, ...cart].map((product) => product.id )

    Cookies.set('cart', JSON.stringify(cartIds))

    setSelectedProduct(product)

    // toast.success('Produs adăugat în coșul de cumpărături.')
  }

  const handleRemoveProduct = ( product: Product ) => {
    setCart(cart => cart.filter(cart => cart.id != product.id ) )

    const cartIds = cart.filter(cart => cart.id != product.id ).map((product) => product.id )

    Cookies.set('cart', JSON.stringify(cartIds))
    toast.success('Produsul a fost eliminat din coșul de cumpărături.')
  }

  return(
    <Context.Provider 
      value={{ cart, handleAddProduct, handleRemoveProduct, setSelectedProduct, coupon, setCoupon }}
    >
      {children}
      <Modal product={selectedProduct}/>
    </Context.Provider>
  )
}

export const useCartContext = () => {
  const cartContext = useContext(Context)

  if (!cartContext) throw new Error('You need to use this hook inside a context provider')

  return cartContext
}