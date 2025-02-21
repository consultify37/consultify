import Head from "next/head"
import ShopHeader from "../../components/shop/ShopHeader"
import ShopItems from "../../components/shop/ShopItems"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { Product, ProductCategory } from "../../types"
import NewsLetter from "../../components/global/newsletter"

type Props = {
	products: Product[]
	categories: ProductCategory[]
}

const Shop = ({ categories, products }: Props) => {
	return(
		<>
			<Head>
				<title>Consultify | Shop</title>
				<>
  <meta name="description" content="Consultify Shop - Descoperă produse digitale ready-made pentru antreprenori și profesioniști. Alege pachete pentru marketing, web design, programare și consultanță." />
  <meta name="keywords" content="produse digitale, pachete ready-made, marketing online, web design, programare, consultanță, documente business, ecommerce, freelancing" />
</>

			</Head>
			<ShopHeader />
			<ShopItems 
				categories={categories}
				products={products}
			/>
			<NewsLetter 
				headingText="Abonează-te la newsletter-ul nostru pentru noutăți și oferte exclusive!"
			/>
		</>
	)
}

export default Shop

export const getServerSideProps = async () => {
	const collectionRef = query(collection(db, 'products'), where('active', '==', true), orderBy('lastUpdated', 'desc'))
	const collectionSnap = await getDocs(collectionRef)
	
	const products: Product[] = collectionSnap.docs.map((doc) => {
		const { lastUpdated, ...data } = doc.data()

		return ({ id: doc.id, ...data } as Product)
	})

  const docsRef = query(collection(db, 'product-categories'))
  const docsSnap = await getDocs(docsRef)

  const categories = docsSnap.docs.map(doc => ( { id: doc.id, ...doc.data() } ))

  return { props: { categories, products }}
}