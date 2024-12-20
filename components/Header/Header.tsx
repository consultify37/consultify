import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CartModal, LoginModal } from "../modals"
import Cookies from "js-cookie"
import { usePathname } from "next/navigation"
import { useAuthContext } from "../../context/AuthContext"
import { useCartContext } from "../../context/CartContext"
import TiktokPixel from 'tiktok-pixel'

const Header = () => {
  const { cart } = useCartContext()
  const [toggle, setToggle] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showCart, setShowCart] = useState<boolean>(false)
  const { currentUser } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    TiktokPixel.init('CSIBFVRC77U91IC6MTO0')    
  }, [])
  
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

  useEffect(() => {
    function handleWindowResize() {
      setToggle(false)
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <header className="">
        {/* generalSettings */}
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <FixedLeft /> */}
        <nav
          role="main"
          className="fixed z-[999] top-14 w-[calc(100%-12px*2)] lg:w-[calc(100%-60px*2)] xl:w-[calc(100%-40px*2)] 2xl:w-[calc(100%-136px*2)] mx-3 lg:mx-[60px] xl:mx-[40px] 2xl:mx-[166px]"
        >
          <div className={"rounded-full flex flex-row justify-between items-center px-8 xl:px-[60px] py-2 xl:py-4 duration-300 transition-all " + ((!pathname?.includes('/blog/')) || (scrollPosition != 0) ? "bg-secondary" : "bg-transparent")}>
            <Link href="/" className="flex items-center justify-center z-[99]">
              <Image
                src="/images/logo.svg"
                width={120}
                height={38}
                className="align-middle w-[130px] lg:w-[180px] h-auto"
                alt="Consultify logo"
              />
            </Link>
            <div className="flex flex-row items-center xl:hidden z-[99]">
              <Link
                href='/shop/cart'
                className="p-[14px] lg:p-[16px] rounded-full bg-primary hover:scale-105 transition-all -mr-2 lg:-mr-0"
              >
                <div className="relative">
                  <Image 
                    src='/images/cart.svg'
                    width={32}
                    height={32}
                    alt="."
                    className="w-4 h-4 lg:w-[18px] lg:h-[18px]"
                  />
                  { cart.length > 0 &&
                    <div className="flex items-center justify-center absolute h-[18px] w-[18px] bg-red-500 rounded-full -bottom-[16px] -right-[16px]">
                      <p className="text-[10px] text-white font-semibold" >{ cart.length }</p>
                    </div>
                  }
                </div>
              </Link>
              <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" checked={toggle} onChange={() => setToggle(!toggle) }></input>
              <div 
                className="relative flex items-center xl:hidden max-h-10"
              > 
                  <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative  p-6 -mr-6">
                      <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-white transition duration-300"></div>
                      <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-white
                       transition duration-300"></div>
                  </label>
              </div>
            </div>
            
            <ul
              className={`list-none absolute rounded-[27px] xl:rounded-[36px] xl:relative gap-[30px] duration-300 -top-[calc(100vh+56px)] xl:h-auto z-[10] xl:mx-0 items-center left-0 xl:-left-0 w-full bg-secondary xl:bg-transparent xl:top-0 xl:w-auto xl:pt-0 xl:flex ${
                toggle
                  ? "mt-[calc(100vh+56px)] xl:mt-[calc(100vh+56px)] pt-[60px] xl:pt-[72px] pb-2"
                  : ""
              }`}
            >
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  acasă
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/despre" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  despre
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/Programe" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  programe
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/servicii" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  servicii
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/testimoniale" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  testimoniale
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/blog" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  blog
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/shop" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  shop
                </Link>
              </li>
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/comunicate-de-presa" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  comunicate
                </Link>
              </li>
              {/* <li
                className={`w-full lg:w-auto p-2 pl-16 md:pl-18 lg:pl-0 lg:p-0 lg:border-0 lg:hover:scale-[1.05] lg:transition-all`}
              >
                <Link href="/contact" className="lg:font-semibold lg:bg-[#7000FF] lg:p-[14px] lg:px-8 lg:rounded-full lg:text-[#fff] font-semibold text-tertiary text-[16px]">
                  contactează-ne
                </Link>
              </li> */}
              <li
                className={`w-full xl:w-auto p-2 pl-16 border-b-[1px] border-white xl:pl-18 xl:pl-0 xl:p-0 xl:border-0`}
              >
                <Link href="/contact" className="font-semibold text-white text-[16px] hover:text-primary transition-all">
                  contact
                </Link>
              </li>
              
              <li
                className={`xl:hidden w-full xl:w-auto p-2 pl-16`}
              >
                <Link href={ currentUser ? '/cont/comenzi' : '/login' } className="font-semibold text-tertiary text-[16px] transition-all">
                  { currentUser ? 'cont' : 'login' }
                </Link>
              </li>
              <li
                className='relative hidden xl:block'
              >
                <Link href={ currentUser ? '/cont/comenzi' : '/login' } className="py-[14px] pl-8 pr-16 bg-primary rounded-full text-onPrimary font-semibold hover:scale-105 transition-all">
                  { currentUser ? 'cont' : 'login' }
                </Link>
                <Link
                  href='/shop/cart'
                  className="absolute right-0 -top-[14px] p-[12px] rounded-full border-4 bg-primary border-secondary hover:scale-105 transition-all"
                >
                    <Image 
                      src='/images/cart.svg'
                      width={32}
                      height={32}
                      alt="."
                      className="w-5 h-5"
                    />
                    { cart.length > 0 &&
                      <div className="flex items-center justify-center absolute h-[18px] w-[18px] bg-red-500 rounded-full -bottom-[3px] -right-[3px]">
                        <p className="text-[10px] text-white font-semibold" >{ cart.length }</p>
                      </div>
                    }
                </Link>
              </li>
              {/* <li
                className={`${
                  toggle
                    ? "w-full p-2 pl-12 xl:pl-14 pb-4 xl:p-0"
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
              {/* <li className="ml-4 hidden cursor-pointer xl:flex">
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
