import Head from "next/head"
import CheckoutForm from "../../../components/landing-page/CheckoutForm"

const Page = () => {
  

  return (
    <div>
      <Head>
        <title>{`FLASHCARDS START UP NATION + SEDINTA CONSULTANTA`}</title>
      </Head>
      <CheckoutForm discountCode={'none'} />
    </div>
  )
}

export default Page