import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsLetter from "../../components/global/newsletter"
import Head from "next/head"
import toast from "react-hot-toast"
import Rezultate from "../../components/Rezultate"
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import ReCAPTCHA from "react-google-recaptcha"
import PageHeader from "../../components/Header/PageHeader"
import WhyUsItem1 from "../../components/Home/Why-Us/Item1"
import ReactLoading from 'react-loading'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"
 
export default function Contact() {
    const [nume, setNume] = useState('')
    const [prenume, setPrenume] = useState('')
    const [telefon, setTelefon] = useState('')
    const [email, setEmail] = useState('')
    const [mesaj, setMesaj] = useState('')
    const [nevoie, setNevoie] = useState('')
    const [cui, setCui] = useState('')
    const [firma, setFirma] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [isChecked, setIsChecked] = useState(false)
    const [newsletter, setNewsletter] = useState(true)
    const [captchaVerified, setCaptchaVerified] = useState(false)

    const upload = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!isChecked) {
            toast.error('Acceptă termenii și condițiile mai întăi.')
            setIsLoading(false)
            return
        }

        if (!captchaVerified) {
            toast.error('Verifică Captcha mai întăi.')
            setIsLoading(false)
            return
        }

        try {
            const collectionRef = collection(db, 'contactForms')

            await addDoc(collectionRef, { nume, prenume, firma, cui, telefon, email, subscribe: newsletter, nevoie, mesaj, leadSource: 'Site Web: Form Contact', website: process.env.SITE, createdAt: serverTimestamp() } )
            newsletter && await addDoc(collection(db, 'newsletter'), { website: process.env.SITE, email: email })

            toast.success(`Mulțumim! Un reprezentant ${process.env.SITE} te va contacta în curând. 🚀`, { duration: 5000, style: { textAlign: 'center' } })
            setCui("")
            setEmail("")
            setIsChecked(false)
            setFirma("")
            setMesaj("")
            setNevoie("")
            setNume('')
            setPrenume('')
            setTelefon('')

        } catch (e) {
            setIsLoading(false)
            toast.error('Ceva nu a mers bine. Încearcă din nou!')
        }

        setIsLoading(false)
    }
  
    return (
        <>
            <Head>
                <title>Consultify | Contact</title>
            </Head>
            <PageHeader
                title="Suntem aici pentru tine!"
            >
                <Image
                    src="/images/Polygon 3.png"
                    alt="Hero blue circle"
                    width={100}
                    height={200}
                    className="absolute -right-8 md:right-28 top-28 md:top-4 z-[5] w-[96px] md:w-[160px]"
                />
                <Image
                    src="/images/circle-contact.svg"
                    width={130}
                    height={130}
                    className="absolute top-0 -left-32 md:left-32 md:bottom-0 w-[320px]"
                    alt="Yellow triangle"
                />
            </PageHeader>
            <div className="bg-[#F6EFFF] w-[100vw] h-[130vh] lg:h-[83vh] absolute top-0 left-0 z-[-1]"></div>
            <section className="w-full flex flex-col lg:flex-row items-start my-32 justify-between px-4 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
                <div className="flex flex-col w-full mr-12 bg-[#260056] rounded-3xl p-8">
                    <div className="flex flex-row mb-6">
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-xl bg-primary p-3 lg:p-4 h-[max-content] jutify-center mr-4">
                            <Image
                                src="/images/mail-white.svg"
                                alt="Hero blue circle"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content] w-[15px] lg:w-[36px] lg:h-[36px]"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-xl text-white font-bold">Email:</h5>
                            <Link href='mailto:contact@consultify.ro' className="text-lg md:text:xl text-white font-bold hover:text-primary transition-all">contact@consultify.ro</Link>
                        </div>
                    </div>
                    <div className="flex flex-row mb-6">
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-xl bg-primary p-3 lg:p-4 h-[max-content] jutify-center mr-4">
                            <Image
                                src="/images/phone.svg" 
                                alt="Hero blue circle"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content] w-[15px] lg:w-[36px] lg:h-[36px]"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            {/* <h5 className="text-xl text-white font-bold">Telefon:</h5> */}
                            <span className="text-lg md:text-xl text-white font-bold hover:text-primary transition-all"><Link href='tel:0773395400'>(0773) 395 400 (Vânzări)</Link></span>
                            <span className="text-lg md:text-xl text-white font-bold hover:text-primary transition-all"><Link href='tel:0727153317'>(0727) 153 317 (Secretariat)</Link></span>
                        </div>
                    </div>
                    <h6 className="text-xl text-white mb-4 font-bold text-center">Sau ne poți găsi și aici:</h6>
                    <div className="flex flex-row w-full justify-center">
                        <Link href='https://www.instagram.com/consultify.ro?igshid=MzMyNGUyNmU2YQ%3D%3D' target="_blank" className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-full bg-[#fff] p-5 lg:p-4 h-[max-content] jutify-center mr-2 hover:scale-105 transition-all">
                            <Image
                                src="/images/contact/instagram.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]"
                            />
                        </Link>
                        <Link href='https://www.facebook.com/consultify.ro' target="_blank" className="w-[-webkit-fill-available] max-w-[fit-content] ml-2 flex items-center rounded-full bg-[#fff] p-5 lg:p-4 h-[max-content] jutify-center mr-2 hover:scale-105 transition-all">
                            <Image
                                src="/images/contact/facebook.svg"
                                alt="facebook"
                                width={60}
                                height={60}
                                className="z-[5] w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]"
                            />
                        </Link>
                        <Link href='https://www.tiktok.com/@consultify.ro?_t=8oJfgBL3I01&_r=1' target="_blank" className="w-[-webkit-fill-available] max-w-[fit-content] ml-2 flex items-center rounded-full bg-[#fff] p-5 lg:p-4 h-[max-content] jutify-center mr-2 hover:scale-105 transition-all">
                            <Image
                                src="/images/contact/tiktok.svg"
                                alt="tiktok"
                                width={60}
                                height={60}
                                className="z-[5] w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]"
                            />
                        </Link>
                    </div>
                </div>
                <form 
                    className="mt-12 lg:mt-0 lg:ml-12 rounded-3xl shadow-box bg-[#fff] w-full max-w-[1000px] p-8 px-4 md:px-8 flex flex-col"
                    onSubmit={upload}
                >
                    <h2 className="text-xl font-bold mb-10 md:text-2xl text-center">Hai să lucrăm împreună!</h2>
                    <div className="flex w-full flex-col items-center md:flex-row justify-between mb-6">
                        <div className="flex flex-col w-full">
                            <span className="text-md mb-2 font-semibold">
                                Nume și prenume*
                            </span>
                            <input
                                required 
                                type="text"
                                name="Nume"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                                placeholder="ex: Popescu Andrei"
                                onChange={(e) => setNume(e.target.value)}
                                value={nume}
                            />
                        </div>
                        {/* <div className="flex flex-col w-full md:w-[47%]">
                            <span className="text-md mb-2 font-semibold">
                                Prenume*
                            </span>
                            <input
                                required 
                                type="text"
                                name="Prenume"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                                placeholder="ex: Andrei"
                                onChange={(e) => setPrenume(e.target.value)}
                                value={prenume}
                            />
                        </div> */}
                    </div>
                    <div className="flex w-full flex-col items-center justify-between mb-6">
                        <div className="flex flex-col w-full md:mr-2">
                            <span className="text-md mb-2 font-semibold">
                                Telefon*
                            </span>
                            <PhoneInput
                                defaultCountry="ro"
                                value={telefon}
                                name="Telefon"
                                required
                                onChange={(phone) => setTelefon(phone)}
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 mb-6 outline-none"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <span className="text-md mb-2 font-semibold">
                                Email*
                            </span>
                            <input
                                required 
                                type="email"
                                name="Email"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                                placeholder="ex: exemplu@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center md:flex-row justify-between mb-6 outline-none">
                        <div className="flex flex-col w-full md:w-[47%] md:mr-2 mb-6 md:mb-0">
                            <span className="text-md mb-2 font-semibold">
                                Nume firmă (opțional)
                            </span>
                            <input
                                type="text"
                                name="Nume Firma"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                                placeholder="Nume firmă"
                                onChange={(e) => setFirma(e.target.value)}
                                value={firma}
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-[47%] md:mr-2">
                            <span className="text-md mb-2 font-semibold">
                                CUI (opțional)
                            </span>
                            <input
                                type="text"
                                name="CUI"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                                placeholder="CUI"
                                onChange={(e) => setCui(e.target.value)}
                                value={cui}
                            />
                        </div>
                    </div>
                    <input className="hidden" type="text" name="Categorie" value={nevoie} onChange={() => {}} />
                    <div className="flex flex-col w-full">
                            <span className="text-md mb-2 font-semibold">
                                De ce anume ai nevoie?
                            </span>
                            <select 
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 h-[60px] px-[14px] p-2 outline-none" 
                                name="categorie"
                                onChange={(e) => setNevoie(e.target.value)}
                                value={nevoie}
                            >
                                <option value="Selectează aici" className="hidden">Selectează aici</option>
                                <option value="Consultanță Fonduri Europene">Consultanță în Accesarea Fondurilor Europene</option>
                                <option value="Implementare proiect">Implementare proiect câștigat</option>
                                <option value="Colaborări & Angajări">Colaborări & Angajări</option>
                            </select>
                        </div>
                    <div className="flex flex-col w-full my-6">
                        <span className="text-md mb-2 font-semibold">
                            Oferă-ne câteva detalii*
                        </span>
                        <textarea
                            className="rounded-xl w-full bg-[#fff] h-48 border-[#8717F8] text-ms border-2 p-[14px] outline-none" 
                            placeholder="Scrie aici mesajul tău"
                            required
                            name="Detalii"
                            onChange={(e) => setMesaj(e.target.value)}
                            value={mesaj}
                        ></textarea>
                    </div>
                    <div className="flex items-center self-start justify-center mb-6 ml-1">
                        <input 
                            checked={isChecked} onChange={(e) => setIsChecked(!isChecked) }
                            id="link-checkbox" type="checkbox" className="w-4 min-w-[16px] cursor-pointer h-4 text-[#260056] rounded border-[2px] bg-[#F2F4FF] border-[#8717F8] outline-none" />
                        <label htmlFor="link-checkbox" className="ml-2 text-md font-bold text-[#260056]">Accept <Link href="/termeni" target="_blank" className="text-[#260056] underline">Termenii și Condițiile.</Link></label>
                    </div>
                    <div className="flex self-start justify-center mb-6 ml-1">
                        <input 
                            checked={newsletter} onChange={(e) => setNewsletter(!newsletter) }
                            id="checkbox-newsletter" type="checkbox" className="w-4 min-w-[16px] cursor-pointer h-4 text-[#260056] rounded border-[2px] bg-[#F2F4FF] border-[#8717F8] outline-none" />
                        <label htmlFor="checkbox-newsletter" className="ml-2 -mt-[3px] text-md font-bold text-[#260056]">Aboneaza-te la newsletter-ul nostru pentru a primi cele mai bune oferte!</label>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center w-full items-center">
                        <ReCAPTCHA
                            sitekey="6LdWV_AoAAAAAMMdYLnmy_NUtbetbPGYWHOOhery"
                            onChange={(e) => setCaptchaVerified(!captchaVerified)}
                        />
                        { isLoading ? 
                            <div className='w-full flex items-center justify-center px-16 mt-4 md:mt-0'>
                                <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
                            </div> :
                            <button                      
                                className='py-3 md:py-4 mt-4 md:mt-0 md:ml-4 bg-[#8717F8] h-fit text-white rounded-[28px] font-semibold px-14 text-center text-md md:text-[16px] hover:scale-[1.05] transition-all'
                                type="submit"
                            >
                                Trimite!
                            </button>
                        }
                    </div>
                </form>
            </section>
            <Rezultate contact={false} />
            <section id='why-us' className='mt-24 md:mt-48 w-full relative px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
                <h2 className='text-[#260056] text-center font-bold md:text-base text-xl lg:text-2xl xl:text-4xl mb-12 lg:mb-32'>De ce să alegi Consultify?</h2>
                <div className='relative flex flex-wrap w-full lg:mt-10 justify-center items-center md:justify-between md:items-start gap-y-20'>
                    {/* Left-Side */}
                    <div className='mx-auto lg:mx-0 w-full z-[2] lg:w-[49%] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-8'>
                    <WhyUsItem1 
                            src="/images/questions-comment.svg"
                            text="Comunicare excelentă! Răspuns rapid și soluții eficiente pentru succesul proiectelor tale."
                            title="Comunicare"
                            textColor="[#260056]"
                        />
                        <WhyUsItem1 
                            src="/images/flash.svg"
                            text="Echipă tânără, inovatoare și dinamică, aducând idei proaspete și abordări moderne."
                            title="Spirit tânăr"
                            textColor="[#260056]"
                        />
                        <WhyUsItem1 
                            src="/images/person.svg"
                            text="Oferim o abordare individuală pentru a ne asigura că satisfacem nevoile și obiectivele fiecărui client."
                            title="Abordare individuală"
                            textColor="[#260056]"
                        />
                        <WhyUsItem1 
                            src="/images/chart.svg"
                            text="Profesionalismul nostru este evidențiat de abordarea noastră meticuloasă și atenția la detalii în fiecare proiect."
                            title="Profesionalism"
                            textColor="[#260056]"
                        />
                    </div>
                    {/* Right-Side */}
                    <div className='relative mx-auto lg:mx-0'>
                        <Image src='/images/contact/pag - contact - structura calitati.png' alt='Why-Us' className='relative rounded-[35px] z-[2] w-[400px]' width={350} height={400} placeholder='blur' blurDataURL='/images/About/Pag - despre noi - structura misiunea noastra.png' />
                        <Image src='/images/About/triangle.svg' alt='triangle' width={164} height={164} className='z-[1] absolute -top-12 -left-16' /> 
                    </div>
                </div>
                <Link href='#' className="bg-[#8717F8] mt-12 flex font-semibold items-center justify-center w-[max-content] mx-auto justify-self-center px-16 py-3 md:py-4 text-white rounded-[28.5px] hover:scale-[1.05] transition-all">
                    Vreau să completez!
                </Link>
            </section>
            <div className="h-16"></div>
            <NewsLetter headingText={'Fii la curent cu cele mai recente informații despre fonduri europene!'} />
        </>
    )
}
