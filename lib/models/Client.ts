import { Document, Schema, model, models } from "mongoose";

export interface IClient extends Document {
  _id: string;
  name: string;
  email: string;
  company?: string;
  createdAt: Date;
  tags: string[];
  notes: string;
  totalSpend: number;
  invoices: { url: string; uploadedAt: Date }[];
  projects: Schema.Types.ObjectId[];
  enquiries: Schema.Types.ObjectId[];
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String },
    tags: [String],
    notes: String,
    totalSpend: Number,
    invoices: [{ url: String, uploadedAt: Date }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    enquiries: [{ type: Schema.Types.ObjectId, ref: "Inquiry" }],
  },
  { timestamps: true }
);

const Client = models.Client || model<IClient>("Client", ClientSchema);

export default Client; 