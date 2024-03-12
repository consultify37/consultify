import { useEffect, useState } from "react";
import { Pagination } from "../../../utils/functions";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface ProductData {
    // slice(first: number, last: number): unknown
    id: number;
    nume: string;
    descriere_1: string;
    descriere_2: string;
    pret: string;
    reducere: string;
    categorie: string;
    poza: string;
    motive: string;
    intrebari: string;
    titlu_adreseaza: string;
    desc_adreseaza: string;
    fisier: string;
    date: string;
}

const CategoryItems = () => {
    const [products, setProducts] = useState<
        {
            id: number;
            nume: string;
            descriere_1: string;
            descriere_2: string;
            pret: string;
            reducere: string;
            categorie: string;
            poza: string;
            motive: string;
            intrebari: string;
            titlu_adreseaza: string;
            desc_adreseaza: string;
            fisier: string;
            date: string;
        }[]
    >([]);

    const [categorie, setCategorie] = useState<string | undefined>(undefined);

    useEffect(() => {
        const url = window.location.href;
        const productId = url.split("/").pop();
        setCategorie(productId);
        Axios.get("https://api.inspiredconsulting.ro/products/filtreaza_produse", {
            params: {
                reducere: "",
                categorie: categorie,
            },
        })
            .then(function(response) {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [categorie]);

    let ProductsData: any[] = products;

    const [page, setPage] = useState(0);
    let maxPages = Math.ceil(ProductsData.length / 9);

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortDirection = event.target.value;
        let sortedData = [...products];

        if (sortDirection === "ascending") {
            sortedData.sort((a, b) => Number(a.pret) - Number(b.pret));
        } else if (sortDirection === "descending") {
            sortedData.sort((a, b) => Number(b.pret) - Number(a.pret));
        }

        setProducts(sortedData);
    };

    return (
        <section
            id="category-items"
            className="mt-32 px-7 md:px-[80px] xl:px-[140px] 2xl:px-[276px] flex flex-col gap-3"
        >
            <p className="mx-auto md:mx-0 md:ml-auto text-black font-bold text-base">
                Sortează după:
                <select
                    onChange={handleSort}
                    name="price"
                    id=""
                    className="text-base py-1 px-2"
                >
                    <option value="ascending">pret crescator</option>
                    <option value="descending">pret descrescator</option>
                </select>
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
                {Pagination(ProductsData, page, 9).map((product) => (
                    <Link
                        key={product.id}
                        href={`/shop/view/${product.nume}`}
                        className="p-2 rounded-md bg-white shadow-md min-w-[90%] md:min-w-[280px] flex flex-col gap-4 snap-center"
                    >
                        <div className="relative h-[250px]">
                            <Image
                                src={`https://api.inspiredconsulting.ro/${product.poza}`}
                                alt={product.nume}
                                width={152}
                                height={264}
                                className="mx-auto object-fit rounded-[10px] p-2 max-h-full absolute object-contain min-w-full max-w-full"
                            />
                        </div>
                        <div className="flex items-center justify-between px-2">
                            <div className="flex flex-col gap-2 max-w-[85%]">
                                <p className="text-[#8717F8] text-sm font-bold">
                                    {product.pret} lei{" "}
                                    {product.reducere && (
                                        <s className="text-[#7C9EF8] font-thin">
                                            {product.reducere} lei
                                        </s>
                                    )}
                                </p>
                                <h4 className="text-[#260056] font-bold text-base">
                                    {product.nume}
                                </h4>
                            </div>
                            <span className="w-10 h-10 bg-[#8717F8] flex items-center justify-center rounded-full text-white flex-shrink-0">
                                <AiOutlineShoppingCart />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center w-full gap-2">
                <RiArrowLeftSLine
                    size={24}
                    onClick={() => setPage(0)}
                    className={`${page === 0 ? "text-[#CDCDCD]" : "text-[#260056]"
                        } cursor-pointer`}
                />
                {maxPages > 0 &&
                    Array.from({ length: maxPages }, (_, i) => (
                        <p
                            key={i}
                            onClick={() => setPage(i)}
                            className={`${i === page ? "bg-[#260056] text-white" : "text-[#260056]"
                                } cursor-pointer h-8 w-8 rounded-full flex items-center justify-center`}
                        >
                            {i + 1}
                        </p>
                    ))}
                <RiArrowRightSLine
                    size={24}
                    onClick={() => setPage(maxPages - 1)}
                    className={`${page === maxPages - 1 ? "text-[#CDCDCD]" : "text-[#260056]"
                        } cursor-pointer`}
                />
            </div>
        </section>
    );
};

export default CategoryItems;
