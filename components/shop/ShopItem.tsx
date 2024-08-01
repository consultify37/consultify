import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { backCarousel, nextCarousel } from "../../utils/functions"
import { useRef, useState, useEffect, createRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Product, ProductCategory } from "../../types"
import ProductCard from "./ProductCard"

const ShopItem = ({
  category,
  products,
}: {
  category: ProductCategory
  products: Product[]
}) => {
  const [scrollAmount, setScrollAmount] = useState(0)
  const [cardRef, setCardRef] = useState< any >([])
  const carouselRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // add or remove refs
    setCardRef((cardRefs: any) =>
      Array(products.length)
        .fill(undefined)
        .map((_, i) => cardRefs[i] || createRef())
    )
  }, [products, products.length])
  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return console.log("nu exista")
    carouselRef.current.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    })
  }, [scrollAmount])

  return (
    <div className="flex flex-col mb-16 lg:mb-24">
      <div key={category.id} className="flex justify-between w-full items-center">
        <h2 className="text-[24px] lg:text-[32px] text-secondary font-bold pl-7 md:pl-[80px] xl:pl-[140px] 2xl:pl-[276px]">
          {category.category}
        </h2>
        <div className="flex flex-row pr-7 md:pr-[80px] xl:pr-[140px] 2xl:pr-[276px]">
          <span
            className="bg-secondary w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer mr-2 hover:scale-105 transition-all"
            onClick={() =>
              backCarousel(setScrollAmount, carouselRef, cardRef[0])
            }
          >
            <AiOutlineArrowLeft className="text-[#fff]" size={18} />
          </span>
          <span
            className="bg-secondary w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer mr-2 hover:scale-105 transition-all"
            onClick={() =>
              nextCarousel(setScrollAmount, carouselRef, cardRef[0])
            }
          >
            <AiOutlineArrowRight className="text-[#fff]" size={18} />
          </span>
        </div>
      </div>
      <div
        className="flex gap-4 md:gap-5 xl:gap-6 items-stretch overflow-y-auto scrollbar-none pb-6 pt-6 h-full"
        ref={carouselRef}
      >
        <Link
          href={`/shop/category/${ category.id }`}
          className="relative group overflow-hidden h-auto rounded-[16px] shadow-lg w-[280px] min-w-[280px] flex flex-col gap-4 snap-center bg-no-repeat bg-center bg-cover ml-7 md:ml-[80px] xl:ml-[140px] 2xl:ml-[276px]"
        >
            <Image 
              src={category.image?.image || ''}
              width={512}
              height={512}
              alt='.'
              className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-all duration-300"
            />

            <div className="absolute h-full w-full rounded-[16px] bg-gradient-to-b from-[#00000034] to-[#000000b1]"></div>

            <h4 className="text-white font-bold text-[16px] absolute text-center bottom-2 left-[50%] translate-x-[-50%] w-full">
              Vezi toată categoria
            </h4>
        </Link>
        { products.map((item, index) => (
          <div key={item.id} >
            <ProductCard
              cardRef={cardRef[index]}
              hasMargin={index == products.length - 1}
              product={item}
              className="w-[280px] min-w-[280px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopItem
