import Inquiry from "@/lib/models/Inquiry";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const filter = type ? { type } : {};
    const requests = await Inquiry.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests, count: requests.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch requests" }, { status: 500 });
  }
}
