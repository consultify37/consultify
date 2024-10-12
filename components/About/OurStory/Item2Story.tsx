import Image from "next/image";
import Link from "next/link";

const Item2Story = () => {
  return (
    <div className='flex flex-wrap-reverse lg:flex-wrap gap-y-10 gap-x-[6rem] mt-10 md:mt-32 justify-between items-center'>
      <div className='relative w-full md:md:max-w-[450px]'>
        <Image src='/images/About/Pag - despre noi - structura calitati.jpg' alt='About home 2' className='rounded-[28.5px] w-full md:w-[450px] md:h-[400px] object-cover mx-auto lg:mx-0' object-fit='cover' placeholder='blur' width={400} height={400} blurDataURL='/images/About/Pag - despre noi - structura calitati.jpg' />
        <Image src='/images/patrat.svg' className='absolute left-[-1.25rem] lg:left-[-4.25rem] bottom-[-2rem] rotate-2 w-[150px]' width={150} height={150} alt='Polygon img' />
      </div>
      <div className='w-full xl:max-w-[48%]'>
        <h2 className='text-[#260056] font-bold text-xl mb-6 md:text-xl lg:text-2xl xl:text-3xl'>Ce ne propunem să realizăm?</h2>
        <p className='text-[#260056] font-normal text-[14px] md:text-base mt-5'>
          Ne propunem să oferim soluții personalizate și eficiente clienților noștri, ajutându-i să-și realizeze proiectele. De la început, misiunea noastră a fost să simplificăm accesarea fondurilor europene și să sprijinim antreprenorii în obținerea finanțărilor necesare pentru dezvoltarea afacerilor lor. Pe lângă aceste obiective, dorim să le subliniem și pe urmatoarele: 
        </p>
        <ul className='list-none mt-4'>
            <li className='flex gap-5 items-center'>
              <span className='text-[#260056] w-8 h-8 min-w-[32px] rounded-[50%] bg-[#BA63FF] flex items-center justify-center font-medium'>1</span>
              <p className='text-[#260056] text-[14px] md:text-base font-semibold'>Să furnizăm consultanță de înaltă calitate, adaptată nevoilor clienților.</p>
            </li>
            <li className='flex gap-5 items-center mt-4'>
              <span className='text-white w-8 h-8 min-w-[32px] rounded-[50%] bg-[#8717F8] flex items-center justify-center font-medium'>2</span>
              <p className='text-[#260056] text-[14px] md:text-base font-semibold'>Să oferim soluții inovatoare pentru maximizarea șanselor de succes.</p>
            </li>
            <li className='flex gap-5 items-center mt-4'>
              <span className='text-[#00103C] px-[15px] w-8 h-8 rounded-[50%] bg-[#CF9FFF] flex items-center justify-center font-medium'>3</span>
              <p className='text-[#260056] text-[14px] md:text-base font-semibold'>Să facilităm dezvoltarea durabilă a afacerilor prin proiecte finanțate.</p>
            </li>
        </ul>
        <div className='flex gap-4 mt-6'>
            <Link href='/shop' className='py-3 bg-[#8717F8] text-[#fff] rounded-[28.5px] font-semibold px-12 hover:scale-[1.05] transition-all'>Shop</Link>
            <Link href='/testimoniale' className='py-3 bg-transparent text-[#260056] rounded-[28.5px] border-2 border-[#BA63FF] font-semibold px-12 hover:scale-[1.05] transition-all'>Testimoniale</Link>
        </div>
      </div>
    </div>
  );
};

export default Item2Story;
