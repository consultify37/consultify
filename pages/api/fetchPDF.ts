import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(req.body.url, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    })
    const base64 = Buffer.from(response.data).toString("base64")
    res.status(200).send(base64)
  } catch (e) {
    console.log(e)
    res.status(400).send('')
  }
}