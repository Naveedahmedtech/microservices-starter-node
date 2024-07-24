import { NextFunction, Request, Response } from "@/config/express.config";
import { sendEmail } from "@/lib/sendEmail";
import { compileEmailTemplate } from "@/utils/emailHelper";
import { sendSuccessResponse } from "@/utils/responseHandler";

export const registerEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const templateName = "registration-confirmation";
  try {
    const { email, accessToken } = req.body;
    const data: {
      to: string;
      subject: string;
      text: string;
      html?: string;
      verificationLink?: string;
    } = {
      to: email,
      subject: "Welcome to Our Chillout",
      text: "Thank you for registering with us. Please verify your email address to complete the registration.",
      html: "",
      verificationLink: `${process.env.REGISTRATION_VERIFICATION_LINK}?registrationToken=${accessToken}`,
    };
    const foldername = "auth";
    const html = await compileEmailTemplate(templateName, foldername, data);
    data.html = html;
    await sendEmail(data);
    return sendSuccessResponse(
      res,
      "Email send successfully",
      "We've sent you a verification link on your email address. Please verify it to complete the registration!",
      201
    );
  } catch (error: Error | any) {
    next(error);
  }
};
