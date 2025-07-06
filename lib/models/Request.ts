import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    match: [/.+\@.+\..+/, "Please enter a valid email address."],
  },
  phone: String,
  service: {
    type: String,
  },
  budget: {
    type: String,
  },
  timeline: {
    startDate: Date,
    endDate: Date,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "approved", "rejected"],
    default: "new",
  },
  type: {
    type: String,
    enum: ["client", "freelancer"],
    required: true,
  },
  city: String,
  experience: Number,
  skills: [String],
  resumeUrl: String,
  coverLetter: String,
  githubOrPortfolio: {
    type: String,
    required: function(this: any) { return this.type === 'freelancer'; },
  },
  workSamples: {
    type: String,
    required: function(this: any) { return this.type === 'freelancer'; },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Request || mongoose.model("Request", RequestSchema); 