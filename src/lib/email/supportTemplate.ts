export interface SupportReplyEmailParams {
  userName: string;
  userEmail: string;
  subject: string;
  originalMessage: string;
  replyText: string;
}

export function generateSupportReplyHtml({
  userName,
  userEmail,
  subject,
  originalMessage,
  replyText,
}: SupportReplyEmailParams): string {
  const formattedReply = replyText.replace(/\n/g, "<br/>");
  const formattedOriginal = originalMessage.replace(/\n/g, "<br/>");
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Response to your MotoCare Support Inquiry</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 620px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);
      padding: 32px 28px;
      text-align: center;
      color: #ffffff;
    }
    .header-logo {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .header-badge {
      display: inline-block;
      margin-top: 8px;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 32px 28px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
    }
    .intro-text {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 24px;
    }
    .response-card {
      background-color: #fff7ed;
      border-left: 4px solid #f97316;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 28px;
    }
    .card-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #ea580c;
      margin-bottom: 12px;
    }
    .reply-body {
      font-size: 14.5px;
      line-height: 1.6;
      color: #1c1917;
      font-weight: 400;
    }
    .original-inquiry-box {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      padding: 16px 20px;
      border-radius: 10px;
      margin-bottom: 24px;
    }
    .original-title {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .original-subject {
      font-size: 13.5px;
      font-weight: 700;
      color: #334155;
      margin-bottom: 6px;
    }
    .original-body {
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer {
      background-color: #0f172a;
      padding: 28px 24px;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer strong {
      color: #ffffff;
    }
    .appstick-brand {
      margin-top: 10px;
      font-size: 13px;
      color: #cbd5e1;
    }
    .appstick-link {
      color: #f97316;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s;
    }
    .appstick-link:hover {
      text-decoration: underline;
      color: #fb923c;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-logo">MotoCare</h1>
      <div class="header-badge">Customer Support Team</div>
    </div>

    <div class="content">
      <div class="greeting">Hello ${userName || "Valued User"},</div>
      <p class="intro-text">
        Thank you for contacting MotoCare Support regarding <strong>"${subject || "your inquiry"}"</strong>. Our support team has reviewed your request and provided the response below:
      </p>

      <div class="response-card">
        <div class="card-title">Support Team Response</div>
        <div class="reply-body">${formattedReply}</div>
      </div>

      <div class="original-inquiry-box">
        <div class="original-title">Your Original Inquiry</div>
        <div class="original-subject">Subject: ${subject}</div>
        <div class="original-body">${formattedOriginal}</div>
      </div>
    </div>

    <div class="footer">
      <p><strong>MotoCare Fleet & Vehicle Management Ecosystem</strong></p>
      <div class="appstick-brand" style="margin: 8px 0;">
        Support: <a href="mailto:motocare@appstick.com.bd" style="color: #fb923c; text-decoration: none;">motocare@appstick.com.bd</a> | 
        WhatsApp: <a href="https://wa.me/8801404049797" target="_blank" style="color: #4ade80; text-decoration: none;">+880 1404-049797</a>
      </div>
      <p style="font-size: 11px; color: #94a3b8; margin: 6px 0;">
        50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh
      </p>
      <div class="appstick-brand" style="margin-top: 10px;">
        A Product of <a href="https://appstick.com.bd" target="_blank" class="appstick-link">Appstick Ltd.</a>
      </div>
      <p style="margin-top: 12px; font-size: 11px; color: #64748b;">
        &copy; ${currentYear} MotoCare. Powered by <a href="https://appstick.com.bd" target="_blank" style="color: #cbd5e1; text-decoration: underline;">Appstick Ltd.</a> All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
