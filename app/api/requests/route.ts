import Request from "@/lib/models/Request";
import { connectToDB } from "@/lib/mongodb";
import formidable from "formidable";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";

console.log("DEBUG MONGODB_URI:", process.env.MONGODB_URI);

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const preferredRegion = "auto";
export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

// Helper to convert NextRequest to Node.js IncomingMessage for formidable
function nextRequestToNodeRequest(req: NextRequest): any {
  const body = req.body as any;
  const readable = Readable.from(body);
  const nodeReq: any = Object.assign(readable, req);
  nodeReq.headers = Object.fromEntries(req.headers.entries());
  return nodeReq;
}

export async function GET(req: NextRequest) {
  try {
    console.log("🔄 Fetching all requests...");
    
    await connectToDB();
    console.log("✅ MongoDB connection established");
    
    const requests = await Request.find({}).sort({ createdAt: -1 });
    
    console.log(`✅ Retrieved ${requests.length} requests from database`);
    
    return NextResponse.json({ 
      success: true, 
      data: requests,
      count: requests.length
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error in GET /api/requests:", error);
    
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to fetch requests" 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      // Freelancer: handle file upload
      const form = formidable({ multiples: false, uploadDir, keepExtensions: true });
      const [fields, files] = await new Promise<any[]>((resolve, reject) => {
        form.parse(nextRequestToNodeRequest(req), (err: any, fields: any, files: any) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });
      console.log("[POST /api/requests] Formidable fields:", fields);
      console.log("[POST /api/requests] Formidable files:", files);
      // Validate required fields
      const required = ["name", "email", "phone", "city", "githubOrPortfolio", "skills", "experience", "skillDescription", "workSamples", "coverLetter", "resume"];
      const missing = required.filter((f) => {
        if (f === "resume") {
          return !files.resume || !files.resume[0];
        }
        return !fields[f] || !fields[f][0];
      });
      if (missing.length > 0) {
        console.error("[POST /api/requests] Missing required fields:", missing);
        return NextResponse.json({ success: false, message: "Missing required fields", missing }, { status: 400 });
      }
      // Save file and build doc
      let resumeUrl = "";
      if (files.resume && files.resume[0]) {
        const file = files.resume[0];
        const filename = path.basename(file.filepath);
        resumeUrl = `/uploads/${filename}`;
      }
      // Properly extract all fields
      const doc = {
        name: fields.name[0],
        email: fields.email[0],
        phone: fields.phone[0],
        city: fields.city[0],
        githubOrPortfolio: fields.githubOrPortfolio[0],
        skills: Array.isArray(fields.skills) ? (fields.skills[0] || "").split(/,(?![^()]*\))/).map((d: string) => d.trim()).filter(Boolean) : [],
        experience: Number(fields.experience[0]),
        skillDescription: fields.skillDescription[0],
        workSamples: fields.workSamples[0],
        coverLetter: fields.coverLetter[0],
        resumeUrl,
        type: "freelancer",
        status: "new",
        createdAt: new Date()
      };
      console.log("[POST /api/requests] Document to create:", doc);
      const created = await Request.create(doc);
      return NextResponse.json({ success: true, data: created, message: "Freelancer application submitted" }, { status: 200 });
    } else {
      // Client: JSON
      const body = await req.json();
      const requiredFields = ["name", "email", "service", "details", "budget"];
      const missingFields = requiredFields.filter((field) => !body[field]);
      if (missingFields.length > 0) {
        console.error("[POST /api/requests] Missing required fields:", missingFields);
        return NextResponse.json({ success: false, message: "Missing required fields", missingFields }, { status: 400 });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        console.error("[POST /api/requests] Invalid email format:", body.email);
        return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
      }
      const createdRequest = await Request.create(body);
      return NextResponse.json({ success: true, data: createdRequest, message: "Request submitted successfully" }, { status: 200 });
    }
  } catch (error: any) {
    console.error("[POST /api/requests] Server error:", error);
    if (error && error.stack) console.error(error.stack);
    return NextResponse.json({ success: false, message: error.message || "An unknown server error occurred." }, { status: 500 });
  }
} 