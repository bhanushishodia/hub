import  db  from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. Search for the user in the database
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1", 
      [email]
    );

    const user = result.rows[0];

    // 2. Check if user exists
    if (!user) {
      return NextResponse.json({ message: "Invalid Email or Username" }, { status: 401 });
    }

    // 3. Compare the provided password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
    }

    // 4. Login Successful
    // CHANGE: Replaced 'user' with user.role to fetch the actual role from the database
    return NextResponse.json({ 
      message: "Login successful!", 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role || 'user' // This will now take the role from your DB table
      } 
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}