import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { domain: string, slug: string } }) {
  await connectToDB();
  const { domain, slug } = params;
  const project = await Project.findOne({ domain, slug, status: "published" });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
} 