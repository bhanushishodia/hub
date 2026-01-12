import  db  from "@/app/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 1. Find user with valid token and check if it hasn't expired
    const result = await db.query(
      "SELECT id FROM users WHERE reset_token = $1 AND token_expiry > NOW()",
      [token]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Token is invalid or has expired." },
        { status: 400 }
      );
    }

    const userId = result.rows[0].id;

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update password and clear the reset token
    await db.query(
      "UPDATE users SET password = $1, reset_token = NULL, token_expiry = NULL WHERE id = $2",
      [hashedPassword, userId]
    );

    return NextResponse.json({ message: "Password updated successfully! Redirecting to login..." });

  } catch (error: unknown) {
    console.error("RESET_ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}