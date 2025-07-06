import Inquiry from "@/lib/models/Inquiry";
import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("[API] /admin/analytics GET: Connecting to DB...");
  await connectToDB();
  console.log("[API] /admin/analytics GET: Connected. Fetching analytics...");
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const dateFilter = start && end ? {
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end)
    }
  } : {};

  // 1. Inquiries per week
  const inquiriesByWeek = await Inquiry.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          week: { $isoWeek: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.week": 1 } },
  ]);

  // 2. Projects by service
  const projectsByService = await Project.aggregate([
    { $match: dateFilter },
    { $group: { _id: "$service", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // 3. Budget brackets
  const budgetBrackets = await Project.aggregate([
    { $match: dateFilter },
    { $group: { _id: "$budget", count: { $sum: 1 } } },
  ]);

  // 4. Usage heatmap (hour of day)
  const usageHeatmap = await Inquiry.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: { hour: { $hour: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.hour": 1 } },
  ]);

  console.log("[API] /admin/analytics GET: Returning analytics data.");
  return NextResponse.json({
    inquiriesByWeek,
    projectsByService,
    budgetBrackets,
    usageHeatmap,
  });
}

export async function POST(req: NextRequest) {
  console.log("[API] /admin/analytics POST: Export requested.");
  // CSV/PDF export stub
  return NextResponse.json({ success: true, url: "/api/admin/analytics/export.csv" });
} 