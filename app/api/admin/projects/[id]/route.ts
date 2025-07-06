import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const project = await Project.findById(params.id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch project', details: (err as any)?.message || err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    // Slug uniqueness (if changed)
    const existing = await Project.findOne({ slug: data.slug, _id: { $ne: params.id } });
    if (existing) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update project', details: (err as any)?.message || err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete project', details: (err as any)?.message || err }, { status: 500 });
  }
} 