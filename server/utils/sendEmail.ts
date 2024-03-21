import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (activationCode: string, email: string) => {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
    })
    if(result){
        return {
            success: true,
        };
    }
    return {
        success: false
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
