const formidable = require("formidable");
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
const path = require("path");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await fs.promises.mkdir(uploadDir, { recursive: true });
    const form = new formidable.IncomingForm({ multiples: true, uploadDir, keepExtensions: true });

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(500).json({ error: err.message });
      }
      const uploaded = [];
      for (const key in files) {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        if (!file || !file.mimetype) continue;
        if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) continue;
        const url = `/uploads/${path.basename(file.filepath)}`;
        uploaded.push(url);
      }
      res.status(200).json({ urls: uploaded });
    });
  } catch (e: any) {
    console.error("Upload handler exception:", e);
    res.status(500).json({ error: e.message });
  }
} 