import React, { useEffect } from "react";
import { Article, Product } from "../types";

export const backCarousel = (
  setScrollAmount: React.Dispatch<React.SetStateAction<number>>,
  carousel: React.RefObject<HTMLDivElement> | null,
  cardRef: React.RefObject<HTMLAnchorElement | HTMLElement>
) => {
  if (!carousel || !carousel.current) return;
  setScrollAmount((old) =>
    old <= 0
      ? carousel.current!.scrollWidth - carousel.current!.clientWidth
      : old - cardRef.current!.clientWidth
  );
};
export const nextCarousel = (
  setScrollAmount: React.Dispatch<React.SetStateAction<number>>,
  carousel: React.RefObject<HTMLDivElement> | null,
  cardRef: React.RefObject<HTMLAnchorElement | HTMLElement>
) => {
  if (!carousel || !carousel.current || !cardRef || !cardRef.current)
    return console.log("nu exista");
  const scrollbarWidth = Number(carousel.current.scrollWidth);
  setScrollAmount((old) =>
    Math.ceil(carousel.current!.offsetWidth + carousel.current!.scrollLeft) >=
      scrollbarWidth
      ? 0
      : old + cardRef.current!.clientWidth
  );
};

export function Pagination(data: Product[], current: number, max: number) {
  const last = (current + 1) * max;
  const first = last - max;
  const newdata = data.slice(first, last);
  return newdata;
}

export function PaginationBlog(data: Article[] | any[], current: number, max: number) {
  const last = (current + 1) * max;
  const first = last - max;
  const newdata = data.slice(first, last);
  return newdata;
}

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): ((args: A) => Promise<R>) => {
  const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

  useEffect(() => () => teardown(), [teardown]);

  return debouncedFun;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  initial?: number;
  image: string;
};

export type FavoriteItem = {
  id: number;
  initial?: number;
  name: string;
  price: string;
  image: string;
};

function getFavoriteItemsFromLocalStorage(): string | null {
  const { localStorage } = window;
  const favoriteItems = localStorage.getItem("favorite_items");
  return favoriteItems;
}

export function addFavoriteItemToLocalStorage(item: FavoriteItem): null {
  const favoriteItems = getFavoriteItemsFromLocalStorage();
  if (favoriteItems === null) {
    localStorage.setItem("favorite_items", JSON.stringify([item]));
    return null;
  }
  if (searchFavoriteItem(item)) {
    return null;
  }
  const parsedItems = JSON.parse(favoriteItems);
  localStorage.setItem(
    "favorite_items",
    JSON.stringify([...parsedItems, item])
  );
  return null;
}

export function searchFavoriteItem(item: FavoriteItem): boolean {
  const items = getFavoriteItemsFromLocalStorage();
  if (items === null) {
    return false;
  }
  const favoriteItems: FavoriteItem[] = JSON.parse(items);
  return favoriteItems.filter((items) => items.id === item.id).length > 0;
}

export function getAllFavoriteItems(): FavoriteItem[] | never[] {
  const items = getFavoriteItemsFromLocalStorage();
  if (items === null) {
    return [];
  }
  return JSON.parse(items);
}
export function deleteFavoriteItem(Item: FavoriteItem): FavoriteItem[] | null {
  const items = getFavoriteItemsFromLocalStorage();
  if (items === null) {
    return null;
  }
  const favoriteItems: FavoriteItem[] = JSON.parse(items);
  const filteredFavoriteItems = favoriteItems.filter((item) =>
    item.id !== Item.id ? item : undefined
  );
  localStorage.setItem("favorite_items", JSON.stringify(filteredFavoriteItems));
  return filteredFavoriteItems;
}

function getCartItemsFromLocalStorage() {
  const { localStorage } = window;
  const items = localStorage.getItem("cart_items");
  return items;
}

export function removeItemFromCart(Item: CartItem) {
  const items = getCartItemsFromLocalStorage();
  if (items === null) {
    return null;
  }
  const cartItems: CartItem[] = JSON.parse(items);
  const filteredCartItems = cartItems.filter((item) => {
    if (item.id !== Item.id) return item;
  });
  localStorage.setItem("cart_items", JSON.stringify(filteredCartItems));
  return filteredCartItems;
}

function seachItemInCart(item: CartItem) {
  const items = getCartItemsFromLocalStorage();
  if (items === null) {
    return false;
  }
  const cartItems: CartItem[] = JSON.parse(items);
  return cartItems.filter((items) => items.id === item.id).length > 0;
}

export function addItemToCart(Item: CartItem) {
  const items = getCartItemsFromLocalStorage();
  if (items === null) {
    const { localStorage } = window;
    localStorage.setItem("cart_items", JSON.stringify([Item]));
    return null;
  }
  const cartItems: CartItem[] = JSON.parse(items);
  if (seachItemInCart(Item)) {
    return null;
  }
  cartItems.push(Item);
  localStorage.setItem("cart_items", JSON.stringify(cartItems));
}

export function getAllItemFromLocalStorage() {
  const items = getCartItemsFromLocalStorage();
  if (items === null) {
    return [];
  }
  return JSON.parse(items) as CartItem[];
}
