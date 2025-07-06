"use client";

import { IInquiry } from "@/lib/models/Inquiry";
import { motion } from "framer-motion";
import { Mail, Slack } from "lucide-react";
import { useState } from "react";
import { GlassInput } from "../ui/GlassInput";
import { NeonButton } from "../ui/NeonButton";

interface InquiryDetailsProps {
  inquiry: IInquiry | null;
  onClose: () => void;
}

const InquiryDetails = ({ inquiry, onClose }: InquiryDetailsProps) => {
  const [slackSent, setSlackSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      {/* Backdrop (left side, fills except sidebar width) */}
      <div
        className="flex-grow bg-black/20"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Sidebar (right side, slides in) */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="max-w-[400px] w-full h-full flex flex-col glass-panel shadow-xl bg-white/90 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="self-end mt-2 mr-2"
          aria-label="Close details panel"
        >
          ✕
        </button>
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold mb-2">{inquiry?.name}</h2>
          <div className="mb-4">{inquiry?.service}</div>
          <label className="block mb-2">Admin Notes</label>
          <GlassInput placeholder="Add notes..." />
          <label className="block mt-4 mb-2">Schedule Follow-Up</label>
          <GlassInput type="date" />
          <div className="flex gap-2 mt-4">
            <NeonButton
              as="a"
              href={`mailto:${
                inquiry?.email
              }?subject=Re: Your Enquiry&body=${encodeURIComponent(
                inquiry?.service || ""
              )}`}
            >
              <Mail className="inline mr-1" /> Send Email
            </NeonButton>
            <NeonButton
              onClick={() => {
                setSlackSent(true);
                setTimeout(() => setSlackSent(false), 2000);
              }}
            >
              <Slack className="inline mr-1" /> Slack Notification
            </NeonButton>
          </div>
          {slackSent && (
            <div className="mt-4 text-center text-neonRed font-semibold">
              Slack notification sent!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InquiryDetails;
