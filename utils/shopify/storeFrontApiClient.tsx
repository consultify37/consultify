export const storefrontApiClient = async (query: string, variables: any | null = null) => {
  const URL = `https://quickstart-a53af90f.myshopify.com/api/2025-01/graphql.json`
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": "f28fc11ecc54cad02f2dc912b8180b3c",
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables })
  }

  var p = new Promise(async (resolve, reject) => {
    
    try {
      const data = await fetch(URL, options).then(response => {
        return response.json()
      })
      
      resolve(data)
    } catch (error) {
      reject (error)
    }
  }) 

  return p
}