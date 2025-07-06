"use client";
import { ProjectForm } from "@/components/portfolio/ProjectForm";
import { useRouter } from "next/navigation";

export default function NewProjectPage({
  params,
}: {
  params: { domain: string };
}) {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New {params.domain} Project</h1>
      <ProjectForm
        initial={{ domain: params.domain }}
        onSave={async (data) => {
          await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, videoUrl: data.videoUrl }),
          });
          router.push(`/admin/portfolio/${params.domain}`);
        }}
      />
    </div>
  );
}
