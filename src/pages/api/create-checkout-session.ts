import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

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
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/poster-dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  res.status(200).json({ session });
}
