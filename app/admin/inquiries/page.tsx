"use client";

import FreelancerTable, {
  FreelancerRequest,
} from "@/components/tables/FreelancerTable";
import InquiryTable from "@/components/tables/InquiryTable";
import { IInquiry } from "@/lib/models/Inquiry";
// @ts-ignore
import Papa from "papaparse";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.message || "Failed to fetch data");
    }
    // The requests route returns { success: true, data: [...] }
    return payload.data;
  });

const services = [
  "Web Dev",
  "App Dev",
  "Marketing",
  "3D & Motion",
  "Video Edit",
  "AI Tools",
  "DevOps",
  "Security",
];
const statuses = ["new", "contacted", "approved", "rejected"];

const domainOptions = [
  "Full Stack Web Development (MERN / Next.js)",
  "App Development (Flutter / React Native / Android / iOS)",
  "Website Deployment & Hosting (Netlify, Vercel, AWS, etc.)",
  "Game Development (Unity / Unreal Engine)",
  "3D Animation / 3D Modeling (Blender, Maya, Cinema 4D)",
  "Video Editing (Premiere Pro, Final Cut, After Effects)",
  "Graphic Design (Photoshop, Illustrator, Figma)",
  "Programming (Python, Java, C++, etc.)",
  "UI/UX Design",
  "Other:",
];

export default function InquiriesPage() {
  const [tab, setTab] = useState<"client" | "freelancer">("client");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [domainFilter, setDomainFilter] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<any | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch clients
  const {
    data: clientRequests,
    error: clientError,
    mutate: mutateClients,
  } = useSWR<IInquiry[]>(
    tab === "client" ? `/api/admin/requests?type=client` : null,
    fetcher
  );
  // Fetch freelancers
  const {
    data: freelancerRequests,
    error: freelancerError,
    mutate: mutateFreelancers,
  } = useSWR<FreelancerRequest[]>(
    tab === "freelancer" ? `/api/admin/requests?type=freelancer` : null,
    fetcher
  );

  // Actions for clients
  const updateClientStatus = async (ids: string[], status: string) => {
    const promise = fetch(`/api/admin/requests`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, action: status }),
    });
    toast.promise(promise, {
      loading: "Updating status...",
      success: `Status updated!`,
      error: "Failed to update status.",
    });
    try {
      await promise;
      mutateClients();
    } catch {}
  };
  // Actions for freelancers
  const updateFreelancerStatus = async (ids: string[], status: string) => {
    const promise = fetch(`/api/admin/requests`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, action: status }),
    });
    toast.promise(promise, {
      loading: "Updating status...",
      success: `Status updated!`,
      error: "Failed to update status.",
    });
    try {
      await promise;
      mutateFreelancers();
    } catch {}
  };

  // CSV export for clients
  const exportClientsCSV = () => {
    const csv = Papa.unparse(
      (clientRequests || []).map((r) => ({
        Name: r.name,
        Email: r.email,
        Service: r.service,
        Budget: r.budget,
        Status: r.status,
        Date: new Date(r.createdAt).toLocaleDateString(),
      }))
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "client_inquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtering logic
  const filteredClients = useMemo(() => {
    let data = clientRequests ?? [];
    if (search) {
      data = data.filter(
        (r) =>
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.email?.toLowerCase().includes(search.toLowerCase()) ||
          r.service?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter.length > 0) {
      data = data.filter((r) => statusFilter.includes(r.status));
    }
    return data;
  }, [clientRequests, search, statusFilter]);

  const filteredFreelancers = useMemo(() => {
    let data = freelancerRequests ?? [];
    if (search) {
      data = data.filter(
        (r) =>
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.email?.toLowerCase().includes(search.toLowerCase()) ||
          (r.skills || [])
            .join(",")
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    if (statusFilter.length > 0) {
      data = data.filter((r) => statusFilter.includes(r.status));
    }
    if (domainFilter.length > 0) {
      data = data.filter((r) =>
        (r.skills || []).some((d: string) => domainFilter.includes(d))
      );
    }
    return data;
  }, [freelancerRequests, search, statusFilter, domainFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter([]);
    setDomainFilter([]);
  };

  // Modal close on Esc or click outside
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedClient(null);
        setSelectedFreelancer(null);
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        setSelectedClient(null);
        setSelectedFreelancer(null);
      }
    };
    if (selectedClient || selectedFreelancer) {
      document.addEventListener("keydown", handleKey);
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [selectedClient, selectedFreelancer]);

  if (
    (tab === "client" && clientError) ||
    (tab === "freelancer" && freelancerError)
  )
    return <div className="text-red-500 font-medium">Error loading data.</div>;
  if (
    (tab === "client" && !clientRequests) ||
    (tab === "freelancer" && !freelancerRequests)
  )
    return <div className="text-gray-700">Loading...</div>;

  return (
    <div className="bg-black/80 dark:bg-black/90 min-h-screen p-6 rounded-2xl shadow-2xl border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white drop-shadow mb-6">
          Inquiries & Applications
        </h1>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold border transition-all ${
            tab === "client"
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setTab("client")}
        >
          Clients
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border transition-all ${
            tab === "freelancer"
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setTab("freelancer")}
        >
          Freelancers
        </button>
      </div>
      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, service, or skills..."
          className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none min-w-[220px]"
        />
        <div className="flex gap-2 items-center">
          {statuses.map((s) => (
            <button
              key={s}
              className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                statusFilter.includes(s)
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() =>
                setStatusFilter((f) =>
                  f.includes(s) ? f.filter((x) => x !== s) : [...f, s]
                )
              }
              type="button"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        {tab === "freelancer" && (
          <select
            multiple
            value={domainFilter}
            onChange={(e) =>
              setDomainFilter(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-red-500 focus:outline-none min-w-[180px]"
          >
            {domainOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow"
        >
          Reset Filters
        </button>
      </div>
      {tab === "client" && (
        <>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={exportClientsCSV}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform"
            >
              Export CSV
            </button>
          </div>
          <InquiryTable
            inquiries={filteredClients}
            onView={setSelectedClient}
            onMarkContacted={(id: string) =>
              updateClientStatus([id], "contacted")
            }
            onApprove={(id: string) => updateClientStatus([id], "approved")}
            onBatchAction={(action: string) =>
              updateClientStatus(
                (filteredClients ?? []).map((r) => r._id as string),
                action
              )
            }
          />
        </>
      )}
      {tab === "freelancer" && (
        <>
          <FreelancerTable
            requests={filteredFreelancers}
            onView={setSelectedFreelancer}
            onApprove={(id: string) => updateFreelancerStatus([id], "approved")}
            onReject={(id: string) => updateFreelancerStatus([id], "rejected")}
            onBatchAction={(action: string, ids: string[]) =>
              updateFreelancerStatus(ids, action)
            }
          />
        </>
      )}
      {/* Details Modal */}
      {(selectedClient || selectedFreelancer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-white/80 rounded-2xl shadow-2xl max-w-lg w-full p-8 glass-panel relative animate-fade-in"
          >
            <button
              onClick={() => {
                setSelectedClient(null);
                setSelectedFreelancer(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>
            {selectedClient && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">
                  Client Inquiry
                </h2>
                <div className="mb-2">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedClient.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedClient.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Service:</span>{" "}
                  {selectedClient.service}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Budget:</span>{" "}
                  {selectedClient.budget}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedClient.status}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Details:</span>{" "}
                  {selectedClient.details}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selectedClient.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={`mailto:${selectedClient.email}`}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600"
                  >
                    Message
                  </a>
                  <button
                    onClick={() => {
                      updateClientStatus([selectedClient._id], "approved");
                      setSelectedClient(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateClientStatus([selectedClient._id], "rejected");
                      setSelectedClient(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-400"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
            {selectedFreelancer && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">
                  Freelancer Application
                </h2>
                <div className="mb-2">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedFreelancer.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedFreelancer.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedFreelancer.phone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">City:</span>{" "}
                  {selectedFreelancer.city}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Experience:</span>{" "}
                  {selectedFreelancer.experience} years
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Skills:</span>{" "}
                  {(selectedFreelancer.skills || []).join(", ")}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Portfolio:</span>{" "}
                  {selectedFreelancer.githubOrPortfolio && (
                    <a
                      href={selectedFreelancer.githubOrPortfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Portfolio Link
                    </a>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Work Samples:</span>{" "}
                  {selectedFreelancer.workSamples && (
                    <a
                      href={selectedFreelancer.workSamples}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Samples
                    </a>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedFreelancer.status}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Cover Letter:</span>{" "}
                  {selectedFreelancer.coverLetter}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selectedFreelancer.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={`mailto:${selectedFreelancer.email}`}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600"
                  >
                    Message
                  </a>
                  <button
                    onClick={() => {
                      updateFreelancerStatus(
                        [selectedFreelancer._id],
                        "approved"
                      );
                      setSelectedFreelancer(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateFreelancerStatus(
                        [selectedFreelancer._id],
                        "rejected"
                      );
                      setSelectedFreelancer(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-400"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
