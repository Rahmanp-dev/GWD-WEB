import { CheckCircle, Eye, Loader2, Mail, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
// @ts-ignore
import Papa from "papaparse";

export interface FreelancerRequest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  domains?: string[];
  experience?: number;
  skills?: string[];
  githubOrPortfolio?: string;
  workSamples?: string;
  status: string;
  createdAt: string;
}

interface FreelancerTableProps {
  requests: FreelancerRequest[];
  onView: (request: FreelancerRequest) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onBatchAction: (action: string, ids: string[]) => void;
  loading?: boolean;
}

const FreelancerTable = ({
  requests,
  onView,
  onApprove,
  onReject,
  onBatchAction,
  loading,
}: FreelancerTableProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const getStatusChip = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(
      requests.map((r) => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        City: r.city,
        Experience: r.experience,
        Skills: (r.skills || []).join(", "),
        Portfolio: r.githubOrPortfolio,
        WorkSamples: r.workSamples,
        Status: r.status,
        Date: new Date(r.createdAt).toLocaleDateString(),
      }))
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "freelancer_applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelect = (id: string) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]
    );
  };

  return (
    <GlassCard motionProps={{ transition: { delay: 0.08 } }}>
      <div className="flex gap-2 mb-4 flex-wrap">
        <NeonButton onClick={handleExportCSV} className="min-w-[120px]">
          Export CSV
        </NeonButton>
        <NeonButton
          onClick={() => onBatchAction("approved", selected)}
          className="min-w-[120px]"
        >
          Approve
        </NeonButton>
        <NeonButton
          onClick={() => onBatchAction("rejected", selected)}
          className="min-w-[120px]"
        >
          Reject
        </NeonButton>
        <NeonButton
          onClick={() => onBatchAction("delete", selected)}
          className="min-w-[120px]"
        >
          Delete
        </NeonButton>
      </div>
      <div className="overflow-x-auto" aria-live="polite">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 text-white rounded-xl shadow-xl">
          <thead className="bg-gray-800/90 text-white">
            <tr>
              <th className="px-2 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Portfolio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Work Samples
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/70 divide-y divide-gray-800 text-white">
            {loading ? (
              <tr>
                <td colSpan={12} className="py-12 text-center">
                  <Loader2
                    className="mx-auto animate-spin text-red-500"
                    size={32}
                  />
                  <div className="mt-2 text-gray-500">Loading...</div>
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center">
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
                      No freelancer applications found
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-800/80 focus-within:bg-gray-700/80 transition-colors duration-200 cursor-pointer"
                  tabIndex={0}
                >
                  <td className="px-2 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(r._id)}
                      onChange={() => toggleSelect(r._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {r.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {r.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {r.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {r.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {(r.skills || []).join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {r.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                    {typeof r.githubOrPortfolio !== 'undefined' && r.githubOrPortfolio !== null && r.githubOrPortfolio !== '' ? (
                      <a
                        href={r.githubOrPortfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-200"
                      >
                        {r.githubOrPortfolio}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                    {typeof r.workSamples !== 'undefined' && r.workSamples !== null && r.workSamples !== '' ? (
                      <a
                        href={r.workSamples}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-200"
                      >
                        {r.workSamples}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusChip(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                    <button
                      onClick={() => onView(r)}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded transition-colors px-2 py-1"
                      aria-label={`View application from ${r.name}`}
                      title={`View application from ${r.name}`}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onApprove(r._id)}
                      className="text-green-700 hover:text-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded transition-colors px-2 py-1"
                      aria-label={`Approve application from ${r.name}`}
                      title={`Approve application from ${r.name}`}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => onReject(r._id)}
                      className="text-red-700 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded transition-colors px-2 py-1"
                      aria-label={`Reject application from ${r.name}`}
                      title={`Reject application from ${r.name}`}
                    >
                      <ThumbsDown size={18} />
                    </button>
                    <a
                      href={`mailto:${r.email}`}
                      className="text-blue-700 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded transition-colors px-2 py-1"
                      aria-label={`Message ${r.name}`}
                      title={`Message ${r.name}`}
                    >
                      <Mail size={18} />
                    </a>
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

export default FreelancerTable;
