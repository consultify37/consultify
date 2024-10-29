import Image from "next/image";
import Link from "next/link";

const Item1Story = () => {
  return (
    <article className="flex flex-wrap gap-y-10 gap-x-[6rem] mt-10 md:mt-32 justify-between items-center">
      <div className="flex-1">
        <h2 className="text-[#260056] font-bold text-xl mb-6 md:text-xl lg:text-2xl xl:text-3xl">
          Ne diferențiem prin:
        </h2>
        <p className="text-[#260056] font-normal text-[14px] md:text-base">
          Abilitatea noastră de a fi un partener de încredere pentru clienții noștri, ajutându-i să obțină finanțarea necesară pentru a-și atinge obiectivele. La Consultify, lucrăm strâns cu clienții noștri, oferindu-le soluții personalizate pentru fiecare proiect.
        </p>
        <br />
        <p className="text-[#260056] font-normal text-[14px] md:text-base">
          Echipa noastră tânără și dinamică este dedicată clienților și lucrează individual cu fiecare dintre ei pentru a înțelege și aborda nevoile specifice. De la evaluarea inițială până la prezentarea finală a proiectului, suntem mereu alături de clienții noștri, asigurându-ne că obțin finanțarea necesară. Cu o rată de succes ridicată și o abordare personalizată, Consultify este partenerul ideal în accesarea fondurilor europene.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/Programe" 
            className="bg-[#BA63FF] py-3 text-[#fff] font-semibold rounded-[28.5px] font-xl px-12 hover:scale-[1.05] transition-all"
          >
            Programe
          </Link>
          <Link
            href="/servicii"
            className="py-3 bg-transparent font-semibold text-[#260056] flex items-center rounded-[28.5px] border-2 border-[#8717F8] px-12 hover:scale-[1.05] transition-all"
          >
            Servicii
          </Link>
        </div>
      </div>
      <Image
        src="/images/About/Pag - despre noi - structura despre noi.png"
        alt="Our Story 2"
        className="w-full md:max-w-[450px] md:h-[400px] object-cover rounded-[35px]"
        width={300}
        height={300}
      />
    </article>
  );
};

export default Item1Story;
