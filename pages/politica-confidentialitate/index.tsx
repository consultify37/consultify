import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Confidentiality = () => {
  return (
    <>
      <Head>
        <title>{`${process.env.SITE} | Politică de confidențialitate`}</title>
      </Head>
      <div className='pt-36 md:pt-48 px-6 sm:px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] flex flex-col gap-4'>
        <h2 className='font-bold text-center text-xl mb-8'>Politica de confidențialitate a website-ului</h2>
        <p>
          Politica de confidențialitate vă informează despre informațiile pe care le colectăm de la
          dumneavoastră atunci când utilizați site-ul nostru. În colectarea acestor informații, noi
          acționăm în calitate de operator de date personale și, prin lege, suntem obligați să vă
          furnizăm informații despre noi, despre scopul și modul în care folosim datele dvs. și
          despre drepturile pe care le aveți asupra datelor dvs. personale.
        </p>
        <p>Politica și practicile noastre de protejare a datelor se focusează pe procesarea, schimbul
și stocarea corespunzătoare și legală a informațiilor cu caracter personal și totodată pe
asigurarea confidențialității, integrității și disponibilității.</p>
        <p>Prin urmare, prin lectura politicii de confidențialitate, veți afla toate drepturile
dumneavoastră și toate informațiile în legătură cu prelucrarea datelor personale. </p>
        <ul className='list-disc flex flex-col gap-2 ml-4'>
          <li>Procesarea datelor personale se va face într-o manieră legală, corectă și
transparentă;</li>
          <li>Colectarea datelor personale se va face numai în scopuri specificate, explicite și
legitime și datele nu vor fi procesate mai departe într-o manieră incompatibilă cu
acele scopuri;</li>
          <li>Colectarea datelor personale va fi adecvată, relevantă și limitată la informațiile
necesare scopului procesării;</li>
          <li>Datele personale vor fi reale și, acolo unde este necesar, actualizate;</li>
          <li>Se vor lua toate măsurile necesare pentru a se asigura că datele incorecte sunt
șterse sau corectate fără întârziere;</li>
          <li>Datele personale vor fi păstrate într-o formă ce permite identificarea persoanei
vizate și pentru o perioadă nu mai lungă decât cea în care datele personale sunt
procesate;</li>
          <li>Toate datele personale vor fi păstrate confidențial și stocate într-o manieră ce
asigură securitatea necesară;</li>
          <li>Datele personale nu vor fi distribuite persoanelor terțe decât în cazul în care este
necesar în scopul oferirii de servicii;</li>
          <li>Persoanele vizate au dreptul de a solicita accesul la datele personale, rectificarea
și ștergerea acestora, împotrivirea sau restricționarea de la procesarea datelor
atât cât și de la dreptul portabilității datelor.</li>
        </ul>
        <p>Date personale înseamnă <strong>orice informație care poate fi legată de o persoană fizică
identificată sau identificabilă</strong> (persoana subiect). Datele personale includ toate
tipurile de informații directe sau indirecte (și anume utilizate în legătură cu alte date) ce
se referă la persoana subiect, cum ar fi nume, data de naștere, adrese, adrese de e-mail,
numere de telefon, etc.</p>
        <h3 className='font-bold'>1. Cine suntem noi?</h3>
        <p>Denumire: MHC INSPERON S.R.L.</p>
        <p>Sediul social: Str. Lavandei, Nr.9, PARTER, Bloc P28, sc.3, ap. 33, Sector 6, Bucuresti</p>
        <p>Număr registrul comerțului: J40/6137/2020</p>
        <p>Cod unic identificare: RO42607998</p>
        <p>E-mail: contact@consultify.ro</p>
        <p>Telefon: +40727153317</p>
        <p>Detaliile de contact ale responsabilului nostru cu protecția datelor (DPO) sunt:</p>
        <p><strong>Mihalache Gabriel</strong>, adresă de e-mail: contact@consultify.ro</p>

        <h3 className='font-bold'>2. Cum folosim informațiile dvs.?</h3>
        <h3 className='font-bold'>2.1. Când folosiți site-ul nostru</h3>
        <p>Atunci când utilizați site-ul nostru pentru a căuta produsele și serviciile noastre și
pentru a vizualiza informațiile pe care le punem la dispoziție, un număr de cookie-uri
sunt utilizate de noi (cookies first party) și de terțe părți (cookies third party) pentru a
permite funcționarea site-ului, pentru a colecta informații utile despre vizitatori și
pentru a vă oferi o experiență cât mai bună în utilizarea site-ului nostru.</p>
        <h3 className='font-bold'>2.2 Ce sunt cookie-urile?</h3>
        <p>Cookie-urile sunt mici fișiere text care sunt plasate pe dispozitivul utilizatorului pentru
a urmări modul de utilizare și a înregistra preferințele. Cookie-urile noastre nu conțin
informații care pot indentifica persoane. Colectăm anumite informații automatizat prin
utilizarea cookie-urilor și tehnologiilor de urmărire cum ar fi adrese Internet Protocol
(IP), tip de browser, Furnizor Internet (Internet Service Provider – ISP), referințe/ieșiri
pagini, paginile vizualizate pe site-ul nostru (ex. pagini HTML, grafice), sistem operare,
data/ora și/sau seria de click-uri pentru a analiza trendul ca ansamblu și a administra
site-ul. Utilizatorii site-ului pot controla folosirea cookie-urilor la nivelul browserului, dar dacă utilizatorul decide să dezactiveze cookie-urile această acțiune va 
determina o limitare a anumitor caracteristici și funcții în website-ul și serviciile
noastre.</p>
        <p>Unele dintre cookie-urile pe care le folosim sunt strict necesare pentru ca site-ul nostru
să funcționeze și nu vă cerem consimțământul de a le introduce în calculatorul dvs. </p>
        <p>Cu toate acestea, pentru acele cookie-uri care sunt utile, dar nu strict necesare, vom cere
mereu consimțământul dvs. înainte de a le plasa.</p>
        <p>Pe lângă cookie-urile pe care le folosim, lucrând cu terțe părți pentru a vă oferi o
experiență oportună, acestea plasează diverse cookie-urile în calculatorul dvs., însă doar
cu consimțământul dvs. Acestea sunt arătate mai jos</p>
        <p>Pentru mai multe informații despre utilizarea cookie-urilor, consultați <Link href='/politica-cookie' className='underline text-blue-500'>politica noastră
privind cookie-urile.</Link></p>
        <h3>2.3. Când trimiteți o solicitare prin intermediul site-ului nostru</h3>
        <p>Cand comandati sau achizitionati un serviciu de pe site-ul nostru, va vom cere sa ne
furnizati informatii cu caracter personal, care pot include numele si prenumele, data
nasterii, sexul, adresa, detaliile documentului de identitate folosit (carte de identitate
sau pasaport), numarul de telefon, adresa de email, informatii cu privire la cartea de
credit si nationalitatea, detaliile pentru facturare, inclusiv CNP, o copie a cartii de
identitate a persoanei care plateste cu numerar/card prin POS-ul de la sediul nostru,
după caz.</p>
        <p>Cand ne scrieti, folosind formularele de pe site-ul nostru, va cerem sa ne furnizati datele
dvs. de contact: numele si prenumele, adresa de email, numarul de telefon.</p>
        <p>Utilizăm aceste informații pentru a răspunde cererii dvs., inclusiv furnizarea de
informații despre produsele și serviciile noastre. Putem să vă trimitem un e-mail de mai
multe ori după ce ați făcut o solicitare, pentru a ne asigura că am răspuns la întrebarea
dvs. și pentru a îmbunătăți experiența utilizatorilor noștri.</p>
        <p>Cand vizitati website-ul nostru, colectam automat anumite informatii, care includ,
dar nu se limiteaza la adresa dvs. IP, informatii cookie, mai exact data si ora la care ați
accesat serviciile noastre, hardware-ul, software-ul sau browser-ul pe care le folositi si
informatiile despre sistemul de operare al computerului dvs., cum ar fi setarile privind
limba si locatia de unde accesați serviciile noastre.</p>
        <p>Cand achizitionați un serviciu sau cereti o oferta de pe site-ul nostru, puteti face o
comandă și pentru alte persoane, ale caror detalii ni le furnizati ca parte a procesului
sau puteti achizitiona un serviciu in numele altcuiva. In aceste conditii, este
responsabilitatea dvs. sa va asigurati ca persoana ale carei date cu caracter personal leați furnizat este informata despre acest lucru si a inteles si a acceptat modul in care
folosim informatiile respective, conform descrierii din Politica de confidentialitate.</p>
        <h3 className='font-bold'>3. Ce facem cu datele personale?</h3>
        <h3 className='font-bold'>3.1. Furnizarea serviciilor noastre</h3>
        <p>In primul rand, folosim datele dvs. cu caracter personal pentru a va furniza serviciile pe
care le-ati comandat.</p>
        <h3 className='font-bold'>3.2. Comunicarea cu dvs.</h3>
        <p>Utilizam datele cu caracter personal pentru a va contacta in legatura cu serviciile pe
care le-ati achizitionat de la noi. Este posibil sa va contactam prin email, posta, telefon
sau prin mesaje text. Metoda depinde de informatiile de contact pe care ni le-ati
impartasit anterior si de metoda prin care ne-ati contactat.</p>
        <p>Motivele pentru care v-am putea contacta includ:</p>
        <ul className='list-decimal flex flex-col gap-2 ml-4'>
          <li>gestionarea serviciilor pe care le-ati achizitionat;</li>
          <li> confirmarea, din partea dvs., a detaliilor comezii dvs.;</li>
          <li>oferirea, in mod gratuit, a sfaturilor si recomandarilor nostre cu privire la
serviciilor achiziționate;</li>
          <li>raspunsul sau gestionarea oricaror cereri din partea dvs.;</li>
          <li>trimiterea, catre dvs., a unui chestionar sau invitatia de a ne oferi o recenzie a
experientei avute cu noi, in urma achizitionarii serviciilor noastre;</li>
          <li>trimiterea, catre dvs., a altor informatii sau materiale administrative, legate de
serviciile pe care le-ati achizitionat, cum ar fi alertele de securitate, cum sa ne
contactati in cazul in care aveți nevoie de asistenta si informatiile care
consideram ca v-ar putea fi utile;</li>
        </ul>
        <h3 className='font-bold'>Activitati de marketing</h3>
        <p>Utilizam datele cu caracter personal furnizate de dvs. pentru activitati de marketing,
care pot include:</p>
        <ul className='list-decimal flex flex-col gap-2 ml-4'>
          <li>utilizarea adresei dvs. de email, pentru a va trimite buletinul informativ
(Newsletter) cu privire la produsele si serviciile noastre;</li>
          <li>pe baza informatiilor suplimentare pe care alegeti sa ni le furnizati putem
include in Newsletter-urile noastre oferte personalizate, pentru a va permite sa
alegeti dintre cele mai bune oferte care v-ar putea interesa;</li>
          <li>daca participati la alte activitati promotionale pe care le desfasuram, vor fi
utilizate informatii relevante pentru administrarea acestor activitati;</li>
          <li>din cand in cand, este posibil sa va cerem sa participati la cercetari de marketing.
Cand sunteti invitat sa participati la astfel de cercetari, veti primi toate 
5
informatiile necesare pentru a intelege care sunt datele cu caracter personal
colectate si cum datele dvs. cu caracter personal sunt utilizate in continuare.</li>
          <li>grupul nostru de societati gestioneaza un numar de 4 website-uri, cu servicii
diferite, dar toate interconectate, sens in care este posibil sa primiti oferte de
marketing aferente tuturor produselor si serviciilor noastre</li>
          <li>puteti sa va dezabonati de la comunicarile de marketing prin email, in orice
moment, facand click pe link-ul Unsubscribe, inclus la finalul fiecarui email;</li>
        </ul>
        <h3 className='font-bold'>3.4. Scopuri juridice </h3>
        <p>În anumite situații putem fi nevoiți să dezvăluim date personale ca și răspuns la cererile
autorităților de supraveghere pentru a îndeplini cerințe legale. De asemenea vom
divulga informații personale daca este cerut de lege, de exemplu pentru a ne conforma
cu o citație sau alte procese legale, atunci când considerăm de bună-credință că
divulgarea datelor este necesară pentru a ne proteja drepturile, siguranța clienților sau
siguranța celorlalți, investigarea fraudelor sau ca răspuns la o cerere a autorităților
publice</p>
        <p>Este posibil sa utilizam datele dvs. pentru a ne respecta obligatiile legale impuse de
autorități, cum ar fi de exemplu, obligații privind păstrarea înregistrărilor, a
documentelor justiticative potrivit legii contabilității și altele. În această situație,
temeiul prelucrării este impus de interesul public. </p>
        <p>De asemenea, este posibil sa va utilizam datele, daca este necesar, cu scopul de a
respecta ordinele instantelor de judecata.</p>
        <h3 className='font-bold'>3.5. Securitatea sediului nostru</h3>
        <p>Folosim sisteme de supraveghere, pentru a asigura securitatea website-ului nostru, dar
si a sediului nostru fizic, in scopuri legate de siguranta persoanelor si securitatea
datelor. Sistemul de supraveghere reprezintă și un instrument de protectie a datelor și
este folosit pentru monitorizarea zonelor exterioare si interioare, acolo unde nu exista
asteptari rezonabile privind viata privata.</p>
        <h3 className='font-bold'>3.6. Interese legitime</h3>
        <p>Este posibil sa va folosim informatiile pentru interesele noastre legitime, pentru a va
putea oferi cel mai bun si adecvat continut al site-ul web, al email-urilor si buletinelor
informative, pentru a imbunatati si promova produsele si serviciile noastre si continutul
site-ului nostru web si pentru monitorizarea apelurilor, in scopuri administrative,
inclusiv pentru securitatea sediului nostru si in scopuri juridice, însă doar în baza
consimțământului acolo unde se impune. </p>
        <p>In cazul in care v-ati abonat la newsletter-ul nostru, aveti optiunea de a renunta la
primirea unor astfel de newsletter-uri atat in momentul achizitionarii serviciului sau 
facand click pe butonul ”unsubscribe”/dezabonare de la finalul fiecarui email, cat si
trimitandu-ne un e-mail cu textul ”Unsubscribe” la contact@consultify.ro.</p>
        <h3 className='font-bold'>3.7. Distribuirea si divulgarea informatiilor cu caracter personal</h3>
        <p>Ca regula, societatea noastra nu va furniza (prin vanzare sau inchiriere) catre terti
informatiile dvs. cu caracter personal. Cu toate acestea, societatea noastra va transmite
informatiile catre terti, cand acest lucru este necesar in scopul prelucrarii datelor, cum
ar fi urmatoarele cazuri:</p>
        <p className='font-bold'>Partenerii de afaceri</p>
        <p>Este posibil sa lucram cu parteneri de afaceri, care ofera servicii comercializate pe siteul nostru (servicii de asigurare, brokeraj sau alte servicii legate de cele contractate). In
momentul in care achizitionati un serviciu de la noi, anumite date cu caracter personal
necesare pentru furnizarea unor astfel de servicii, cum ar fi numele si adresa dvs. de
email, adresa de domiciliu, detaliile de plata si alte informatii relevante, pot fi transmise
partenerilor nostri de afaceri. Datele transmise partenerilor nostri de afaceri sunt
limitate la datele cu caracter personal necesare pentru furnizarea serviciului, conform
celor stabilite de partenerii de afaceri. </p>
        <p className='font-bold'>Autoritatile competente</p>
        <p>Este posibil sa divulgam date cu caracter personal institutiilor care aplica legea, in
masura in care acest lucru este solicitat prin lege sau este strict necesar pentru
prevenirea, depistarea sau urmarirea penala a infractiunilor si a fraudelor sau daca
suntem altfel obligati, prin lege, sa facem acest lucru. </p>
        <p className='font-bold'>Alte situatii</p>
        <p>In anumite situatii specifice, cand colectam datele dvs. cu caracter personal, este posibil
sa va cerem consimtamantul pentru transmiterea respectivelor date catre terti. In acest
caz, va vom informa cu privire la o astfel de prelucrare si nu vom efectua transmiterea
datelor inainte de a obtine consimtamantul dvs.</p>
        <h3 className='font-bold'>3.8. Persoanele imputernicite cu prelucrarea datelor personale</h3>
        <p>Pentru prelucrarea datelor cu caracter personal, putem utiliza persoane imputernicite
pentru prelucrarea datelor personale, precum furnizori de solutii IT necesare pentru
managementul afacerii, inclusiv solutii de contabilitate, furnizori de solutii de
management contractual sau organizatori de conferinte. Vom incheia acorduri pentru
prelucrarea datelor cu caracter personal cu toate persoanele imputernicite cu
prelucrarea datelor personale, care vor include clauze corespunzatoare, care sa ne
asigure ca acestea isi asuma obligatiile de a prelucra datele cu caracter personal 
(inclusiv obligatia de a le sterge) in acord deplin cu legile aplicabile si ca ofera o
protectie adecvata datelor dvs. cu caracter personal. </p>
        <p>În interiorul organizației sunt luate măsuri adecvate pentru siguranța și accesul la
datele personale. </p>
        <h3 className='font-bold'>4. Durata stocarii</h3>
        <p>Am implementat masuri tehnice si organizatorice, pentru a organiza procesul si
criteriile prezentate pentru stergerea datelor dvs. cu caracter personal.</p>
        <p>Datele furnizate ar trebui păstrate nu mai mult decât este necesar. Datele personale vor
fi păstrate 3 ani de la ultima comandă, ulterior urmând a fi șterse. Dacă există
investigații care se derulează la momentul împlinirii termenului, aceste fișiere se vor
păstra atât timp cât se va considera necesar.</p>
        <p>Cu privire la datele prelucrate în scopuri de marketing și considerând faptul că subiecții
au dat un consimțământ valabil, datele pot fi prelucrate până când subiectul își va
retrage consimțământul.</p>
        <p>Facturile care conțin date personale se vor păstra 10 ani, potrivit legii, iar datele
personale mentionate in comenzi/contracte sunt pastrate atat cat prevede legea
contabilitatii si legislatia in materie de arhivare.</p>
        <p>Datele dvs. cu caracter personal vor fi sterse in momentul in care nu mai sunt necesare,
in mod rezonabil, scopurilor autorizate sau atunci cand va retrageti consimtamantul
(acolo unde este cazul). Cu toate acestea, vom retine datele dvs. cu caracter personal,
acolo unde este necesar ca noi sa sustinem sau sa va aparam pe dvs. sau alte persoane
impotriva oricaror revendicari legale, pana la sfarsitul perioadei relevante de pastrare
sau pana cand revendicarile in cauza au fost solutionate.</p>
        <p>Regulamentul prevede că datele vor fi prelucrate într-un mod care asigură securitatea
adecvată a datelor cu caracter personal, inclusiv protecția împotriva prelucrării
neautorizate sau ilegale și împotriva pierderii, a distrugerii sau a deteriorării
accidentale, prin luarea de măsuri tehnice sau organizatorice corespunzătoare. </p>
        <h3 className='font-bold'>5. Securitatea datelor cu caracter personal</h3>
        <p>Datele cu caracter personal sunt securizate impotriva amenintarilor si noi ne asiguram
ca acestea sunt protejate de o infrastructura IT si masuri de securitate corespunzatoare.
Mai mult decat atat, am implementat masuri interne, care ne permit sa descoperim, sa
notificam si sa documentam incalcarile de securitate, in cel mai scurt timp posibil.
8
Daca descoperim orice incalcare a datelor cu caracter personal, care prezinta un risc
pentru drepturile si libertatile dvs., vom informa Autoritatea Nationala de Supraveghere
a Prelucrarii Datelor cu Caracter Personal in termen de 72 ore. Veti fi informat cu
privire la incalcarea datelor dvs.. cu caracter personal, daca acest lucru duce la un risc
ridicat pentru drepturile si libertatile dvs.</p>
        <p className='font-bold'>6. Drepturile dvs. cu privire la prelucrarea datelor cu caracter personal</p>
        <p>Ne puteți întreba <strong>ce informații avem despre dumneavoastră și ne puteți cere să le
corectăm</strong> dacă sunt inexacte. Dacă v-am cerut consimțământul dvs. pentru a procesa
datele personale, <strong>puteți retrage acest consimțământ în orice moment.</strong></p>
        <p>Dacă prelucrăm datele dvs. personale pentru a îndeplini un contract sau în temeiul
consimțământului, <strong>puteți să ne cereți să vă oferim o copie a informațiilor într-un
format care să poată fi citit, astfel încât să îl puteți transfera altui furnizor.</strong></p>
        <p>Dacă prelucrăm datele dvs. personale pe bază de consimțământ sau de interes legitim,
<strong>puteți solicita ștergerea datelor dvs.</strong></p>
        <p>Aveți <strong>dreptul să ne cereți să nu mai folosim informațiile dvs. pentru o perioadă de
timp</strong> dacă credeți că nu facem acest lucru în mod legal.</p>
        <p>În cele din urmă, în anumite circumstanțe, <strong>puteți să ne cereți să nu luăm decizii care
să vă afecteze utilizându-vă prelucrarea automatizată sau profilarea.</strong></p>
        <p>Toate drepturile indicate se pot concluziona astfel: dreptul de acces la datele personale,
rectificarea sau ştergerea acestora, restricţionarea prelucrării sau a dreptului de a se
opune prelucrării, precum şi dreptul la portabilitatea datelor. Portabilitatea datelor
presupune posibilitatea dumneavoastră de a ne solicita să transferăm toate datele pe
care le deținem unei alte persoane indicate expres de către dumneavoastră.</p>
        <p>Pentru a trimite o solicitare privind datele dvs. personale prin e-mail, poștă sau telefon,
utilizați informațiile de contact furnizate mai sus în secțiunea Cine suntem noi din
această politică. Vom răspunde solicitărilor dumneavoastră în maxim 30 de zile de la
data solicitării. In cazul in care vom avea nevoie de mai multe informatii de la
dumneavoastra sau daca intampinam dificultati in solutionarea cererii, va vom informa
fara intarziere cu privire la faptul ca avem nevoie de mai mult timp pentru a efectua o
analiza corespunzatoare a cererii dvs.</p>
        <h3 className='font-bold'>7. Dreptul de a depune plângere</h3>
        <p>Dacă aveți o plângere cu privire la utilizarea de către noi a informațiilor dvs., am prefera
să ne contactați prima oară pe noi, pentru a putea remedia în mod amiabil cererea. Cu
toate acestea, puteți, de asemenea, să contactați Autoritatea Naţională de Supraveghere 
9
a Prelucrării Datelor cu Caracter Personal pentru Informații prin intermediul site-ului
lor la <Link href='http://www.dataprotection.ro/' className='underline text-blue-500'>http://www.dataprotection.ro/</Link> sau să le scrieți la adresa:</p>
        <p>B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București, Romania</p>
        <h3 className='font-bold'>8. Transferul datelor cu caracter personal către o țară terță </h3>
        <p>Țară terță înseamnă o țară situată în afara UE. Nu transferăm direct date cu caracter
personal într-un astfel de stat însă partenerii noștri (Google și Facebook) informează că
respectă prevederile regulamentului european și oferă astfel, un standard adecvat de
protecție a datelor. </p>
        <h3 className='font-bold'>9. Securitatea procesării</h3>
        <p>Vom procesa datele în mod sigur, vom aplica și menține măsuri tehnice adecvate pentru
a proteja datele personale împotriva distrugerii sau pierderii accidentale sau ilegale,
alterare, divulgare sau acces neautorizat, în mod special atunci când procesarea
presupune transmiterea datelor printr-o rețea atât cât și împotriva oricărei alte forme
de procesare ilegală. Întrebări legate de securitatea datelor personale pot fi trimise
către adresa de e-mail indicată mai sus.</p>
        <p>Eventuale e-mailuri de marketing pot fi trimise doar cu consimțământul
dumneavoastră expres. Această formă specifică de consimțământ trebuie dată în
mod liber, informată specific și precis. Aceste cereri sunt îndeplinite atunci când
ați optat să primiți e-mailuri de marketing (ați aprobat activ).</p>
        <p>Veți avea mereu dreptul de a obiecta, la cerere și fără costuri, la procesarea datelor cu
caracter personal în scopuri de marketing direct fără a trebui să furnizați justificări
concrete.</p>
        <p>E-mailurile de marketing conțin informații pe care le considerăm interesante pentru
dumneavoastră, atât cât și știri de ultimă oră legate de produsele și serviciile noastre.</p>
        <h3 className='font-bold'>10. Actualizări la această politică de confidențialitate</h3>
        <p>Revizuim regulat și, dacă este cazul, actualizăm periodic această politică de
confidențialitate atunci când intervin modificări în urma prestării de servicii. Dacă vrem
să folosim datele dvs. personale într-un mod pe care nu l-am identificat anterior, vă vom
contacta pentru a vă oferi informații despre acest lucru și, dacă este necesar, pentru a vă
solicita acordul.</p>
        <p>Vom actualiza numărul versiunii și data acestui document de fiecare dată când acesta
este modificat.</p>
        <p className='font-bold'>Politică aprobată în data de: 09/02/2024</p>
        <p className='font-bold'>Politica devine operațională din data de: 09/02/2024</p>
        <p>Politica și practicile noastre de protejare a datelor se focusează pe procesarea, schimbul
și stocarea corespunzătoare și legală a informațiilor cu caracter personal și totodată pe
asigurarea confidențialității, integrității și disponibilității.</p>
        <p>Website-ul nostru este în conformitate cu Regulamentul General de Protecție a Datelor
(“GDPR”), (Regulament (EU) 2016/679). </p>
        <p>Pentru orice întrebări suplimentare cu privire la modul în care datele cu caracter
personal sunt prelucrate, vă rugăm să vă adresați la: Telefon 0727 153 317 sau la
adresa de e-mail: contact@consultify.ro.</p>
      </div>
    </>
  )
}

export default Confidentiality