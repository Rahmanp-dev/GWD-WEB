import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
  type: 'client' | 'freelancer';
  name: string;
  email: string;
  phone: string;
  // Client fields
  company?: string;
  service?: string;
  details?: string;
  budget?: string;
  timeline?: { from?: Date; to?: Date };
  // Freelancer fields
  city?: string;
  experience?: string;
  skills?: string[];
  resume?: string; // URL to the resume
  coverLetter?: string;
  skillDescription?: string;
  githubOrPortfolio?: string;
  workSamples?: string; // URL to work samples
}

const RequestSchema: Schema = new Schema({
  type: { type: String, required: true, enum: ['client', 'freelancer'] },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  service: { type: String },
  details: { type: String },
  budget: { type: String },
  timeline: { from: { type: Date }, to: { type: Date } },
  city: { type: String },
  experience: { type: String },
  skills: [{ type: String }],
  resume: { type: String },
  coverLetter: { type: String },
  skillDescription: { type: String },
  githubOrPortfolio: { type: String },
  workSamples: { type: String },
}, { timestamps: true });

export default mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);
