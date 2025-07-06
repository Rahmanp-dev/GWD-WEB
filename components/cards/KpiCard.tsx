import { ReactNode } from "react";
import { GlassCard } from "../ui/GlassCard";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <GlassCard className="flex items-center gap-4 p-4">
      {icon && <div className="text-3xl text-neonRed">{icon}</div>}
      <div>
        <div className="text-lg font-semibold text-gray-700">{title}</div>
        <div className="text-2xl font-bold text-black">{value}</div>
      </div>
    </GlassCard>
  );
}
