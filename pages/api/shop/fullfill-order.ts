import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { sendMail } from "../../../utils/sendMail"
import { fulfillementConfirmed } from "../../../templates"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { email } = req.body

  try {
    const customerEmail = email
    const productName = 'Agenda Start-up Nation'

    if (!customerEmail) {
      return res.status(400).json({ error: "Email not found in metadata" })
    }

    // Send shipping confirmation email
    await sendMail({
      from: "noreply@consultify.ro",
      to: customerEmail,
      subject: "Comanda ta a fost expediată! 🚚",
      text: null,
      html: fulfillementConfirmed(),
      website: "Consultify",
      attachments: null,
    })

    res.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: "Something went wrong" })
  }
}
