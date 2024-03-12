import Axios from "axios"
import { useEffect, useState } from "react"
import ShopItem from "./ShopItem"

const ShopItems = () => {
  const [products, setProducts] = useState<any>([])
  const [categorie, setCategorie] = useState<any>([])

  useEffect(() => {
    Axios.get("https://api.inspiredconsulting.ro/products/filtreaza_produse", {
      params: {
        reducere: "",
        categorie: "",
      },
    })
      .then(function(response) {
        setProducts(response.data)
        console.log(response.data, "produse")
      })
      .catch(function(error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    Axios.get(
      "https://api.inspiredconsulting.ro/products/afisaza_categorie",
      {}
    )
      .then(function(response) {
        setCategorie(response.data)
        console.log(response.data, " categorie")
      })
      .catch(function(error) {
        console.log(error)
      })
  }, [])

  return (
    <section
      id="shop-items"
      className=""
    >
      <div className="flex flex-col gap-10 w-full mt-10">
        {categorie.map((categorii: any, i: any) => (
          <ShopItem
            key={i}
            categorie={categorii}
            products={products.filter(
              (product: any) =>
                product.categorie.toLowerCase() === categorii.nume.toLowerCase()
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default ShopItems
