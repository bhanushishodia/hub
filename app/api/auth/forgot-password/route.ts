import  db  from "@/app/utils/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import crypto from "crypto"; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Check if the user exists in the database
    const result = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Email not found in our database" }, { status: 404 });
    }

    // 2. Token generation
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 Hour expiry

    // Save token and expiry in the database
    await db.query(
      "UPDATE users SET reset_token = $1, token_expiry = $2 WHERE email = $3",
      [token, expiry, email]
    );

    // Create the absolute reset URL
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://knowledge-hub.anantya.ai";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // 3. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // 👈 Enter your Gmail ID here
        // 👈 Enter your 16-digit Google App Password here
      },
    });

    // 4. Send the Email with English content
    await transporter.sendMail({
      from: `"Anantya Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #28a745;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
          <div style="margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset My Password
            </a>
          </div>
          <p>Please note that this link is only valid for <strong>1 hour</strong>.</p>
          <p>If you did not request this, please ignore this email or contact support.</p>
          <br>
          <p>Best Regards,<br>Anantya Team</p>
        </div>`,
    });

    return NextResponse.json({ message: "Reset link sent successfully to your email!" });

  } catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
  console.error("ERROR:", error);
  return NextResponse.json({ message: errorMessage }, { status: 500 });
}
}