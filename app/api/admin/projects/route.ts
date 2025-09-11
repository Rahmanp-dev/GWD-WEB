import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";

// GET all projects
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ date: -1 }); // Sort by date
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to fetch projects", error: message }, { status: 500 });
  }
}

// POST a new project
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const {
      title,
      slug,
      domain,
      descriptionMarkdown,
      tags,
      date,
      featured,
      status,
      yearStart,
      yearEnd,
      mediaUrls,
    } = body;

    if (!title || !slug || !descriptionMarkdown) {
      return NextResponse.json({ message: "Title, Slug, and Description are required." }, { status: 400 });
    }

    const existing = await Project.findOne({ slug });
    if (existing) {
      return NextResponse.json({ message: "Slug must be unique." }, { status: 409 }); // 409 Conflict
    }

    const newProject = new Project({
      title,
      slug,
      domain,
      descriptionMarkdown,
      tags,
      date,
      featured,
      status,
      yearStart,
      yearEnd,
      mediaUrls,
    });

    await newProject.save();
    return NextResponse.json({ message: "Project created successfully", data: newProject }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to create project", error: message }, { status: 500 });
  }
}

// PUT (update) an existing project
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Project ID is required for an update." }, { status: 400 });
    }

    const body = await req.json();

    // Optional: Check for slug uniqueness if it's being changed
    if (body.slug) {
      const existing = await Project.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ message: "Slug must be unique." }, { status: 409 });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated successfully", data: updatedProject }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to update project", error: message }, { status: 500 });
  }
}


// DELETE a project by ID
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Project ID is required for deletion." }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to delete project", error: message }, { status: 500 });
  }
}
