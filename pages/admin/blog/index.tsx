import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin-nav/AdminLayout'
import Header from '../../../components/admin/blog/Header'
import { collection, endBefore, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Article } from '../../../types'
import ArticlesTable from '../../../components/admin/blog/ArticlesTable'
import { formatDate } from '../../../utils/formatDate'
import Pagination from '../../../components/blog/Pagination'

type Props = {
  articles: Article[]
  isLastPage: boolean
}

const articlesPerPage = 15

const Blog = ({ articles: initialArticles, isLastPage: initialIsLastPage }: Props) => {
  const [articles, setArticles] = useState< Article[] >(initialArticles)
  const [isLastPage, setIsLastPage] = useState(initialIsLastPage)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const next = async () => {
    setIsLoading(true)
    const collectionRef = query(collection(db, 'articles'), orderBy('index', 'desc'), startAfter(articles[articles.length-1].index), limit(articlesPerPage))
    const collectionSnap = await getDocs(collectionRef)
    
    const newArticles: Article[] = collectionSnap.docs.map((doc) => (
      { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...doc.data() } as Article
    ))

    const lastArticleRef = query(collection(db, 'articles'), orderBy('index', 'asc'), limit(1))
    const lastArticle = await getDocs(lastArticleRef)

    if ( newArticles.length != 0 && !lastArticle.empty ) {
      setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
    }
    
    setArticles(newArticles)
    setPage(page+1)
    window.scrollTo({top:0, behavior: 'instant'})
    setIsLoading(false)
  }

  const previous = async () => {
    setIsLoading(true)

    const collectionRef = query(collection(db, 'articles'), orderBy('index', 'asc'), startAfter(articles[0].index), limit(articlesPerPage))
    const collectionSnap = await getDocs(collectionRef)
    
    const newArticles: Article[] = collectionSnap.docs.map((doc) => (
      { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...doc.data() } as Article
    ))

    const lastArticleRef = query(collection(db, 'articles'), orderBy('index', 'asc'), limit(1))
    const lastArticle = await getDocs(lastArticleRef)

    if ( articles.length != 0 && !lastArticle.empty ) {
      setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
    }
    
    setArticles(newArticles.reverse())
    setPage(page-1)
    window.scrollTo({top:0, behavior: 'instant'})

    setIsLoading(false)
  }

  const fetchArticles = async () => {
    setIsLoading(true)

    const collectionRef = query(collection(db, 'articles'), orderBy('index', 'desc'), limit(articlesPerPage))
    const collectionSnap = await getDocs(collectionRef)
    
    const newArticles: Article[] = collectionSnap.docs.map((doc) => (
      { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...doc.data() } as Article
    ))

    const lastArticleRef = query(collection(db, 'articles'), orderBy('index', 'asc'), limit(1))
    const lastArticle = await getDocs(lastArticleRef)

    if ( articles.length != 0 && !lastArticle.empty ) {
      setIsLastPage(lastArticle.docs[0].id == newArticles[newArticles.length-1].id)
    }
    
    setArticles(newArticles)
    window.scrollTo({top:0, behavior: 'instant'})
    setIsLoading(false)
  }

  useEffect(() => {
    setPage(1)
    fetchArticles()
  }, [])

  return (
    <AdminLayout>
      <Header />

      <ArticlesTable 
        articles={articles}
        setArticles={setArticles}
      />
      
      <Pagination 
        page={page}
        lastPage={isLastPage}
        next={next}
        previous={previous}
        isLoading={isLoading}
      />
    </AdminLayout>
  )
}

export default Blog

export const getServerSideProps = async () => {
  const collectionRef = query(collection(db, 'articles'), orderBy('index', 'desc'), limit(articlesPerPage))
  
  const collectionSnap = await getDocs(collectionRef)
  
  const articles: Article[] = collectionSnap.docs.map((doc) => {
    const { createdAt, lastUpdated, ...docData } = doc.data()
    
    return (
      { id: doc.id, formattedCreatedAt: formatDate(new Date(doc.data().createdAt.seconds*1000)), ...docData } as Article
  )})

  let isLastPage = true

  const lastArticleRef = query(collection(db, 'articles'), orderBy('index', 'asc'), limit(1))
  const lastArticle = await getDocs(lastArticleRef)

  if ( articles.length != 0 && !lastArticle.empty ) {
    isLastPage = lastArticle.docs[0].id == articles[articles.length-1].id
  }
  
  return { props: { articles, isLastPage }}
}