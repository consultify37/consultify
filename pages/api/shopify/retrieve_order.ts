import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(
      'https://xwgafa-qn.myshopify.com/admin/api/2025-01/orders.json?status=any',
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY
        }
      }
    )

    const response1 = await axios.post(
      `https://xwgafa-qn.myshopify.com/admin/api/2025-01/orders/${response.data.orders[0].id}/transactions.json`,
      {
        orderId: response.data.orders[0].id,
        "transaction": {
          "amount": "79.00",
          "currency": "RON",
          "gateway": "Cash on Delivery (COD)",
          "kind": "pending"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY
        }
      }
    )

    console.log(response.data.orders[0].payment_gateway_names)
    res.status(200).json(response.data)
  } catch (e: any) {
    console.log('error:', e.response.data.errors)
    res.status(500).json(e)
  }
}