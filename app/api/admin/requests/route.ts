import Request from "@/lib/models/Request";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const filter = type ? { type } : {};
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests, count: requests.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch requests" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();
    const { ids, action } = await req.json();
    let update = {};
    if (action === "approve") update = { status: "approved" };
    else if (action === "reject") update = { status: "rejected" };
    else if (action === "contacted") update = { status: "contacted" };
    else throw new Error("Invalid action");
    const result = await Request.updateMany({ _id: { $in: ids } }, { $set: update });
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to update requests" }, { status: 500 });
  }
} 