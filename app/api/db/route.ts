import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("eazyplan");
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      success: true,
      collections: collections.map((col) => col.name),
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}
