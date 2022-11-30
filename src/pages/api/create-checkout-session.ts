import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51M3zzSE3SyiVmkyuiRZCbeYGNPfCTJqNnGFsetLwYBw9R2CJJ1X2BhlduEwyfPlrcrtYbxiIyYOQpiRXw564AA2U00Ng31lJqW",
  {
    apiVersion: "2022-08-01",
  }
);

const PROCESSING_FEE = 0.03;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bounty } = JSON.parse(req.body);
  const totalPrice = bounty.price * PROCESSING_FEE + bounty.price;

  const lineItems = [];
  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: bounty.title,
        images: [bounty.coverPhoto],
      },
      unit_amount: totalPrice * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    client_reference_id: bounty.id,
    line_items: [...lineItems],
    mode: "payment",
    success_url: "http://localhost:3000/poster-dashboard",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.status(200).json({ session });
}
