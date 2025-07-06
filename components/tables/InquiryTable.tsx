"use client";

import { IInquiry } from "@/lib/models/Inquiry";
import { CheckCircle, Edit, Eye, Loader2 } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";

interface InquiryTableProps {
  inquiries: IInquiry[];
  onView: (inquiry: IInquiry) => void;
  onMarkContacted: (id: string) => void;
  onApprove: (id: string) => void;
  onBatchAction: (action: string) => void;
  loading?: boolean;
}

const InquiryTable = ({
  inquiries,
  onView,
  onMarkContacted,
  onApprove,
  onBatchAction,
  loading,
}: InquiryTableProps) => {
  const getStatusChip = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <GlassCard motionProps={{ transition: { delay: 0.08 } }}>
      <div className="flex gap-2 mb-4 flex-wrap">
        <NeonButton
          onClick={() => onBatchAction("contacted")}
          aria-label="Mark selected as Contacted"
          title="Mark selected as Contacted"
          className="min-w-[120px]"
        >
          Mark Contacted
        </NeonButton>
        <NeonButton
          onClick={() => onBatchAction("approved")}
          aria-label="Approve selected"
          title="Approve selected"
          className="min-w-[120px]"
        >
          Approve
        </NeonButton>
        <NeonButton
          onClick={() => onBatchAction("delete")}
          aria-label="Delete selected"
          title="Delete selected"
          className="min-w-[120px]"
        >
          Delete
        </NeonButton>
      </div>
      <div className="overflow-x-auto" aria-live="polite">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 text-white rounded-xl shadow-xl">
          <thead className="bg-gray-800/90 text-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/70 divide-y divide-gray-800 text-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <Loader2
                    className="mx-auto animate-spin text-red-500"
                    size={32}
                  />
                  <div className="mt-2 text-gray-500">Loading...</div>
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      width="48"
                      height="48"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2m0 0a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2"
                      />
                    </svg>
                    <span className="text-gray-400 text-lg">
                      No inquiries found
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr
                  key={inquiry._id as string}
                  className="hover:bg-gray-800/80 focus-within:bg-gray-700/80 transition-colors duration-200 cursor-pointer"
                  tabIndex={0}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {inquiry.name}
                    </div>
                    <div className="text-sm text-gray-400">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {inquiry.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${getStatusChip(
                        inquiry.status || "new"
                      )}`}
                      tabIndex={0}
                      aria-label={`Status: ${inquiry.status || "new"}`}
                    >
                      {inquiry.status || "new"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                    <button
                      onClick={() => onView(inquiry)}
                      className="text-indigo-400 hover:text-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded transition-colors px-2 py-1"
                      aria-label={`View inquiry from ${inquiry.name}`}
                      title={`View inquiry from ${inquiry.name}`}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onMarkContacted(inquiry._id as string)}
                      className="text-yellow-400 hover:text-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded transition-colors px-2 py-1"
                      aria-label={`Mark ${inquiry.name} as contacted`}
                      title={`Mark ${inquiry.name} as contacted`}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onApprove(inquiry._id as string)}
                      className="text-green-400 hover:text-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded transition-colors px-2 py-1"
                      aria-label={`Approve inquiry from ${inquiry.name}`}
                      title={`Approve inquiry from ${inquiry.name}`}
                    >
                      <CheckCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default InquiryTable;
