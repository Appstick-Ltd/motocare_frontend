import nodemailer from "nodemailer";
import { generateSupportReplyHtml, SupportReplyEmailParams } from "./supportTemplate";

export interface SendMailResult {
  success: boolean;
  delivered: boolean;
  messageId?: string;
  error?: string;
  notice?: string;
}

export async function sendSupportReplyEmail(
  params: SupportReplyEmailParams
): Promise<SendMailResult> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const fromAddress =
    process.env.SMTP_FROM ||
    `"MotoCare Support" <${smtpUser || "motocare@appstick.com.bd"}>`;

  const htmlContent = generateSupportReplyHtml(params);

  // If SMTP environment variables are missing, log and simulate success
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("=========================================");
    console.log("[MOCK EMAIL SENDER - SMTP NOT CONFIGURED]");
    console.log(`To: ${params.userEmail} (${params.userName})`);
    console.log(`Subject: Re: ${params.subject}`);
    console.log("Reply Text:", params.replyText);
    console.log("=========================================");

    return {
      success: true,
      delivered: false,
      notice:
        "SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured. Status updated to 'replied'. Mock email logged in console.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: fromAddress,
      to: params.userEmail,
      subject: `Re: ${params.subject}`,
      html: htmlContent,
      replyTo: smtpUser,
    });

    console.log(`[EMAIL SENT] MessageId: ${info.messageId} to ${params.userEmail}`);

    return {
      success: true,
      delivered: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error("[EMAIL ERROR] Failed to send email via SMTP:", err);
    return {
      success: false,
      delivered: false,
      error: err.message || "Failed to deliver email through SMTP server.",
    };
  }
}
