import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();
  const url = new URL(req.url);
  const domain = url.searchParams.get("domain");
  const featured = url.searchParams.get("featured");
  const status = url.searchParams.get("status");
  const filter: any = {};
  if (domain && domain !== "all") filter.domain = domain;
  if (featured === "true") filter.featured = true;
  if (status) filter.status = status;
  const projects = await Project.find(filter).sort({ yearEnd: -1 });
  return NextResponse.json(
    projects.map((p) => ({
      id: p._id,
      title: p.title,
      slug: p.slug,
      domain: p.domain,
      yearStart: p.yearStart,
      yearEnd: p.yearEnd,
      mediaUrls: p.mediaUrls,
      descriptionMarkdown: p.descriptionMarkdown,
      featured: p.featured,
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  // In a real app, you would save this to a database
  console.log('New portfolio item:', body);
  return NextResponse.json({ message: 'Portfolio item created successfully' }, { status: 201 });
} 