import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { prisma } from "../../server/db/client";
import { BountyStatus, PaymentStatus } from "@prisma/client";

const stripe = new Stripe(
  "sk_test_51M3zzSE3SyiVmkyuiRZCbeYGNPfCTJqNnGFsetLwYBw9R2CJJ1X2BhlduEwyfPlrcrtYbxiIyYOQpiRXw564AA2U00Ng31lJqW",
  {
    apiVersion: "2022-08-01",
  }
);

const signingSecret = "whsec_9dhLiLr0YensC9ni6G1W6ijZP70PtQgY";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);

  try {
    const event = stripe.webhooks.constructEvent(
      reqBuffer.toString(),
      signature,
      signingSecret
    ) as any;

    const clientReferenceId = event.data.object.client_reference_id;
    const paymentStatus = event.data.object.payment_status;

    if (paymentStatus === "paid" && clientReferenceId) {
      const paidBounty = await prisma.bounty.update({
        where: {
          id: clientReferenceId,
        },
        data: {
          bountyStatus: BountyStatus.SUBMITTED,
          paymentStatus: PaymentStatus.PAID,
        },
      });

      if (paidBounty) {
        res.status(200).send({ received: true });
      }
    }
  } catch (err: any) {
    console.log(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
}
