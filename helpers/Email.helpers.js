import nodemailer from "nodemailer";
import crypto from "crypto";
import envFile from "../utils/EnvConfig.js";
envFile;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify(error => {
  if (error) {
    console.error("❌ Mail server error:", error.message);
  } else {
    console.log("✅ Mail server ready");
  }
});

function forgotPasswordTemplate({ name, resetLink, expiresIn = "15 minutes" }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #F1EFE8;
      padding: 40px 16px;
      color: #1A1A18;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 520px;
      margin: 0 auto;
    }

    /* ── Header logo bar ── */
    .logo-bar {
      text-align: center;
      margin-bottom: 24px;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #1A1A18;
      text-decoration: none;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7F77DD, #534AB7);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }

    /* ── Card ── */
    .card {
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }

    /* ── Card top banner ── */
    .card-banner {
      background: linear-gradient(135deg, #534AB7 0%, #7F77DD 50%, #1D9E75 100%);
      padding: 40px 32px;
      text-align: center;
    }

    .banner-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }

    .banner-title {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .banner-sub {
      font-size: 14px;
      color: rgba(255,255,255,0.8);
      line-height: 1.6;
    }

    /* ── Card body ── */
    .card-body {
      padding: 36px 40px;
    }

    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #1A1A18;
      margin-bottom: 14px;
    }

    .message {
      font-size: 14px;
      color: #5F5E5A;
      line-height: 1.75;
      margin-bottom: 28px;
    }

    /* ── CTA Button ── */
    .btn-wrap {
      text-align: center;
      margin-bottom: 28px;
    }

    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #534AB7, #3C3489);
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 10px;
      letter-spacing: 0.02em;
      box-shadow: 0 6px 20px rgba(83,74,183,0.35);
    }

    /* ── Divider ── */
    .divider {
      height: 1px;
      background: #E4E2D9;
      margin: 28px 0;
    }

    /* ── Expire notice ── */
    .expire-box {
      background: #FAEEDA;
      border: 1px solid #EF9F27;
      border-radius: 10px;
      padding: 14px 18px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 24px;
    }

    .expire-icon {
      font-size: 18px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .expire-text {
      font-size: 13px;
      color: #854F0B;
      line-height: 1.55;
    }

    .expire-text strong {
      font-weight: 700;
    }

    /* ── Fallback link ── */
    .fallback {
      font-size: 12.5px;
      color: #888780;
      line-height: 1.7;
    }

    .fallback a {
      color: #534AB7;
      word-break: break-all;
    }

    /* ── Security note ── */
    .security-box {
      background: #E1F5EE;
      border: 1px solid #5DCAA5;
      border-radius: 10px;
      padding: 14px 18px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 24px;
    }

    .security-text {
      font-size: 12.5px;
      color: #0F6E56;
      line-height: 1.55;
    }

    /* ── Footer ── */
    .footer {
      text-align: center;
      margin-top: 28px;
      padding-bottom: 12px;
    }

    .footer-text {
      font-size: 12px;
      color: #888780;
      line-height: 1.7;
    }

    .footer-links {
      margin-top: 10px;
      font-size: 12px;
    }

    .footer-links a {
      color: #5F5E5A;
      text-decoration: none;
      margin: 0 8px;
    }

    .footer-links a:hover {
      color: #534AB7;
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      body { padding: 24px 12px; }
      .card-body  { padding: 24px 20px; }
      .card-banner { padding: 32px 20px; }
      .banner-title { font-size: 20px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Logo bar -->
    <div class="logo-bar">
      <span class="logo">
        <span class="logo-icon">P</span>
        PulseTrack
      </span>
    </div>

    <!-- Card -->
    <div class="card">

      <!-- Banner -->
      <div class="card-banner">
        <div class="banner-icon">🔐</div>
        <div class="banner-title">Reset Your Password</div>
        <div class="banner-sub">
          No worries — we'll help you get back in.
        </div>
      </div>

      <!-- Body -->
      <div class="card-body">

        <div class="greeting">Hi ${name},</div>

        <div class="message">
          We received a request to reset the password for your PulseTrack account.
          Click the button below to create a new password. If you didn't make this
          request, you can safely ignore this email.
        </div>

        <!-- CTA -->
        <div class="btn-wrap">
          <a href="${resetLink}" class="btn">🔑 Reset My Password</a>
        </div>

        <!-- Expire warning -->
        <div class="expire-box">
          <span class="expire-icon">⏰</span>
          <div class="expire-text">
            This link will expire in <strong>${expiresIn}</strong>.
            After that, you'll need to request a new reset link.
          </div>
        </div>

        <div class="divider"></div>

        <!-- Fallback link -->
        <div class="fallback">
          Button not working? Copy and paste this link into your browser:<br/>
          <a href="${resetLink}">${resetLink}</a>
        </div>

        <!-- Security note -->
        <div class="security-box">
          <span>🛡️</span>
          <div class="security-text">
            If you did not request a password reset, please ignore this email or
            contact our support team immediately. Your account security is our
            top priority.
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        © ${new Date().getFullYear()} PulseTrack. All rights reserved.<br/>
        You received this email because a password reset was requested for your account.
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Support</a>
      </div>
    </div>

  </div>
</body>
</html>
  `;
}

export async function sendForgotPasswordEmail({ toEmail, name, resetToken }) {
  const resetLink = `${process.env
    .CLIENT_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"PulseTrack" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "🔐 Reset your PulseTrack password",
    html: forgotPasswordTemplate({ name, resetLink, expiresIn: "15 minutes" })
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Password reset email sent:", info.messageId);
  return info;
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}
