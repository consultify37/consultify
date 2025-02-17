import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { order, send_receipt } = req.body

    const response = await axios.post(
      'https://xwgafa-qn.myshopify.com/admin/api/2025-01/orders.json',
      {
        order,
        send_receipt
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': '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'
        }
      }
    )

    res.status(200).json(response.data)
  } catch (e: any) {
    console.log(e.response.data.errors)
    res.status(500).json(e)
  }
}