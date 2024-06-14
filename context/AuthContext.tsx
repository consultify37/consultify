import { useContext, useState, createContext, useEffect, Dispatch, SetStateAction } from "react"
import { User } from "../types"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import ReactLoading from 'react-loading'
import { usePathname } from "next/navigation"


type AuthContextType = {
  currentUser: User | null
  isLoadingAuth: boolean
  setCurrentUser: Dispatch<SetStateAction<User | null>>
}

const Context = createContext<AuthContextType | null>(null)

type Props = { 
  children: React.ReactNode 
} 

export const AuthContext = ({ children }: Props) => {
  const pathname = usePathname()
  const [currentUserAuth, setCurrentUserAuth] = useState< any >(null)
  const [currentUser, setCurrentUser] = useState< User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoadingAuth(true)

      if (user) {
        setCurrentUserAuth(user)
        const userDoc = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDoc)

        setCurrentUser({ id: userDocSnap.id, ...userDocSnap.data() } as User)
      } else {
        setCurrentUser(null)
        setCurrentUserAuth(null)
      }

      setIsLoadingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if ( currentUserAuth ) {
      const userDoc = doc(db, 'users', currentUserAuth.uid)
      
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        setCurrentUser({ id: doc.id, ...doc.data()} as User)
      })

      return () => unsubscribe()
    }
  }, [currentUserAuth])

  if ( isLoadingAuth && pathname?.includes('/admin') ) {
    return (
      <div className='relative w-full h-screen flex items-center justify-center' style={{height: '100vh'}}>
        <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
      </div>
    )
  }

  return(
    <Context.Provider 
      value={{ currentUser, isLoadingAuth, setCurrentUser }}>
      {children}
    </Context.Provider>
  )
}

export const useAuthContext = () => {
  const authContext = useContext(Context)

  if (!authContext) throw new Error('You need to use this hook inside a context provider')

  return authContext
}