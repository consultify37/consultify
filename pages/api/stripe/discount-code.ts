import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-03-31.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.body;

    const promotionCodes = await stripe.promotionCodes.list({
      code,
      limit: 1,
    });

    const discountItem = promotionCodes.data[0];

    if (discountItem) {
      return res.status(200).json(discountItem);
    }

    return res.status(404).end();
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}