import type { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { email } = body;

  const message = `
    Name: ${body.name}\r\n
    Email: ${email}\r\n
    Message: ${body.mesage}
  `;

  const data = {
    to: email,
    from: process.env.FROM_MAIL!,
    subject: "New web form message!",
    text: message,
    html: message.replace(/|r\n/g, "<br>"),
  };

  mail.send(data);

  res.status(200).json({ status: "ok" });
};
