import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import Head from 'next/head'

const counties = [
  { code: 'noJudet', name: 'Alege județul' },
  { code: 'RO-B', name: 'București - Generic' },
  { code: 'RO-B-Sector1', name: 'București - Sector 1' },
  { code: 'RO-B-Sector2', name: 'București - Sector 2' },
  { code: 'RO-B-Sector3', name: 'București - Sector 3' },
  { code: 'RO-B-Sector4', name: 'București - Sector 4' },
  { code: 'RO-B-Sector5', name: 'București - Sector 5' },
  { code: 'RO-B-Sector6', name: 'București - Sector 6' },
  { code: 'RO-AB', name: 'Alba' },
  { code: 'RO-AR', name: 'Arad' },
  { code: 'RO-AG', name: 'Argeș' },
  { code: 'RO-BC', name: 'Bacău' },
  { code: 'RO-BH', name: 'Bihor' },
  { code: 'RO-BN', name: 'Bistrița Năsăud'},
  { code: 'RO-BT', name: 'Botoșani'},
  { code: 'RO-BV', name: 'Brașov'},
  { code: 'RO-BR', name: 'Brăila' },
  { code: 'RO-BZ', name: 'Buzău' },
  { code: 'RO-CS', name: 'Caraș Severin'},
  { code: 'RO-CL', name: 'Călărași' },
  { code: 'RO-CJ', name: 'Cluj' },
  { code: 'RO-CT', name: 'Constanța'},
  { code: 'RO-CV', name: 'Covasna'},
  { code: 'RO-DB', name: 'Dâmbovița'},
  { code: 'RO-DJ', name: 'Dolj' },
  { code: 'RO-GL', name: 'Galați' },
  { code: 'RO-GR', name: 'Giurgiu' },
  { code: 'RO-GJ', name: 'Gorj' },
  { code: 'RO-HG', name: 'Harghita' },
  { code: 'RO-HD', name: 'Hunedoara' },
  { code: 'RO-IL', name: 'Ialomița' },
  { code: 'RO-IS', name: 'Iași' },
  { code: 'RO-IF', name: 'Ilfov' },
  { code: 'RO-MM', name: 'Maramureș' },
  { code: 'RO-MH', name: 'Mehedinți' },
  { code: 'RO-MS', name: 'Mureș' },
  { code: 'RO-NT', name: 'Neamț' },
  { code: 'RO-OT', name: 'Olt' },
  { code: 'RO-PH', name: 'Prahova' },
  { code: 'RO-SM', name: 'Satu Mare' },
  { code: 'RO-SJ', name: 'Sălaj' },
  { code: 'RO-SB', name: 'Sibiu' },
  { code: 'RO-SV', name: 'Suceava' },
  { code: 'RO-TR', name: 'Teleorman' },
  { code: 'RO-TM', name: 'Timișoara' },
  { code: 'RO-TL', name: 'Tulcea' },
  { code: 'RO-VS', name: 'Vaslui' },
  { code: 'RO-VL', name: 'Vâlccea' },
  { code: 'RO-VR', name: 'Vrancea' }
]

const Form = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [nume, setNume] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [cui, setCui] = useState('')
  const [firma, setFirma] = useState('')
  const [judet, setJudet] = useState('')
  const [referrer, setReferrer] = useState('')
  const [referrerUrl, setReferrerUrl] = useState('')
  const [leadSource, setLeadSource] = useState('7079')

  useEffect(() => {
    setReferrerUrl(document.referrer)
    
    if (document.referrer.includes('facebook')) {
      setLeadSource('7002')
      setReferrer('facebook')
    } else if (document.referrer.includes('tiktok')) {
      setLeadSource('7004')
      setReferrer('tiktok')
    } else if ( document.referrer.includes('instagram')) {
      setLeadSource('7003')
      setReferrer('instagram')
    } else if ( document.referrer.includes('youtube')) {
      setReferrer('youtube')
    } else if ( document.referrer.includes('google')) {
      setLeadSource('7073')
      setReferrer('google')
    } else if ( document.referrer.includes('whatsapp')) {
      setLeadSource('7005')
      setReferrer('whatsapp')
    } else if ( document.referrer.includes('mail.google.com') || document.referrer.includes('mail.yahoo.com')) {
      setLeadSource('7075')
      setReferrer('email')
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const colRef = collection(db, 'contactForms')

      await addDoc(colRef, {
        nume, 
        prenume: '', 
        firma, 
        cui, 
        telefon, 
        email, 
        subscribe: false, 
        nevoie: 'Consultanță Fonduri Europene', 
        mesaj, 
        website: process.env.SITE, 
        createdAt: serverTimestamp(),
        referrer,
        referrerUrl,
        leadSource: 'web form'
      })

      router.push('/thank-you-organic')
    } catch (e) {
      toast.error('Ceva nu a mers bine. Încearcă din nou!')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="flex flex-row justify-center lg:justify-start items-strech h-full">
      <Head>
        <title>{`${process.env.SITE} | Formular`}</title>
      </Head>
      <script async src="https://r3.minicrm.io/api/minicrm.js?t=1736945255"></script>
      <form 
        onSubmit={onSubmit}
        className="w-full md:w-[768px] md:min-w-[768px] max-w-[768px] p-6 py-16 sm:p-8 md:p-16 flex flex-col"
        formhash="76959-0tmoj4ber60eocon8xd011vdct8xlk" action="https://r3.minicrm.io/Api/Signup" method="post" id="Web"
      >
          <h2 className="text-secondary font-bold mb-6 text-2xl md:text-3xl">Hai să lucrăm împreună!</h2>
          <p className="text-secondary text-[14px] md:text-[16px] mb-6">
            ℹ️ Un consilier te va contacta pentru a discuta ce oportunități de finanțare sunt disponbile pentru tine. Te vom programa la o întâlnire/discuție online sau față în față în care vom analiza documentele și investiția pe care o dorești. Dacă există un program de finanțare și ești eligibil, vom începe colaborarea pentru crearea și depunerea Proiectului de finanțare potrivit.
          </p>
          <div className="flex w-full flex-col items-center md:flex-row justify-between mb-6">
              <div className="flex flex-col w-full">
                  <span className="text-secondary mb-2 font-semibold">
                      Nume și prenume*
                  </span>
                  <input
                      required 
                      value={nume}
                      onChange={(e) => setNume(e.target.value)}
                      type="text"
                      // name="Nume"
                      className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                      placeholder="ex: Popescu Andrei"
                      data-field="FirstName" data-table="Contact" data-type="Person" name="Contact[3237][FirstName]" id="Contact_FirstName_3237"
                  />
              </div>
          </div>
          <div className="flex flex-col w-full mb-6">
              <span className="text-secondary mb-2 font-semibold">
                Descrie-ne pe scurt activitatea ta și ce ai vrea să realizezi cu fondurile:*
              </span>
              <textarea
                  value={mesaj}
                  onChange={(e) => setMesaj(e.target.value)}
                  className="rounded-xl w-full bg-[#fff] h-48 border-[#8717F8] text-ms border-2 p-[14px] outline-none" 
                  placeholder="Scrie aici mesajul tău"
                  required
                  // name="Detalii"
                  data-field="DescriereProiect" data-table="Project" data-type name="Project[3235][DescriereProiect]" id="Project_DescriereProiect_3235"
              ></textarea>
          </div>
          <div className="flex w-full flex-col items-center justify-between mb-6">
              <div className="flex flex-col w-full md:mr-2">
                  <span className="text-secondary mb-2 font-semibold">
                      Telefon*
                  </span>
                  {/* <PhoneInput
                      defaultCountry="ro"
                      value={telefon}
                      name="Telefon"
                      required
                      onChange={(phone) => setTelefon(phone)}
                      className="rounded-xl w-full border-primary text-ms leading-6 border-2 p-2 mb-6 outline-none"
                  /> */}
                  <input
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      type="tel"
                      placeholder="ex: 0700000000"
                      // name="Telefon"
                      className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                      data-field="Phone" data-table="Contact" data-type="Person" name="Contact[3237][Phone]" id="Contact_Phone_3237"
                  />
              </div>
              <div className="flex flex-col w-full mt-6">
                  <span className="text-secondary mb-2 font-semibold">
                      Email*
                  </span>
                  <input
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      // name="Email"
                      className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                      placeholder="ex: exemplu@email.com"
                      data-field="Email" data-table="Contact" data-type="Person" name="Contact[3237][Email]" id="Contact_Email_3237"
                  />
              </div>

              {/* <div className="flex flex-col w-full mt-6">
                <span className="text-secondary mb-2 font-semibold">
                    Județ / Sector (opțional)
                </span>
                <select 
                  className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 h-[60px] px-[14px] p-2 outline-none" 
                  name="judet"
                  onChange={(e) => setJudet(e.target.value)}
                  value={judet}
                >
                  { counties.map((item) => (
                    <option value={item.name} key={item.code}>{item.name}</option>
                  ))}
                </select>
            </div> */}
          </div>
          <div className="flex flex-col w-full mb-6">
            <span className="text-secondary mb-2 font-semibold">
                Nume firmă (opțional, dacă este deja înregistrată)
            </span>
            <input
                type="text"
                // name="Nume Firma"
                value={firma}
                onChange={(e) => setFirma(e.target.value)}
                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                placeholder="Nume firmă"
                data-field="Name" data-table="Contact" data-type="Business" name="Contact[3236][Name]" id="Contact_Name_3236"
            />
        </div>
        <div className="flex flex-col w-full mb-8">
            <span className="text-secondary mb-2 font-semibold">
                CUI (opțional)
            </span>
            <input
                type="text"
                // name="CUI"
                value={cui}
                onChange={(e) => setCui(e.target.value)}
                className="rounded-xl w-full border-[#8717F8] text-ms leading-6 border-2 p-[14px] outline-none" 
                placeholder="CUI"
                data-field="VatNumber" data-table="Contact" data-type="Business" name="Contact[3236][VatNumber]" id="Contact_VatNumber_3236"
            />
        </div>
        <select hidden data-field="Sursa2" data-table="Project" data-type name="Project[3235][Sursa2]" id="Project_Sursa2_3235" onChange={(e) => setLeadSource(e.target.value)} value={leadSource}>
          <option value="7072">
              Site Web
          </option>
          <option value="7073">
              Google Ads
          </option>
          <option value="7002">
              Facebook
          </option>
          <option value="7003">
              Instagram
          </option>
          <option value="7004">
              TikTok
          </option>
          <option value="7074">
              Telefon
          </option>
          <option value="7075">
              Email
          </option>
          <option value="7005">
              WhatsApp
          </option>
          <option value="7018">
              Recomandare
          </option>
          <option value="7019">
              Parteneri
          </option>
          <option value="7076">
              Cercetare Proprie Operator
          </option>
          <option value="7077">
              Relație Proprie Operator
          </option>
          <option value="7078">
              Baza de Date Rece
          </option>
          <option value="7079">
              Altă Variantă
          </option>
        </select>
        <p className="text-[12px] mb-4 text-secondary"> *Prin transmiterea acestui formular esti de acord cu <Link target="_blank" href="https://consultify.ro/termeni" className="underline">termenii și condițiile</Link> din site, precum și cu <Link target="_blank" className="underline" href="https://www.consultify.ro/politica-cookie">folosirea cookie-urilor</Link> și folosirea datelor tale personale conform <Link target="_blank" className="underline" href="https://www.consultify.ro/politica-confidentialitate">GDPR</Link> pentru a fi stocate, prelucrate și a fi contactat.</p>
        
        <div className='flex items-center justify-center w-full h-[56px]'>
          { !isLoading ?
            <button    
              type='submit'                  
              className='py-3 md:py-4 mt-4 md:mt-0 bg-[#8717F8] w-full h-fit text-white rounded-xl font-semibold px-14 text-center text-md md:text-[16px] hover:scale-[1.05] transition-all'
            >
                Trimite!
            </button> :
            <ReactLoading type="spin" color="#8717F8" width={32} height={32} />
          }
        </div>
      </form>

      <div className="shadow-box hidden lg:block">
        <div className="w-[calc(100vw-768px)] bg-[#260056] h-screen fixed">
          <div className="w-full h-full relative flex items-center justify-center">
            <Image
              src="/images/formular/logo.svg"
              width={360}
              height={360}
              className="w-[240px] xl:w-[360px] h-auto"
              alt='.'
            />
            <Image 
              src="/images/formular/circle.svg"
              width={220}
              height={220}
              className="absolute -top-8 left-0 w-[220px] h-auto"
              alt='.'
            />
            <Image 
              src="/images/formular/polygon.svg"
              width={140}
              height={140}
              className="absolute hidden xl:block top-32 right-24 w-[140px] h-auto"
              alt='.'
            />
            <Image 
              src="/images/formular/triangle.svg"
              width={120}
              height={120}
              className="absolute bottom-16 right-8 w-[120px] h-auto"
              alt='.'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form