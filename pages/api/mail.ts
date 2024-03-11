import EmailTemplate from "@/components/EmailTemplate";
import OwnerTemplate from "@/components/OwnerTemplate";
import type { NextApiRequest, NextApiResponse } from "next";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

type Data = {
  status: string;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  const { name, email, message } = JSON.parse(body);

  const userContent = EmailTemplate({ name });
  const ownerContent = OwnerTemplate({ name, email, message });

  // Send email to owner
  const ownerData = {
    to: "yashk.codage@gmail.com",
    from: "yashk.codage@gmail.com",
    subject: "New Message from Your Website",
    text: "You have received a new message from your website.",
    html: ownerContent,
  };

  // Send confirmation email to user
  const userData = {
    to: email,
    from: "yashk.codage@gmail.com",
    subject: "Your Message Has Been Received",
    text: "Thank you for reaching out. We'll get back to you shortly.",
    html: userContent,
  };

  try {
    await mail.send(ownerData);
    await mail.send(userData);
    console.log("Emails sent successfully");
    res.status(200).json({
      status: "Ok",
      error: "Failed to send",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ status: "Error", error: "Failed to send emails" });
  }
}
