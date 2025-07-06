"use client";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PortfolioDomainPage({
  params,
}: {
  params: { domain: string };
}) {
  const { domain } = params;
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const {
    data: projects,
    error,
    mutate,
  } = useSWR(`/api/admin/projects?domain=${domain}`, fetcher);

  if (error)
    return <div className="text-red-500">Failed to load projects.</div>;
  if (!projects) return <div>Loading...</div>;

  // Filter projects client-side for search/tag/date/featured
  const filtered = projects.filter(
    (p: any) =>
      (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
      (!tag || (p.tags || []).includes(tag)) &&
      (!date || format(new Date(p.date), "yyyy-MM-dd") === date) &&
      (!showFeaturedOnly || p.featured)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold capitalize">{domain} Projects</h1>
        <Link href={`/admin/portfolio/${domain}/new`}>
          <NeonButton>Add Project</NeonButton>
        </Link>
      </div>
      <GlassCard className="bg-white/10 dark:bg-[#18181c]/80 backdrop-blur-xl border border-red-500/30 shadow-xl">
        <div className="flex gap-4 mb-4 items-center">
          <label htmlFor="search" className="sr-only">
            Search by title
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-glass w-48 focus:ring-2 focus:ring-pink-300"
            aria-label="Search by title"
          />
          <label htmlFor="tag" className="sr-only">
            Tag
          </label>
          <input
            id="tag"
            type="text"
            placeholder="Tag..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="input-glass w-32 focus:ring-2 focus:ring-pink-300"
            aria-label="Filter by tag"
          />
          <label htmlFor="date" className="sr-only">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-glass w-40 focus:ring-2 focus:ring-pink-300"
            aria-label="Filter by date"
          />
          <label
            htmlFor="show-featured"
            className="flex items-center gap-2 ml-4 cursor-pointer select-none"
          >
            <input
              id="show-featured"
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="w-6 h-6 accent-red-500 focus:ring-2 focus:ring-pink-300"
              aria-label="Show only featured projects"
            />
            <span className="text-xs font-semibold text-red-600">
              Show only featured
            </span>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table
            className="min-w-full divide-y divide-gray-200"
            role="table"
            aria-label="Projects table"
          >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Thumbnail
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Domain
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Year Range
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((project: any) => (
                <tr
                  key={project._id}
                  tabIndex={0}
                  role="row"
                  className="focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <td className="px-4 py-2">
                    {project.mediaUrls && project.mediaUrls[0] ? (
                      <img
                        src={project.mediaUrls[0]}
                        alt={project.title + " thumbnail"}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-red-500/40 shadow"
                      />
                    ) : project.images && project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title + " thumbnail"}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border">No Media</div>
                    )}
                  </td>
                  <td className="px-4 py-2 font-semibold flex items-center gap-2">
                    {project.title}
                    {project.featured && (
                      <span
                        className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md animate-pulse"
                        aria-label="Featured project"
                      >
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 capitalize">{project.domain}</td>
                  <td className="px-4 py-2">{project.yearStart} - {project.yearEnd}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        project.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <label
                      htmlFor={`toggle-featured-${project._id}`}
                      className="flex items-center gap-1 cursor-pointer select-none"
                    >
                      <input
                        id={`toggle-featured-${project._id}`}
                        type="checkbox"
                        checked={project.featured}
                        onChange={async (e) => {
                          await fetch(`/api/admin/projects/${project._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              ...project,
                              featured: e.target.checked,
                            }),
                          });
                          mutate();
                        }}
                        className="w-5 h-5 accent-red-500 focus:ring-2 focus:ring-pink-300"
                        aria-label={
                          project.featured
                            ? "Unmark as featured"
                            : "Mark as featured"
                        }
                      />
                      <span className="text-xs text-gray-500">Featured</span>
                    </label>
                    <Link
                      href={`/admin/portfolio/${domain}/${project.slug}/edit`}
                      aria-label={`Edit project: ${project.title}`}
                    >
                      <NeonButton aria-label={`Edit project: ${project.title}`}>
                        Edit
                      </NeonButton>
                    </Link>
                    <NeonButton
                      onClick={async () => {
                        if (confirm("Delete this project?")) {
                          await fetch(`/api/admin/projects/${project._id}`, {
                            method: "DELETE",
                          });
                          mutate();
                        }
                      }}
                      aria-label={`Delete project: ${project.title}`}
                    >
                      Delete
                    </NeonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
