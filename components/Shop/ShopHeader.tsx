import Image from "next/image";

const ShopHeader = () => {
    return (
        <section
            id="about-header"
            className="relative bg-[#260056] w-full pt-44 pb-14 flex flex-col items-center justify-center overflow-visible px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px]"
            style={{ marginBottom: `128px` }}
        >
            <h1 className="text-xl md:text-4xl xl:text-[44px] font-extrabold md:leading-[48px] text-white md:max-w-[50%] text-center pt-20 lg:pt-20">
                Coming soon...
                {/* Aici ai toate produsele ready made pe care le avem. Le pui în coș,
                achiți și magia se întâmplă. */}
            </h1>
            <span className="bg-[#260056] rounded-[0_0_200px_250px] w-[115vw] md:w-[103vw] -rotate-2 absolute -left-5 -bottom-20 h-32" />
            <Image
                src="/images/circle-hero-right.svg"
                alt="Hero blue circle"
                width={200}
                height={200}
                className="absolute right-0 top-0 z-[5] w-[120px] md:w-[200px]"
            />
            <Image
                src="/images/shop-hexagon.png"
                width={130}
                height={130}
                className="absolute top-7 -left-2 md:bottom-5 md:left-0 w-[100px] md:w-[130px]"
                alt="Yellow triangle"
            />
        </section>
    );
};

export default ShopHeader;
