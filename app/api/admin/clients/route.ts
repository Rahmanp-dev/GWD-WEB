import Client from "@/lib/models/Client";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("[API] /admin/clients GET: Connecting to DB...");
  await connectToDB();
  console.log("[API] /admin/clients GET: Connected. Fetching clients...");
  const clients = await Client.find({}).sort({ createdAt: -1 });
  console.log(`Fetched ${clients.length} clients.`);
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  console.log("[API] /admin/clients POST: Connecting to DB...");
  await connectToDB();
  const data = await req.json();
  const client = await Client.create(data);
  console.log("Created new client:", client._id);
  return NextResponse.json(client);
}

export async function PATCH(req: NextRequest) {
  console.log("[API] /admin/clients PATCH: Connecting to DB...");
  await connectToDB();
  const { ids, data } = await req.json();
  const result = await Client.updateMany({ _id: { $in: ids } }, { $set: data });
  console.log(`Updated ${result.modifiedCount} clients.`);
  return NextResponse.json({ success: true, result });
}

export async function DELETE(req: NextRequest) {
  console.log("[API] /admin/clients DELETE: Connecting to DB...");
  await connectToDB();
  const { ids } = await req.json();
  const result = await Client.deleteMany({ _id: { $in: ids } });
  console.log(`Deleted ${result.deletedCount} clients.`);
  return NextResponse.json({ success: true, result });
} 