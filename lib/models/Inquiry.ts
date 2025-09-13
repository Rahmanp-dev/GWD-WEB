import { Document, Schema, model, models } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  service: string;
  budget: string;
  status: "new" | "contacted" | "approved";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  followUp?: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    budget: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "approved"],
      default: "new",
    },
    notes: { type: String },
    followUp: { type: Date },
  },
  { timestamps: true }
);

const Inquiry =
  models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;