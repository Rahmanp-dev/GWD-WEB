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
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  domain:       { type: String, enum: ["web","3d","security","video","mobile"], required: true },
  description:  { type: String },
  images:       [String],
  videoUrl:     String,
  tags:         [String],
  date:         { type: Date, default: Date.now },
  featured:     { type: Boolean, default: false },
  status:       { type: String, enum: ["draft", "published"], default: "draft" },
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
  },
  revisions: [RevisionSchema],
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema); 