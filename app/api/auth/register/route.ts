import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eazyplan");
    const usersCollection = db.collection<User>("users");

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Account already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiration,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    await transporter.sendMail({
      from: `"EazyPlan Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your EazyPlan Account",
      text: `Your verification code is: ${otp}`,
      html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
    });

    return NextResponse.json(
      { status: true, message: "Account registered. OTP sent to email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign up error", error);
    return NextResponse.json(
      { success: false, message: "Failed to register user" },
      { status: 500 }
    );
  }
}
