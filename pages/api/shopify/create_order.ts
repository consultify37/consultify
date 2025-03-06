import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { order, send_receipt, inventory_behaviour } = req.body

    const response = await axios.post(
      'https://xwgafa-qn.myshopify.com/admin/api/2025-01/orders.json',
      {
        order,
        send_receipt,
        inventory_behaviour
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY
        }
      }
    )

    res.status(200).json(response.data)
  } catch (e: any) {
    console.log(e.response.data.errors)
    res.status(500).json(e)
  }
}