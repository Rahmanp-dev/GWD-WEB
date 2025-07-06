import Inquiry from "@/lib/models/Inquiry";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const inquiry = await Inquiry.findById(params.id);
  return NextResponse.json(inquiry);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const data = await req.json();
  const inquiry = await Inquiry.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(inquiry);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  await Inquiry.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
} 