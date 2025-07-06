"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const COLORS = ["#e53935", "#FFBB28", "#00C49F", "#8884d8", "#FF8042"];

const processInquiryData = (data: any[]) =>
  data.map((item) => ({
    name: `W${item._id.week} ${item._id.year}`,
    inquiries: item.count,
  }));

export default function AnalyticsPage() {
  const { data, error } = useSWR("/api/admin/analytics", fetcher);

  if (error) return <div>Failed to load analytics.</div>;
  if (!data) return <div>Loading...</div>;

  const inquiryData = processInquiryData(data.inquiriesByWeek);
  const projectData = data.projectsByService.map((item: any) => ({
    name: item._id,
    projects: item.count,
  }));
  const budgetData = data.budgetBrackets.map((item: any) => ({
    name: item._id,
    value: item.count,
  }));
  const heatmapData = data.usageHeatmap.map((item: any) => ({
    hour: `${item._id.hour}:00`,
    count: item.count,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <NeonButton>Export CSV</NeonButton>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard
          className="col-span-1 lg:col-span-2"
          motionProps={{ transition: { delay: 0.05 } }}
        >
          <h2 className="text-xl font-semibold mb-4">Inquiries per Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inquiryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke="#e53935"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard motionProps={{ transition: { delay: 0.15 } }}>
          <h2 className="text-xl font-semibold mb-4">Projects by Service</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="#e53935" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard motionProps={{ transition: { delay: 0.25 } }}>
          <h2 className="text-xl font-semibold mb-4">Budget Brackets</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#e53935"
                label
              >
                {budgetData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard motionProps={{ transition: { delay: 0.35 } }}>
          <h2 className="text-xl font-semibold mb-4">Usage Heatmap</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={heatmapData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#e53935" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
