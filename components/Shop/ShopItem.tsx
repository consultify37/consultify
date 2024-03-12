import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { backCarousel, nextCarousel } from "../../utils/functions";
import { useRef, useState, useEffect, createRef } from "react";
import Link from "next/link";
import Image from "next/image";

type ShopItem = {
  id: string;
  nume: string;
  poza: string;
  reducere: string;
  pret: string;
};
const ShopItem = ({
  categorie,
  products,
}: {
  categorie: any;
  products: ShopItem[];
}) => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [cardRef, setCardRef] = useState([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // add or remove refs
    setCardRef((cardRefs) =>
      Array(products.length)
        .fill(undefined)
        .map((_, i) => cardRefs[i] || createRef())
    );
  }, [products, products.length]);

  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return console.log("nu exista");
    carouselRef.current.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [scrollAmount]);
  return (
    <div className="flex flex-col">
      <div key={categorie.id} className="flex justify-between w-full items-center">
        <h2 className="md:text-xl lg:text-2xl text-[#8717F8] font-bold max-w-[80%] md:max-w-[30%] pl-7 md:pl-[80px] xl:pl-[140px] 2xl:pl-[276px]">
          {categorie.nume}
        </h2>
        <div className="md:flex flex-row pr-7 md:pr-[80px] xl:pr-[140px] 2xl:pr-[276px]">
          <span
            className="bg-[#7000FF] w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer mr-2"
            onClick={() =>
              backCarousel(setScrollAmount, carouselRef, cardRef[0])
            }
          >
            <AiOutlineArrowLeft className="text-[#fff]" size={18} />
          </span>
          <span
            className="bg-[#7000FF] w-[43px] h-[43px] flex items-center justify-center rounded-full cursor-pointer mr-2"
            onClick={() =>
              nextCarousel(setScrollAmount, carouselRef, cardRef[0])
            }
          >
            <AiOutlineArrowRight className="text-[#fff]" size={18} />
          </span>
        </div>
      </div>
      <div
        className="flex gap-4 items-stretch overflow-y-auto scrollbar-none pb-6 pt-4"
        ref={carouselRef}
      >
        <Link
          key={categorie.id}
          href={`/shop/categorie/${ categorie.nume.replace(/\s+/g, "-").toLowerCase()} `}
          className={`min-h-[334px] max-h-[334px] p-2 rounded-[35px] shadow-lg min-w-[60%] md:min-w-[280px] flex flex-col gap-4 snap-center relative bg-no-repeat bg-center bg-cover ml-7 md:ml-[80px] ml:pl-[140px] 2xl:ml-[276px]`}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7),  rgba(0, 0, 0, 0.7)), url(https://api.inspiredconsulting.ro/${categorie.poza})`,
          }}
        >
          <h4 className="text-white font-bold text-base absolute text-center bottom-2 left-[50%] translate-x-[-50%] w-full">
            Vezi toată categoria
          </h4>
        </Link>
        {products.map((item: ShopItem, j: number) => (
          <Link
            ref={cardRef[j]}
            key={item.id}
            href={`/shop/view/${item.nume.replace(/\s+/g, "-").toLowerCase()}`}
            className="p-2 bg-[#F2F4FF] rounded-[35px] shadow-lg min-w-[60%] md:min-w-[280px] flex flex-col gap-4 snap-center "
            style={{marginRight: j == products.length - 1 ? 24 : 0}}
          >
            <div className="relative h-[250px]">
              <Image
                src={`https://api.inspiredconsulting.ro/${ item.poza }`}
                alt="cart image"
                placeholder="blur"
                blurDataURL="/images/whyus-cart-image.png"
                width={152}
                height={264}
                className="mx-auto absolute w-full h-full object-cover rounded-[35px]  p-2"
              />
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col gap-2 max-w-[85%]">
                <p className="text-[#8717F8] text-sm font-bold">
                  {" "}
                  {item.pret} lei{" "}
                  {item.reducere && (
                    <s className="text-[#7C9EF8] font-thin">
                      {item.reducere} lei
                    </s>
                  )}{" "}
                </p>
                <h4 className="text-[#260056] font-bold text-base">
                  {item.nume}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopItem;
