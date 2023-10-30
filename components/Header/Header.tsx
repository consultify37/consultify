import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { HiMenuAlt1 } from "react-icons/hi"
import FixedLeft from "./FixedLeft"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { CartModal, LoginModal } from "../modals"
import Cookies from "js-cookie"
import { usePathname } from "next/navigation"

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showCart, setShowCart] = useState<boolean>(false)
  const ref = useRef(null)
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", () => setToggle(false))
  }, [router.events])

  const pathname = usePathname()

  const handleLoginModalClosing = () => void setShowLoginModal(false)
  const handleLoginModalOpening = () => void setShowLoginModal(true)
  const handleCartClosing = () => void setShowCart(false)
  const handleCartOpening = () => void setShowCart(true)
  let user = Cookies.get("user")

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (user != null) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [user])

  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
  }

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [])

  return (
    <>
      <header className="">
        {/* generalSettings */}
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FixedLeft />
        <nav
          role="main"
          className="fixed z-[999] top-14 w-[calc(100%-12px*2)] md:w-[calc(100%-16px*2)] xl:w-[calc(100%-110px*2)] 2xl:w-[calc(100%-216px*2)] mx-3 md:mx-4 xl:mx-[110px] 2xl:mx-[216px]"
        >
          <div className={"rounded-full flex flex-row justify-between items-center px-8 lg:px-[60px] py-2 md:py-4 duration-300 transition-all " + (!pathname?.includes('/blog-post') || scrollPosition != 0 ? "bg-[#260056]" : "bg-transparent")}>
            <Link href="/" className="flex items-center justify-center z-[99]">
              <Image
                src="/images/logo.svg"
                width={120}
                height={38}
                className="align-middle w-[130px] md:w-[180px] h-auto"
                alt="Consultify logo"
              />
            </Link>
            <div className="flex items-center gap-2 lg:hidden z-[99]">
              {/* <Link
                href="/"
                className="text-[#fff] p-[10px] bg-[#7000FF] rounded-full"
              >
                <AiOutlineShoppingCart onClick={handleCartOpening} size={20} />
              </Link> */}
              {/* {toggle ? (
                <AiOutlineClose
                  className="text-white cursor-pointer lg:hidden rotate-180"
                  onClick={() => setToggle(false)}
                  size={32}
                />
              ) : (
                <HiMenuAlt1
                  className="text-white cursor-pointer lg:hidden rotate-180"
                  onClick={() => setToggle(true)}
                  size={32}
                />
              )} */}
              <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" checked={toggle} onChange={() => setToggle(!toggle) }></input>
              <div 
                className="relative flex items-center lg:hidden max-h-10"
              > 
                  <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative  p-6 -mr-6">
                      <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-white transition duration-300"></div>
                      <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-white
                       transition duration-300"></div>
                  </label>
              </div>
            </div>
            <ul
              className={`list-none absolute lg:relative gap-[30px] duration-300 z-[10] items-center ${
                toggle
                  ? "-left-0 w-full rounded-[38.5px] translate-y-[124px] pt-[50px] bg-[#260056] lg:top-0 lg:w-auto lg:pt-0"
                  : "translate-y-[-200%] lg:translate-y-0"
              } lg:flex`}
            >
              <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  acasă
                </Link>
              </li>
              <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/despre" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  despre
                </Link>
              </li>
              <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/Programe" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  programe
                </Link>
              </li>
              <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/servicii" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  servicii
                </Link>
              </li>
              <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/testimoniale" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  testimoniale
                </Link>
              </li>
              {/* <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/blog" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  blog
                </Link>
              </li> */}
              {/* <li
                className={`${
                  toggle
                    ? "border-b-2 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : ""
                }`}
              >
                <Link href="/shop" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  shop
                </Link>
              </li> */}
              <li
                className={`${
                  toggle
                    ? "border-b-0 w-full  border-b-[#C6CFFF] p-2 pl-10 lg:p-0 lg:border-0"
                    : "hover:scale-[1.05] transition-all"
                }`}
              >
                <Link href="/contact" className={!toggle ? "font-semibold bg-[#7000FF] p-[14px] px-8 rounded-full text-[#fff]" : "font-semibold text-white text-[16px]"}>
                  contactează-ne
                </Link>
              </li>
              {/* <li
                className={`${
                  toggle
                    ? "w-full p-2 pl-10 pb-4 lg:p-0"
                    : "hidden"
                }`}
              >
                <div 
                  onClick={handleLoginModalOpening} 
                  className="font-semibold text-[#7000FF] text-[16px]"
                >
                  login
                </div>
              </li> */}
              {/* <li className="ml-4 hidden cursor-pointer lg:flex">
                {loggedIn ? (
                  <Link
                    href="/cont"
                    className="font-semibold bg-[#7000FF] p-[10px] px-8 pr-9 rounded-full text-[#fff] relative transition-all hover:scale-[1.05]"
                  >
                    Cont
                  </Link>
                ) : (
                  <div
                    onClick={handleLoginModalOpening}
                    className="font-semibold bg-[#7000FF] p-[10px] px-8 pr-9 rounded-full text-[#fff] relative transition-all hover:scale-[1.05]"
                  >
                    login
                  </div>
                )}
                <span
                  onClick={handleCartOpening}
                  className="text-[#fff] p-[9px] bg-[#7000FF] absolute -right-5 rounded-full border-[4px] top-[-3px] border-[#260056] transition-all hover:scale-[1.05]"
                >
                  <AiOutlineShoppingCart size={24} />
                </span>
              </li> */}
            </ul>
          </div>
        </nav>
      </header>
      {showLoginModal ? (
        <LoginModal handleModalClosingClick={handleLoginModalClosing} />
      ) : null}
      {showCart ? (
        <CartModal handleModalClosingClick={handleCartClosing} />
      ) : null}
    </>
  )
}

export default Header