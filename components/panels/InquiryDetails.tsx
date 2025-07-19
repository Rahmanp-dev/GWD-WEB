"use client";

import { IInquiry } from "@/lib/models/Inquiry";
import { motion } from "framer-motion";
import { Mail, Slack } from "lucide-react";
import { useState } from "react";
import { GlassInput } from "../ui/GlassInput";
import { NeonButton } from "../ui/NeonButton";
import { GlassFormWrapper } from "../GlassFormWrapper";

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
        className="max-w-[400px] w-full h-full flex flex-col"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <GlassFormWrapper className="h-full flex flex-col">
        <button
          onClick={onClose}
            className="self-end mt-2 mr-2 text-white hover:text-red-500"
          aria-label="Close details panel"
        >
          ✕
        </button>
        <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-2 text-white">{inquiry?.name}</h2>
            <div className="mb-4 text-white/80">{inquiry?.service}</div>
            <label className="block mb-2 text-white/80">Admin Notes</label>
            <GlassInput placeholder="Add notes..." className="bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 shadow transition-all duration-200" />
            <label className="block mt-4 mb-2 text-white/80">Schedule Follow-Up</label>
            <GlassInput type="date" className="bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 shadow transition-all duration-200" />
          <div className="flex gap-2 mt-4">
            <NeonButton
              as="a"
              href={`mailto:${
                inquiry?.email
              }?subject=Re: Your Enquiry&body=${encodeURIComponent(
                inquiry?.service || ""
              )}`}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform text-base focus:outline-none focus:ring-2 focus:ring-red-500/70"
            >
              <Mail className="inline mr-1" /> Send Email
            </NeonButton>
            <NeonButton
              onClick={() => {
                setSlackSent(true);
                setTimeout(() => setSlackSent(false), 2000);
              }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform text-base focus:outline-none focus:ring-2 focus:ring-red-500/70"
            >
              <Slack className="inline mr-1" /> Slack Notification
            </NeonButton>
          </div>
          {slackSent && (
              <div className="mt-4 text-center text-red-400 font-semibold">
              Slack notification sent!
            </div>
          )}
        </div>
        </GlassFormWrapper>
      </motion.div>
    </div>
  );
};

export default InquiryDetails;
