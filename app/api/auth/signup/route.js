import db from "@/app/utils/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // 1. Generate unique username
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedUsername = name.split(' ')[0].toLowerCase() + randomNum;

    // 2. Check if user exists
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to DB
    await db.query(
      "INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, generatedUsername]
    );

    // 5. Nodemailer (Secure with ENV)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Anantya Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Anantya Hub - Your Login Credentials",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h3>Hello ${name},</h3>
          <p>Your account has been created successfully on Anantya Knowledge Hub.</p>
          <p><strong>Your Login Credentials:</strong></p>
          <ul style="background: #f9f9f9; padding: 15px; border-radius: 8px; list-style: none;">
            <li><strong>Username:</strong> ${generatedUsername}</li>
            <li><strong>Password:</strong> ${password}</li>
          </ul>
          <p>You can now login here: <a href="https://knowledge-hub.anantya.ai/">Login to Portal</a></p>
          <br>
          <p>Regards,<br>Team Anantya AI</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Registration successful and email sent!" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Registration failed", error: error.message }, { status: 500 });
  }
}