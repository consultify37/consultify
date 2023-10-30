import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsLetter from "../../components/global/newsletter";
import Head from "next/head";
import toast from "react-hot-toast";
import Axios from "axios";
import Rezultate from "../../components/Rezultate";
 
export default function Contact() {
  
    const [nume, setNume] = useState('')
    const [prenume, setPrenume] = useState('')
    const [telefon, setTelefon] = useState('')
    const [email, setEmail] = useState('')
    const [mesaj, setMesaj] = useState('')

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const upload = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        Axios.get('https://api.inspiredconsulting.ro/contact', {
            params: {
                nume: nume,
                prenume: prenume,
                telefon: telefon,
                email: email,
                mesaj: mesaj
            },
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data == 'Toate campurile sunt obligatorii') {toast.error(response.data)}
            else if (response.data == 'Introduce-ti o adresa de email valida') {toast.error(response.data)}
            else {
                toast.success(
                    <p>Îți mulțumim pentru mesaj! <br /> Echipa noastră îți va răspunde curând</p>
                )
                setTimeout(() => {
                    location.reload();
                }, 5000);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    };
  
    const recaptchaRef = React.createRef();
    return (
        <>
            <Head>
                <title>Admin | Contact</title>
            </Head>
            <section
                id="about-header"
                className="relative bg-[#260056] mb-60 w-full pt-48 pb-14 flex flex-col items-center justify-center overflow-visible"
            >
                <h1 className="text-xl md:text-4xl font-bold text-white md:max-w-[50%] text-center pt-20 lg:pt-0">
                    Suntem aici pentru tine!
                </h1>
                <span className="bg-[#260056] rounded-[0_0_200px_250px] w-[115vw] md:w-[103vw] -rotate-2 absolute -left-5 -bottom-20 h-32" />
                <Image
                    src="/images/star.svg"
                    alt="Hero blue circle"
                    width={100}
                    height={200}
                    className="absolute right-0 top-0 z-[5] w-[80px] md:w-[120px]"
                />
                <Image
                    src="/images/circle-contact.svg"
                    width={130}
                    height={130}
                    className="absolute top-0 left-24 md:bottom-0 w-[100px] md:w-[180px]"
                    alt="Yellow triangle"
                />
            </section>
            <div className="bg-[#F6EFFF] w-[100vw] h-[80vh] absolute top-0 left-0 z-[-1]"></div>
            <section className="w-full flex flex-col lg:flex-row items-start my-32 justify-between px-4 md:px-[80px] xl:px-[140px] 2xl:px-[276px]">
                <div className="flex flex-col w-full mr-12 bg-[#260056] rounded-3xl p-8">
                    <div className="flex flex-row mb-6">
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-xl bg-[#A634FF] p-3 lg:p-4 h-[max-content] jutify-center mr-4">
                            <Image
                                src="/images/mail-white.svg"
                                alt="Hero blue circle"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content] w-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-xl text-white">Email:</h5>
                            <Link href='mailto:fsafsa@fsa.com' className="text-lg text-white">contact@consultify.ro</Link>
                        </div>
                    </div>
                    <div className="flex flex-row mb-6">
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-xl bg-[#A634FF] p-3 lg:p-4 h-[max-content] jutify-center mr-4">
                            <Image
                                src="/images/phone.svg" 
                                alt="Hero blue circle"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content] w-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-xl text-white">Telefon:</h5>
                            <span className="text-lg text-white"><Link href='tel:6789'>0727 153 317</Link></span>
                        </div>
                    </div>
                    <h6 className="text-xl text-white mb-4">Sau ne poți găsi și aici:</h6>
                    <div className="flex flex-row">
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] flex items-center rounded-full bg-[#fff] p-3 lg:p-4 h-[max-content] jutify-center mr-2">
                            <Image
                                src="/images/contact/instagram.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                                className="z-[5] h-[max-content w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </div>
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] ml-2 flex items-center rounded-full bg-[#fff] p-3 lg:p-4 h-[max-content] jutify-center mr-2">
                            <Image
                                src="/images/contact/facebook.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                                className="z-[5] w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </div>
                        <div className="w-[-webkit-fill-available] max-w-[fit-content] ml-2 flex items-center rounded-full bg-[#fff] p-3 lg:p-4 h-[max-content] jutify-center mr-2">
                            <Image
                                src="/images/contact/linkedin.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                                className="z-[5] w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]"
                            />
                        </div>
                    </div>
                </div>
                <form 
                    className="mt-12 lg:mt-0 lg:ml-12 rounded-3xl shadow-box bg-[#fff] w-full max-w-[1000px] p-8 px-4 md:px-8 flex flex-col"
                    method="POST"
                    action="https://script.google.com/macros/s/AKfycbyOaR1qjdOFCOfS4U9OvdvIOoPa4cF9x_8bVvWofPDfZjTWsSZITlFZ495b-zK-XBJpqA/exec"
                >
                    <h2 className="text-ms font-bold mb-10 md:text-2xl text-center">Hai să lucrăm împreună!</h2>
                    <div className="flex w-full flex-col items-center md:flex-row justify-between mb-6">
                        <div className="flex flex-col w-full md:w-[47%] mr-2">
                            <span className="text-md mb-2">
                                Nume*
                            </span>
                            <input
                                required 
                                type="text"
                                name="Nume"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 outline-none" 
                                placeholder="ex: Popescu"
                                onChange={(e) => setNume(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-[47%]">
                            <span className="text-md mb-2">
                                Prenume*
                            </span>
                            <input
                                required 
                                type="text"
                                name="Prenume"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 outline-none" 
                                placeholder="ex: Andrei"
                                onChange={(e) => setPrenume(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-between mb-6">
                        <div className="flex flex-col w-full mr-2">
                            <span className="text-md mb-2">
                                Telefon
                            </span>
                            <input
                                required 
                                type="tel"
                                name="Telefon"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 mb-6 outline-none" 
                                placeholder="ex: 07XX XXX XXX"
                                onChange={(e) => setTelefon(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <span className="text-md mb-2">
                                Email
                            </span>
                            <input
                                required 
                                type="email"
                                name="Email"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 outline-none" 
                                placeholder="ex: exemplu@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center md:flex-row justify-between mb-6 outline-none">
                        <div className="flex flex-col w-full md:w-[47%] mr-2">
                            <span className="text-md mb-2">
                                Nume firmă (opțional)
                            </span>
                            <input
                                type="string"
                                name="Nume firma"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 outline-none" 
                                placeholder="Nume firmă"
                                onChange={(e) => setTelefon(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-[47%] mr-2">
                            <span className="text-md mb-2">
                                CUI (opțional)
                            </span>
                            <input
                                type="string"
                                name="CUI"
                                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-2 outline-none" 
                                placeholder="Nume firmă"
                                onChange={(e) => setTelefon(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                            <span className="text-md mb-2">
                                De ce anume ai nevoie?
                            </span>
                            <select className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 h-[44px] p-2 py-2 outline-none" name="categorie">
                                <option value="Selectează aici" className="hidden">Selectează aici</option>
                                <option value="fonduri-europene">Consultanță Fonduri Europene</option>
                                <option value="marketing">Implementare proiect</option>
                                <option value="marketing">Colaborări & Angajări</option>
                            </select>
                        </div>
                    <div className="flex flex-col w-full my-6">
                        <span className="text-md mb-2">
                            Oferă-ne câteva detalii*
                        </span>
                        <textarea
                            className="rounded-xl w-full bg-[#fff] h-48 border-[#8717F8] text-ms border-2 p-2 outline-none" 
                            placeholder="Scrie aici mesajul tău"
                            required
                            name="Detalii"
                            onChange={(e) => setMesaj(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center mb-6 self-start ml-1">
                        <input 
                            checked={isChecked} onChange={handleChange}
                            required id="link-checkbox" type="checkbox" value="" className="w-4 cursor-pointer h-4 text-[#260056] rounded border-[2px] bg-[#F2F4FF] border-[#8717F8] outline-none" />
                        <label htmlFor="link-checkbox" className="ml-2 text-md font-medium text-[#260056]">Accept <a href="#" className="text-[#260056] underline">Termenii și Condițiile.</a></label>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center w-full">
                        <button                      
                            className='py-3 md:py-4 bg-[#8717F8] h-auto text-white rounded-[28px] font-semibold px-14 text-center text-md md:text-[16px] hover:scale-[1.05] transition-all'
                            type="submit"
                        >
                            Trimite
                        </button>
                    </div>
                </form>
            </section>
            <Rezultate />
            <section id='why-us' className='mt-[10.25rem] w-full relative px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]'>
                <h2 className='text-[#260056] text-center font-bold md:text-base text-xl lg:text-2xl xl:text-4xl mb-12 lg:mb-32'>De ce să alegi Consultify?</h2>
                <div className='relative flex flex-wrap justify-center items-center md:justify-between md:items-start gap-y-20'>
                    {/* Left-Side */}
                    <div className='mx-auto lg:mx-0 w-full z-[2] md:w-[49%] grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <span className='h-[51px] w-[51px] flex items-center bg-[#A634FF] rounded-md'>
                                <Image src='/images/questions-comment.png' className='mx-auto' alt='Questions comment' width={25} height={10} />
                            </span>
                            <h3 className='font-bold text-[24px] text-[#260056]'>Comunicare</h3>
                            <p className='font-normal text-[#260056] text-md md:text-[16px'>
                                Mauris tristique pulvinar massa, ut hendrerit enim pretium nec. Fusce sed dolor est. 
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='h-[51px] w-[51px] flex items-center bg-[#A634FF] rounded-md'>
                                <Image src='/images/flash.png' className='mx-auto' alt='Questions comment' width={17} height={10} />
                            </span>
                            <h3 className='font-bold text-[24px] text-[#260056]'>Spirit tânăr</h3>
                            <p className='font-normal text-[#260056] text-md md:text-[16px'>
                                Mauris tristique pulvinar massa, ut hendrerit enim pretium nec. Fusce sed dolor est. 
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='h-[51px] w-[51px] flex items-center bg-[#A634FF] rounded-md'>
                                <Image src='/images/heart.png' className='mx-auto' alt='Questions comment' width={25} height={24} />
                            </span>
                            <h3 className='font-bold text-[24px] text-[#260056]'>Suport non-stop</h3>
                            <p className='font-normal text-[#260056] text-md md:text-[16px'>
                                Mauris tristique pulvinar massa, ut hendrerit enim pretium nec. Fusce sed dolor est. 
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='h-[51px] w-[51px] flex items-center bg-[#A634FF] rounded-md'>
                                <Image src='/images/chart.png' className='mx-auto' alt='Questions comment' width={21} height={21} />
                            </span>
                            <h3 className='font-bold text-[24px] text-[#260056]'>Profesionalism</h3>
                            <p className='font-normal text-[#260056] text-md md:text-[16px]'>
                                Mauris tristique pulvinar massa, ut hendrerit enim pretium nec. Fusce sed dolor est. 
                            </p>
                        </div>
                    </div>
                    {/* Right-Side */}
                    <div className='relative mx-auto lg:mx-0'>
                        <Image src='/images/About/about.png' alt='Why-Us' className='relative rounded-[35px] z-[2] w-[400px]' width={350} height={400} placeholder='blur' blurDataURL='/images/home-about-1.png' />
                        <Image src='/images/About/triangle.svg' alt='triangle' width={164} height={164} className='z-[1] absolute -top-12 -left-16' /> 
                    </div>
                </div>
                <Link href='/contact' className="bg-[#8717F8] mt-12 flex font-semibold items-center justify-center w-[max-content] mx-auto justify-self-center px-12 py-3 text-white rounded-[28.5px] hover:scale-[1.05] transition-all">
                    Vreau să completez
                </Link>
            </section>
            <NewsLetter headingText={'Alătură-te comunității noastre și fii la curent cu cele mai noi oportunități de finanțare!'} />
        </>
    );
}