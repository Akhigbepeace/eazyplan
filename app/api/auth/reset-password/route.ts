import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const { token, email, password } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { status: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eazyplan");
    const usersCollection = db.collection<User>("users");

    const user = await usersCollection.findOne({ email });

    if (!user || user.resetToken !== token) {
      return NextResponse.json(
        { status: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const now = new Date();
    if (user.resetTokenExpiry && user.resetTokenExpiry < now) {
      return NextResponse.json(
        { status: false, message: "Token has expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      }
    );

    return NextResponse.json(
      { status: true, message: "Password successfully reset" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error resetting password:", error);
    return NextResponse.json(
      { status: false, message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
