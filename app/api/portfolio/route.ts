import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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
  } catch (error: any) {
    console.error("Error fetching portfolio projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch portfolio projects", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();
    const newProject = new Project(body);
    await newProject.save();
    return NextResponse.json({ message: "Portfolio item created successfully", data: newProject }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json(
      { message: "Failed to create portfolio item", error: error.message },
      { status: 500 }
    );
  }
}
