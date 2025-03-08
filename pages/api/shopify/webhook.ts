import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { id, financial_status, total_price, name, email, billing_address, note_attributes } = req.body
    console.log({ id, financial_status, total_price, name, email, billing_address, note_attributes })
    const billingData = {
      name: billing_address?.name || "N/A",
      country: billing_address?.country || "Romania",
      countryCode: billing_address?.country_code || "RO",
      province: billing_address?.province || "",
      provinceCode: billing_address?.province_code || "",
      city: billing_address?.city || "",
      address: billing_address?.address1 || "",
      zip: billing_address?.zip || "",
      email: email || "",
    }

    const cui = note_attributes?.find((attr: any) => attr.name === "CUI")?.value || null
    const company = note_attributes?.find((attr: any) => attr.name === "Company")?.value || billingData.name

    // Check if financial_status is 'authorized'
    if (financial_status === "paid") {
      console.log(`Order ${id} is authorized. Generating invoice...`)

      // Send invoice request to SmartBill
      const smartBillResponse = await axios.post(
        'https://ws.smartbill.ro/SBORO/api/invoice', 
        {
          companyVatCode: 'RO42607998',
          seriesName: "CONS",
          client: { 
            name: company,
            cui: cui,
            country: billingData.country,
            county: billingData.province,
            city: billingData.city,
            address: billingData.address,
            email: billingData.email
           },
          payment: {
            value: total_price,
            type: 'Card',
            isCash: false
          },
          products: [
            {
              name: `Comanda ${name}`,
              price: total_price,
              currency: "RON",
              isDiscount: false,
              measuringUnitName: 'buc',
              quantity: 1,
              isTaxIncluded: true,
              taxName: 'Normala',
              taxPercentage: 19,
              saveToDb: false,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'authorization': `Basic ${process.env.SMARTBILL_API_KEY}`,
          },
        }
      )

      console.log("SmartBill response:", smartBillResponse.data)
      return res.status(200).json({ success: true })
    }

    console.log(`No action taken. ${financial_status}`)
    res.status(200).json({ message: "No action taken" })
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.errors) {
      console.log(e.response?.data?.errors)
      return res.status(500).json({ error: e.response.data.errors })
    }
    if (e.message) {
      console.log(e.message)
      return res.status(500).json({ error: e.message })
    }
    res.status(500).json({ error: "Internal Server Error" })
  }
}