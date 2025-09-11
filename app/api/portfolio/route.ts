import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Corrected: Using the consistent db connection
import Project from "@/lib/models/Project";

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Corrected: Using the consistent db connection function

    const url = new URL(req.url);
    const domain = url.searchParams.get("domain");
    const featured = url.searchParams.get("featured");
    const status = url.searchParams.get("status");

    const filter: any = {};
    if (domain && domain !== "all") filter.domain = domain;
    if (featured === "true") filter.featured = true;
    if (status) filter.status = status;

    const projects = await Project.find(filter).sort({ yearEnd: -1 });

    // Important: Ensure you are sending a valid JSON response
    return NextResponse.json(projects);

  } catch (error: any) {
    console.error("Error fetching portfolio projects:", error);
    // Ensure that even in case of an error, a valid JSON response is sent
    return NextResponse.json(
      { message: "Failed to fetch portfolio projects", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Corrected: Using the consistent db connection function
    const body = await request.json();

    // Create a new project instance
    const newProject = new Project(body);
    await newProject.save();

    return NextResponse.json(
      { message: "Portfolio item created successfully", data: newProject },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json(
      { message: "Failed to create portfolio item", error: error.message },
      { status: 500 }
    );
  }
}
