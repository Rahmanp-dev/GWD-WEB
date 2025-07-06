import mongoose from "mongoose";

const RevisionSchema = new mongoose.Schema({
  description: String,
  images: [String],
  videoUrl: String,
  tags: [String],
  date: Date,
  updatedAt: { type: Date, default: Date.now },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  domain: { type: String, enum: ["web", "mobile", "3d", "security", "video", "game"], required: true },
  yearStart: { type: Number, required: true },
  yearEnd: { type: Number, required: true },
  mediaUrls: { type: [String], default: [] },
  descriptionMarkdown: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  description:  { type: String },
  images:       [String],
  videoUrl:     String,
  tags:         [String],
  date:         { type: Date, default: Date.now },
  status:       { type: String, enum: ["draft", "published"], default: "draft" },
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
  },
  revisions: [RevisionSchema],
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema); 