import { db } from "@/app/utils/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

   // 1. Generate username (name + random number)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedUsername = name.split(' ')[0].toLowerCase() + randomNum;

    // 2. Check if the email already exists
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to database (with username)
    await db.query(
      "INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, generatedUsername]
    );

    // 4. Nodemailer setup (for sending emails)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@anantya.ai", // your company email
        pass: "mwwn pgfn azze otcw",     // Google App password created in step 2
      },
    });

    const mailOptions = {
      from: '"Anantya Hub" <aapka-email@anantya.ai>',
      to: email,
      subject: "Welcome to Anantya Hub - Your Login Credentials",
      html: `
        <h3>Hello ${name},</h3>
        <p>Your account has been created successfully.</p>
        <p><strong>Your Credentials:</strong></p>
        <ul>
          <li><strong>Username:</strong> ${generatedUsername}</li>
          <li><strong>Password:</strong> ${password} (As chosen by you)</li>
        </ul>
        <br>
        <p>Login here: <a href="http://localhost:3000">Anantya Hub</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Registration successful and email sent!" }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Registration failed", error: error.message }, { status: 500 });
  }
}