import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eazyplan");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user || user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const now = new Date();

    if (user.otpExpires && new Date(user.otpExpires) < now) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    await usersCollection.updateOne(
      { email },
      { $unset: { otp: "", otpExpires: "" } }
    );

    return NextResponse.json({
      status: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
