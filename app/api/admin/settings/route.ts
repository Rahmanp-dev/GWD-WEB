import { NextRequest, NextResponse } from "next/server";

// In-memory stub for settings (replace with DB in production)
let settings = {
  theme: "light",
  roles: [
    { id: "1", name: "Admin", permissions: ["all"] },
    { id: "2", name: "Editor", permissions: ["edit", "view"] },
    { id: "3", name: "Viewer", permissions: ["view"] },
    { id: "4", name: "Super-Admin", permissions: ["all", "manage"] },
  ],
  apiKeys: [
    { id: "abc123", name: "Slack Webhook", value: "xoxb-..." },
    { id: "def456", name: "Email API", value: "key-..." },
  ],
};

export async function GET() {
  console.log("[API] /admin/settings GET: Returning settings.");
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  settings = { ...settings, ...data };
  console.log("[API] /admin/settings PATCH: Updated settings.", data);
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const { apiKey } = await req.json();
  settings.apiKeys.push(apiKey);
  console.log("[API] /admin/settings POST: Added API key.", apiKey);
  return NextResponse.json(settings);
} 