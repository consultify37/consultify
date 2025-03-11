import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { sendMail } from "../../../utils/sendMail"

const invoiceTemplate =  `<div style="max-width:600px;"><strong>Bună ziua</strong>,
<br><br>
Vă mulțumim pentru achiziția flashcard-urilor 📚 cu informații despre Start-Up Nation 2024!
<br><br>
📎 Atașat acestui email găsiți factura aferentă comenzii dumneavoastră:
<br><br>
🎁 <strong>Bonus</strong>: În cadrul pachetului beneficiați de <strong>o ședință gratuită de consultanță</strong>! 🤝 Un consultant <strong>Consultify</strong> vă va contacta în curând pentru a stabili detaliile.
<br><br>
Dacă aveți întrebări, nu ezitați să ne contactați. 💬<br><br>
🌐 <a href="https://consultify.ro" target="_blank">www.consultify.ro</a><br>
📧 <a href="mailto:contact@consultify.ro" target="_blank">contact@consultify.ro</a><br>
📞 <a href="tel:0773 395 400" target="_blank">0773 395 400</a>
<br><br>
Vă dorim mult succes! 🚀
<br><br>
<strong>Cu stimă,<br>
Echipa Consultify</strong><br>
</div>
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { id, financial_status, total_price, name, email, billing_address, note_attributes } = req.body

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

    // Check if financial_status is 'authorized'
    if (financial_status === "paid" && invoiceSnapshot.empty) {
      console.log(`Order ${id} is authorized. Generating invoice...`)
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
          products: [
            {
              name: `Comanda ${name}`,
              price: Number(total_price),
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
          html: invoiceTemplate,
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