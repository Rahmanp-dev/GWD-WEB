import dbConnect from "@/lib/db";
import Client from "@/lib/models/Client";
import Inquiry from "@/lib/models/Inquiry";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const [inquiryCount, activeProjectCount, clientCount, recentInquiries] =
      await Promise.all([
        Inquiry.countDocuments(),
        Project.countDocuments({ status: "inProgress" }),
        Client.countDocuments(),
        Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    return NextResponse.json({
      inquiryCount,
      activeProjectCount,
      clientCount,
      recentInquiries,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 