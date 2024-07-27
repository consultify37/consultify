import { useContext, useState, createContext, useEffect } from "react"
import { Product } from "../types"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"


type FavoritesContextType = {
  favorites: Product[]
  handleAddProductToFavorites: (product: Product) => void
  handleRemoveProductFromFavorites: (product: Product) => void
  isLoading: boolean
}

const Context = createContext<FavoritesContextType | null>(null)

type Props = { 
  children: React.ReactNode 
} 

export const FavoritesContext = ({ children }: Props) => {
  const [favorites, setFavorites] = useState< Product[] >([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchFavoritesProducts = async () => {
    const stringifiedFavoritesIds = Cookies.get('favorites')
    try {
      if ( stringifiedFavoritesIds && stringifiedFavoritesIds != '[]' ) {
        setIsLoading(true)
        const FavoritesIds = JSON.parse( stringifiedFavoritesIds ).slice(0, 30)
        
        const docsRef = query(collection(db, 'products'), where(documentId(), 'in', FavoritesIds))
        const docsSnap = await getDocs(docsRef)

        const products: Product[] = docsSnap.docs.map((doc) => (
          { id: doc.id, ...doc.data() } as Product
        ))
    
        setFavorites(products)
      } 
    } catch (e) {
      console.log(e)
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    fetchFavoritesProducts()
  }, [])
  
  const handleAddProductToFavorites = ( product: Product ) => {
    if ( favorites.findIndex(((item) => item.id == product.id )) != -1 ) {
      toast.success('Produsul este deja adăugat la favorite.')
      return
    }
    setFavorites(favorites => [product, ...favorites])

    const FavoritesIds = [product, ...favorites].map((product) => product.id )

    Cookies.set('favorites', JSON.stringify(FavoritesIds))
    toast.success('Produs adăugat la favorite.')
  }

  const handleRemoveProductFromFavorites = ( product: Product ) => {
    setFavorites(Favorites => Favorites.filter(Favorites => Favorites.id != product.id ) )

    const FavoritesIds = favorites.filter(favorites => favorites.id != product.id ).map((product) => product.id )

    Cookies.set('favorites', JSON.stringify(FavoritesIds))
    toast.success('Produsul a fost eliminat de la favorite.')
  }

  return(
    <Context.Provider 
      value={{ favorites, isLoading, handleAddProductToFavorites, handleRemoveProductFromFavorites }}
    >
      {children}
    </Context.Provider>
  )
}

export const useFavoritesContext = () => {
  const favoritesContext = useContext(Context)

  if (!favoritesContext) throw new Error('You need to use this hook inside a context provider')

  return favoritesContext
}