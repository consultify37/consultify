import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { sendMail } from '../../../utils/sendMail'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { orderConfirmTemplate } from '../../../templates'

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let event: Stripe.Event

  try {
    const rawBody = await buffer(req)
    const sig = req.headers['stripe-signature'] as string
    console.log(endpointSecret)
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret)
  } catch (err) {
    console.error('Eroare validare semnătură Stripe:', err)
    return res.status(400).send(`Eroare Webhook: ${err instanceof Error ? err.message : 'Unknown error'}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // ✅ Abort early if no shipping
    if ( !session.collected_information?.shipping_details ) {
      return res.status(200).json({ ok: true, reason: "No shipping details" })
    }

    const customerEmail = session.customer_details?.email || session.customer_email
    const paymentIntentId = session.payment_intent as string

    try {
      // 1. Preluăm produsele
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      })

      const products = lineItems.data.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
      }))
  
      // ✅ Save to Firestore
      await setDoc(doc(collection(db, 'physicalOrders'), session.id), { 
        email: customerEmail,
        name: session.collected_information?.shipping_details?.name,
        phone: session.customer_details?.phone,
        paymentIntentId,
        shipping: session.collected_information?.shipping_details?.address,
        products,
        created: Date.now(),
        fulfilled: false,
      })

      const productsHtml = lineItems.data
        .map(item => {
          const productName = item.description
          const quantity = item.quantity
          return `<li><strong>${productName}</strong> – Cantitate: ${quantity}</li>`
        })
        .join('')

      // 2. Adresa de livrare
      const address = session.collected_information?.shipping_details?.address
      const name = session.collected_information?.shipping_details?.name
      const shippingAddress = address
        ? `
          <p>
            <strong>Adresa de livrare:</strong><br/>
            ${name || ''}<br/>
            ${address.line1 || ''}<br/>
            ${`${address.line2}<br/>`|| ''}
            ${address.city || ''}, ${address.postal_code || ''}
          </p>
        `
        : '<p>⚠️ <strong>Nu a fost specificată o adresă de livrare.</strong></p>'

      // 3. Trimitere email
      if (customerEmail) {
        await sendMail({
          from: 'noreply@consultify.ro',
          to: customerEmail,
          subject: '🎉 Mulțumim pentru achiziție! – Consultify.ro',
          text: null,
          html: orderConfirmTemplate(productsHtml, shippingAddress),
          website: 'Consultify',
          attachments: null,
        })
      }

    } catch (e: any) {
      console.error('Eroare trimitere email sau preluare produse:', e)
      return res.status(500).json({ error: 'Eroare trimitere email sau preluare produse', message: e?.message })
    }
  }
  
  res.status(200).json({ received: true })
}

