import Image from "next/image"
import PageHeader from "../Header/PageHeader"

const ShopHeader = () => {
    return (
			<PageHeader title="Explorează produsele noastre Ready-Made: Le pui în coș, achiți și magia se întâmplă!">
				<Image
					src="/images/Shop/shop-hexagon.svg"
					width={130}
					height={130}
					className="absolute top-12 lg:top-32 -left-2 md:bottom-5 md:left-0 w-[90px] md:w-[100px] lg:w-[110px] xl:w-[130px]"
					alt="."
				/>
				<Image
					src="/images/Shop/circle-shop.svg"
					alt="Hero blue circle"
					width={200}
					height={200}
					className="absolute right-0 top-0 z-[5] w-[120px] md:w-[150px] lg:w-[200px] xl:w-[260px]"
				/>
			</PageHeader>
    )
}

export default ShopHeader
