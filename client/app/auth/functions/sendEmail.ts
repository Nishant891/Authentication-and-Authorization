"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, activationCode: string) => {
  try {
    await resend.emails.send({
      from: "Nishant Sharma <onboarding@resend.dev>",
      to: email,
      subject: "Contact",
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification Email</title>
            </head>
            <body>
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>OTP Verification</h2>
                    <p>Your OTP for verification is: <strong>${activationCode}</strong></p>
                    <p>Please enter this OTP in the verification form.</p>
                </div>
            </body>
            </html>
            
            `,
    });
    return {
      success: true,
      message: "OTP is sent. Check your mailbox.",
    };
  } catch (error) {
    return{
        success: false,
        message: "OTP cannot be sent"
    }
  }
};
