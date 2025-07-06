"use client";

import { KpiCard } from "@/components/cards/KpiCard";
import { IInquiry } from "@/lib/models/Inquiry";
import { BarChart, Inbox, Users } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DashboardData {
  inquiryCount: number;
  activeProjectCount: number;
  clientCount: number;
  recentInquiries: IInquiry[];
}

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardData>(
    "/api/admin/dashboard",
    fetcher
  );

  if (error)
    return <div className="text-red-500">Failed to load dashboard data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard
          title="Total Inquiries"
          value={data.inquiryCount}
          icon={<Inbox />}
        />
        <KpiCard
          title="Active Projects"
          value={data.activeProjectCount}
          icon={<BarChart />}
        />
        <KpiCard
          title="Total Clients"
          value={data.clientCount}
          icon={<Users />}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Inquiries</h2>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {data.recentInquiries.length > 0 ? (
              data.recentInquiries.map((inquiry) => (
                <li
                  key={String(inquiry._id)}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">{inquiry.service}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <p className="p-4 text-gray-500">No recent inquiries found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
