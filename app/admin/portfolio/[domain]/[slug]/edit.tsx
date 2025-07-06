"use client";
import { ProjectForm } from "@/components/portfolio/ProjectForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjectPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/portfolio/${params.domain}/${params.slug}`)
      .then((res) => res.json())
      .then(setProject)
      .finally(() => setLoading(false));
  }, [params.domain, params.slug]);

  if (loading) return <div>Loading...</div>;
  if (!project || project.error)
    return <div className="text-red-500">Project not found.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit {project.title}</h1>
      <ProjectForm
        initial={project}
        onSave={async (data) => {
          await fetch(`/api/admin/projects/${project._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...project,
              ...data,
              videoUrl: data.videoUrl ?? project.videoUrl,
            }),
          });
          router.push(`/admin/portfolio/${params.domain}`);
        }}
      />
    </div>
  );
}
