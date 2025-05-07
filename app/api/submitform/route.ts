import ContactFormEmail from "@/email/emailContactfrom";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { senderEmail, message } = body;

  // const data = await resend.emails.send({
  //   from: "Portfolio Contact <onboarding@resend.dev>",
  //   to: "anshgarg7234@gmail.com",
  //   subject: "Portfolio Message",
  //   replyTo: senderEmail,
  //   html: `
  //     <h3>New message from ${senderEmail}</h3>
  //     <p>${message}</p>
  //   `,
  // });

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "anshgarg7234@gmail.com",
    subject: "Portfolio",
    react: React.createElement(ContactFormEmail, {
      message,
      senderEmail,
    }),
  });

  if (data) {
    console.log("Email sent successfully:", data);
  }

  if (error) {
    return Response.json({
      success: false,
      message: "Failed to send email",
    });
  }

  return Response.json({
    success: true,
    message: "Form submitted successfully",
  });
}
