import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";
import { ShopItemInterface } from "../../../pages/shop/view/[name]";
import Axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  addFavoriteItemToLocalStorage,
  addItemToCart,
  deleteFavoriteItem,
  FavoriteItem,
  searchFavoriteItem,
} from "../../../utils/functions";

const ItemViewContent = ({
  id,
  name,
  img,
  description,
  price,
  initial,
  descriere_2,
}: ShopItemInterface) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [triggerRender, setTriggerRender] = useState<boolean>(false);
  useEffect(() => {
    const item: FavoriteItem = {
      id: Number(id),
      name,
      price: String(price),
      image: img,
    };
    if (searchFavoriteItem(item)) {
      setIsFavorite(true);
      return () => { };
    }
    setIsFavorite(false);
    return () => { };
  }, [id, name, price, img, triggerRender]);

  const addToCart = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const item = {
      id: String(id),
      name,
      price,
      initial,
      image: img,
    };
    addItemToCart(item);
    Axios.get("https://api.inspiredconsulting.ro/products/adauga", {
      params: {
        id: id,
        action: "cos",
      },
    })
      .then(function(response) {
        console.log(response.data);
        Cookies.set("cos", response.data[1], { expires: 30 });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  const addFav = () => {
    const item: FavoriteItem = {
      name,
      id: Number(id),
      price: String(price),
      image: img,
    };
    addFavoriteItemToLocalStorage(item);
    setTriggerRender(!triggerRender);
    Axios.get("https://api.inspiredconsulting.ro/products/adauga", {
      params: {
        id: id,
        action: "favorite",
      },
    })
      .then(function(response) {
        Cookies.set("favoriteda", response.data[1], { expires: 30 });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const removeF = () => {
    const item: FavoriteItem = {
      name,
      id: Number(id),
      price: String(price),
      image: img,
    };
    deleteFavoriteItem(item);
    setTriggerRender(!triggerRender);
    Axios.get("https://api.inspiredconsulting.ro/products/sterge", {
      params: {
        id: id,
        action: "favorite",
      },
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const cookieFav = Cookies.get("favoriteda");
  useEffect(() => {
    Axios.get("https://api.inspiredconsulting.ro/products/lista-produse", {
      params: {
        action: "favorite",
        cookie: cookieFav,
      },
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [cookieFav]);
  return (
    <section
      id="product-info"
      className="flex flex-col gap-2 mt-[8rem] px-7 md:px-[80px] xl:px-[200px] 2xl:px-[276px] md:pt-16"
    >
      <div className="w-full flex flex-wrap justify-between items-stretch gap-10">
        <div className="relative h-[350px] w-full md:w-[40%] py-6 rounded-[35px] bg-[#F2F4FF] shadow-md flex items-center justify-center">
          <Image
            src={`https://api.inspiredconsulting.ro/${img}`}
            alt={name}
            width={152}
            height={264}
            className="mx-auto absolute w-[80%] h-full object-cover rounded-[50px] p-8"
          />
        </div>
        <div className="w-full md:w-[49%]">
          <h1 className="text-[#260056] font-bold text-xl md:text-2xl">
            {name}
          </h1>
          <p className="font-normal text-base text-[#260056] mb-5 md:max-w-[80%]">
            {description}
          </p>
          {initial && (
            <s className="font-thin text-sm text-[#7C9EF8]">{initial} lei</s>
          )}
          <p className="font-bold text-base md:text-xl text-[#8717F8] mb-5">
            {price} lei
          </p>
          <button
            className="outline-none border-none text-white bg-[#8717F8] font-semibold px-20 py-3 mr-auto rounded-[28.5px] mb-10 hover:scale-[1.05] transition-all"
            onClick={addToCart}
          >
            Adaugă în coș
          </button>
          {!isFavorite ? (
            <button
              className="flex gap-2 items-center mb-4 cursor-pointer"
              onClick={addFav}
            >
              <span className="p-2 bg-[#EAEDFF] rounded-lg">
                <AiOutlineHeart size={16} className="text-[#FF6666]" />
              </span>
              <p className="text-base text-[#260056] font-bold">
                adaugă la favorite
              </p>
            </button>
          ) : (
            <button
              className="flex gap-2 items-center mb-4 cursor-pointer"
              onClick={removeF}
            >
              <span className="p-2 bg-[#EAEDFF] rounded-lg">
                <AiFillHeart size={16} className="text-[#FF6666]" />
              </span>
              <p className="text-base text-[#260056] font-bold">
                elimina de la favorite
              </p>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-32">
          <h2 className="font-bold text-[#260056] md:text-xl lg:text-2xl xl:text-4xl">
            Descrierea produsului
          </h2>
          <p className="font-normal text-base text-[#260056]">{descriere_2}</p>
        </div>
      </div>
    </section>
  );
};

export default ItemViewContent;
