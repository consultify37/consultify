import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { sendMail } from "../../../utils/sendMail"

const generateInvoiceTemplate = ( name: string) => (
  `<div style="max-width:600px;"><strong>Salut, ${name}</strong>,
<br><br>
Îți mulțumim pentru comanda ta! 📦 Factura este atașată acestui email.
<br><br>
💡 Nu uita! Ai inclusă o ședință GRATUITĂ de consultanță – te contactăm curând pentru programare! 📅
<br><br>
Mulțumim și mult succes! 🚀
<strong>Echipa Consultify</strong>
</div>
`
)

// 🎁 <strong>Bonus</strong>: În cadrul pachetului beneficiați de <strong>o ședință gratuită de consultanță</strong>! 🤝 Un consultant <strong>Consultify</strong> vă va contacta în curând pentru a stabili detaliile.
// <br><br>

// 🌐 <a href="https://consultify.ro" target="_blank">www.consultify.ro</a><br>
// 📧 <a href="mailto:contact@consultify.ro" target="_blank">contact@consultify.ro</a><br>
// 📞 <a href="tel:0773 395 400" target="_blank">0773 395 400</a>
// <br><br>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { id, financial_status, total_price, name, email, billing_address, note_attributes, line_items, discount_codes } = req.body

    const billingData = {
      name: `${billing_address?.first_name} ${billing_address?.last_name}`,
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

    const invoiceRef = query(collection(db, 'invoices'), where("shopifyOrderId", "==", id))
    const invoiceSnapshot = await getDocs(invoiceRef)

    // Process only if financial_status is 'authorized' and invoice does not exist
    if (financial_status === "paid" && invoiceSnapshot.empty) {
      console.log(`Order ${id} is authorized. Generating invoice...`)

      // Calculate total discount
      const totalDiscount = discount_codes?.reduce((acc: number, discount: any) => acc + Number(discount.amount), 0) || 0

      // Generate product list
      const products = line_items.map((item: any) => ({
        name: item.name,
        price: Number(item.price), // Price per unit
        currency: "RON",
        isDiscount: false,
        measuringUnitName: 'buc',
        quantity: item.quantity,
        isTaxIncluded: true,
        taxName: 'Normala',
        taxPercentage: 19,
        saveToDb: false
      }))

      console.log(products)

      // If there’s a discount, add it as a separate negative item
      if (totalDiscount > 0) {
        products.push({
          name: "Discount aplicat",
          price: -totalDiscount, // Negative value for discount
          currency: "RON",
          isDiscount: true,
          measuringUnitName: 'buc',
          quantity: 1,
          isTaxIncluded: true,
          taxName: 'Normala',
          taxPercentage: 19,
          saveToDb: false
        })
      }

      console.log(products)

      // Send invoice request to SmartBill
      const smartBillResponse = await axios.post(
        'https://ws.smartbill.ro/SBORO/api/invoice', 
        {
          companyVatCode: 'RO42607998',
          seriesName: "CONS",
          client: { 
            name: company,
            country: billingData.country,
            county: billingData.province,
            city: billingData.city,
            address: billingData.address,
            email: billingData.email,
            vatCode: cui,
            isTaxPayer: cui && cui.length != 0 ? true : null,
            saveToDb: true
          },
          payment: {
            value: Number(total_price),
            type: 'Alta incasare',
            isCash: true
          },
          products: products, // Use generated product list
        },
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'authorization': `Basic ${process.env.SMARTBILL_API_KEY}`,
          },
        }
      )

      const response1 = await axios.get(`https://ws.smartbill.ro/SBORO/api/invoice/pdf?cif=RO42607998&seriesname=${smartBillResponse.data.series}&number=${smartBillResponse.data.number}`, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/octet-stream',
          'authorization': `Basic ${process.env.SMARTBILL_API_KEY}`,
          'Content-Disposition': 'attachment; filename=new.pdf'
        }
      })

      const base64 = Buffer.from(response1.data).toString("base64")
      
      await addDoc(collection(db, "invoices"), { shopifyOrderId: id, series: smartBillResponse.data.series, number: smartBillResponse.data.number })

      try {
        await sendMail({
          website: 'Consultify',
          from: `noreply@consultify.ro`,
          to: email,
          subject: `✅ Factura ${smartBillResponse.data.series}-${smartBillResponse.data.number} de la Consultify`, 
          html: generateInvoiceTemplate(billing_address.first_name || ''),
          attachments: [{ content: base64, name: `Factura ${smartBillResponse.data.series}-${smartBillResponse.data.number}.pdf`}],
          text: null
        })
      } catch (e) {
        console.log(e)
      }
      return res.status(200).json({ success: true })
    }

    res.status(200).json({ message: "No action taken" })
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.errorText) {
      console.log(e.response?.data?.errorText)
      return res.status(500).json({ error: e.response.data.errorText })
    }
    if (e.message) {
      console.log(e.message)
      return res.status(500).json({ error: e.message })
    }
    res.status(500).json({ error: "Internal Server Error" })
  }
}