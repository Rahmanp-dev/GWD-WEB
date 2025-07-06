import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  const query: any = {};
  if (domain) query.domain = domain;
  const projects = await Project.find(query).sort({ date: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  await connectToDB();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project);
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