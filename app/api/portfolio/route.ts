import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  const featured = searchParams.get("featured");
  const query: any = { status: "published" };
  if (domain) query.domain = domain;
  if (featured === "true") query.featured = true;
  const projects = await Project.find(query).sort({ date: -1 });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  // In a real app, you would save this to a database
  console.log('New portfolio item:', body);
  return NextResponse.json({ message: 'Portfolio item created successfully' }, { status: 201 });
} 