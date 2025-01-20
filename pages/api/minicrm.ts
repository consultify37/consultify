import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://76959:9CvHKm2ujQdwskxiFD5Wh8Nc17qMabVB@r3.minicrm.hu/Api/R3/Project/253', {
    })

    res.status(200).json(response.data)
  } catch (e:any) {
    console.log(e.response.status)
    res.status(400).json(e)
  }
}