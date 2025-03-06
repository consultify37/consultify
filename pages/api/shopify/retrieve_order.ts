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
    // console.log(response.data.orders.map((order: any) => order.payment_gateway_names))
    res.status(200).json(response.data)
  } catch (e: any) {
    console.log(e.response.data.errors)
    res.status(500).json(e)
  }
}