import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const query: any = {};
    if (domain) query.domain = domain;
    const projects = await Project.find(query).sort({ date: -1 });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch projects', details: (err as any)?.message || err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();
    // Validation
    const required = ['title', 'slug', 'domain', 'yearStart', 'yearEnd', 'mediaUrls', 'descriptionMarkdown'];
    for (const field of required) {
      if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    // Slug uniqueness
    const existing = await Project.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    const project = await Project.create(data);
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create project', details: (err as any)?.message || err }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  console.log("[API] /admin/projects PATCH: Connecting to DB...");
  await connectToDB();
  const { ids, action, stage } = await req.json();
  let result;
  if (action === "delete") {
    result = await Project.deleteMany({ _id: { $in: ids } });
    console.log(`Deleted ${result.deletedCount} projects.`);
  } else if (stage) {
    result = await Project.updateMany(
      { _id: { $in: ids } },
      { $set: { stage } }
    );
    console.log(`Updated stage for ${result.modifiedCount} projects to '${stage}'.`);
  }
  return NextResponse.json({ success: true, result });
} 