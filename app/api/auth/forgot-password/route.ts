import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import { User } from "@/lib/models/User";
import { sendResetPasswordEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { status: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eazyplan");
    const usersCollection = db.collection<User>("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { status: false, message: "User not found" },
        { status: 404 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000);

    await usersCollection.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry: tokenExpiry,
        },
      }
    );

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}&email=${email}`;
    await sendResetPasswordEmail(email, resetLink);

    return NextResponse.json(
      { status: true, message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Forgot Password", error);
    return NextResponse.json(
      { status: false, message: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}
