import mail from "@sendgrid/mail";
import emailTemplate from "./emailTemplate";
import {
  ACCEPTED_SUBJECT,
  AUTHENTICATION_SUBJECT,
  DECLINED_SUBJECT,
  DELIVERED_SUBJECT,
  JOIN_BOUNTY_SUBJECT,
} from "./emailSubject";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

export enum EmailType {
  AUTHENTICATION,
  ACCEPTED,
  DECLINED,
  DELIVERY,
  JOIN_BOUNTY,
}

export async function sendEmail(
  projectTitle: string | undefined,
  username: string,
  hunterEmail: string,
  emailType: EmailType,
  hunterName?: string,
  bountyLink?: string
) {
  let subject = { subject: "", body: "" };
  let text = "";

  if (emailType === EmailType.AUTHENTICATION) {
    subject = AUTHENTICATION_SUBJECT();
    text = "Sending Authentication Email";
  } else if (emailType === EmailType.ACCEPTED) {
    subject = ACCEPTED_SUBJECT(projectTitle);
    text = "Sending Accepted Email";
  } else if (emailType === EmailType.DECLINED) {
    subject = DECLINED_SUBJECT(projectTitle);
    text = "Sending Declined Email";
  } else if (emailType === EmailType.DELIVERY) {
    subject = DELIVERED_SUBJECT(hunterName);
    text = "Sending Delivery Email";
  } else if (emailType === EmailType.JOIN_BOUNTY) {
    subject = JOIN_BOUNTY_SUBJECT(projectTitle, hunterName);
    text = "Sending Join Bounty Email";
  }

  const html = emailTemplate(username, subject.body, bountyLink!);

  const emailData = {
    from: process.env.FROM_MAIL!,
    to: hunterEmail,
    subject: subject.subject,
    text: text,
    html: html,
  };

  try {
    await mail.send(emailData);
  } catch (err) {
    console.log(err);
  }
}
