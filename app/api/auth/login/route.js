import db from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🟢 Ab hum sirf username aur password expect kar rahe hain
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Username and Password are required" }, { status: 400 });
    }

    // 1. Search ONLY by username (Email hatane se security badh gayi)
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1", 
      [username]
    );

    const user = result.rows[0];

    // 2. Check if user exists
    if (!user) {
      // 🟢 Generic message rakhein taaki hacker ko pata na chale ki username galat hai ya password
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    // 3. Compare the provided password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    // 4. Login Successful
    return NextResponse.json({ 
      message: "Login successful!", 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        username: user.username, // Username return karein
        role: user.role || 'user' 
      } 
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
