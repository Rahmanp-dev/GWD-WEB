import Inquiry from "@/lib/models/Inquiry";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, message: "Placeholder GET /api/admin/inquiries" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ success: true, message: "Placeholder POST /api/admin/inquiries" });
}

export async function PATCH(req: NextRequest) {
  console.log("[API] /admin/inquiries PATCH: Connecting to DB...");
  await connectToDB();
  const { ids, action } = await req.json();
  let result;
  if (action === "delete") {
    result = await Inquiry.deleteMany({ _id: { $in: ids } });
    console.log(`Deleted ${result.deletedCount} inquiries.`);
  } else {
    result = await Inquiry.updateMany(
      { _id: { $in: ids } },
      { $set: { status: action } }
    );
    console.log(`Updated status for ${result.modifiedCount} inquiries to '${action}'.`);
  }
  return NextResponse.json({ success: true, result });
} 