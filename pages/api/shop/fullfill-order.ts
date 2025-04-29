import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { sendMail } from "../../../utils/sendMail"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { paymentIntentId } = req.body

  if (!paymentIntentId) return res.status(400).json({ error: "Missing paymentIntentId" })

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const metadata = paymentIntent.metadata
    const customerEmail = metadata?.email
    const productName = 'Agenda Start-up Nation'

    if (!customerEmail) {
      return res.status(400).json({ error: "Email not found in metadata" })
    }

    // Send shipping confirmation email
    await sendMail({
      from: "noreply@consultify.ro",
      to: customerEmail,
      subject: "📦 Comanda ta a fost expediată!",
      text: null,
      html: `
        <div style="max-width:600pxmargin:0 autofont-family:Arial,sans-serif">
          <h1>📦 Comanda ta a fost expediată!</h1>
          <p>Salut!</p>
          <p>Comanda ta ${productName ? `pentru <strong>${productName}</strong>` : ''} este pe drum. 🚚</p>
          <p>Îți mulțumim că ai comandat de la noi!</p>
        </div>
      `,
      website: "Consultify",
      attachments: [],
    })

    // Optionally: mark as fulfilled in metadata (optional)
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        ...metadata,
        fulfilled: "true",
      },
    })

    res.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: "Something went wrong" })
  }
}
