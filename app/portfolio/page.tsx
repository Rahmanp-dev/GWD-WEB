/// <reference types="react" />
import PortfolioVideo from "@/components/PortfolioVideo";
import Project from "@/lib/models/Project";
import { connectToDB } from "@/lib/mongodb";
import Link from "next/link";

interface ProjectType {
  _id: string;
  title: string;
  slug: string;
  domain: string;
  tags?: string[];
  images?: string[];
  status?: string;
  featured?: boolean;
  videoUrl?: string;
}

const domainColors: Record<string, string> = {
  web: "bg-gradient-to-r from-blue-400 to-blue-600",
  "3d": "bg-gradient-to-r from-purple-400 to-purple-600",
  security: "bg-gradient-to-r from-green-400 to-green-600",
  video: "bg-gradient-to-r from-pink-400 to-pink-600",
  mobile: "bg-gradient-to-r from-yellow-400 to-yellow-600",
};

export default async function PortfolioIndexPage() {
  await connectToDB();
  const rawProjects = await Project.find({ status: "published" })
    .sort({ date: -1 })
    .lean();
  // Ensure all fields are present and types are correct
  const projects: ProjectType[] = rawProjects.map((p: any) => ({
    _id: p._id?.toString() ?? "",
    title: p.title ?? "",
    slug: p.slug ?? "",
    domain: p.domain ?? "",
    tags: p.tags ?? [],
    images: p.images ?? [],
    status: p.status ?? "",
    featured: p.featured ?? false,
    videoUrl: p.videoUrl ?? "",
  }));
  // Group by domain
  const grouped: Record<string, ProjectType[]> = projects.reduce(
    (acc: Record<string, ProjectType[]>, project: ProjectType) => {
      (acc[project.domain] = acc[project.domain] || []).push(project);
      return acc;
    },
    {}
  );

  return (
    <main className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold text-center mb-14 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 select-none">
        Portfolio
      </h1>
      {Object.keys(grouped).length === 0 && (
        <div className="text-center text-gray-500">No projects found.</div>
      )}
      <div className="space-y-16">
        {Object.entries(grouped).map(([domain, projects]) => (
          <section key={domain}>
            <div className="relative group glass-panel backdrop-blur-3xl bg-white/20 rounded-3xl shadow-3xl border border-white/30 p-6 md:p-14 mb-12 overflow-hidden ring-0 transition-all duration-300 hover:ring-2 hover:ring-pink-200/30">
              {/* Gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl z-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,0,128,0.07) 100%)",
                }}
              />
              <div className="flex items-center mb-8 relative z-10">
                {/* Animated accent bar */}
                <div
                  className={`w-2 h-8 rounded-full mr-4 animate-accent-bar ${
                    domainColors[domain] || "bg-gray-300"
                  }`}
                  style={{ boxShadow: "0 0 16px 2px rgba(255,0,128,0.12)" }}
                ></div>
                <h2
                  className="text-2xl md:text-3xl font-extrabold capitalize tracking-wide text-gray-800 drop-shadow-lg"
                  style={{
                    textShadow:
                      "0 2px 12px rgba(255,255,255,0.5), 0 1px 0 #fff",
                  }}
                >
                  {domain
                    .replace("3d", "3D Animation")
                    .replace("web", "Web")
                    .replace("security", "Security")
                    .replace("video", "Video Editing")
                    .replace("mobile", "Mobile")}
                </h2>
                <div className="flex-1 border-t border-gray-200 ml-4" />
              </div>
              <div className="glass-panel backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl border border-white/20 p-6 md:p-10 relative z-10">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
                  role="list"
                >
                  {projects.map((project) => (
                    <Link
                      key={project._id}
                      href={`/portfolio/${project.domain}/${project.slug}`}
                      className="group focus:outline-none focus:ring-4 focus:ring-pink-300"
                      aria-label={`View project: ${project.title}`}
                      role="listitem"
                      tabIndex={0}
                    >
                      <div className="max-w-md w-full mx-auto glass-panel rounded-3xl overflow-hidden shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-3xl hover:border-pink-400/60 hover:ring-2 hover:ring-pink-200/40 relative flex flex-col items-center bg-white/60 backdrop-blur-md group-hover:bg-white/80 group-hover:shadow-pink-200/40">
                        {/* Domain tag */}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-md z-10">
                          {project.domain
                            ?.replace("3d", "3D Animation")
                            .replace("web", "Web")
                            .replace("security", "Security")
                            .replace("video", "Video Editing")
                            .replace("mobile", "Mobile") || "Other"}
                        </span>
                        {/* Domain accent bar */}
                        <div
                          className={`absolute top-0 left-0 w-full h-2 animate-accent-bar ${
                            domainColors[project.domain] || "bg-gray-200"
                          }`}
                        ></div>
                        {/* Featured badge */}
                        {project.featured && (
                          <span
                            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md animate-pulse z-10"
                            aria-label="Featured project"
                          >
                            Featured
                          </span>
                        )}
                        {project.videoUrl &&
                        (project.videoUrl.endsWith(".mp4") ||
                          project.videoUrl.endsWith(".webm")) ? (
                          <PortfolioVideo
                            src={project.videoUrl}
                            poster={project.images?.[0]}
                            ariaLabel={project.title + " video preview"}
                            className="w-full h-52 object-cover rounded-t-3xl"
                            style={{
                              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
                              maxHeight: "13rem",
                            }}
                          />
                        ) : project.images?.[0] ? (
                          <img
                            src={project.images[0]}
                            alt={project.title + " preview"}
                            className="w-full h-52 object-cover rounded-t-3xl"
                            style={{
                              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
                              maxHeight: "13rem",
                            }}
                          />
                        ) : (
                          <div
                            className="w-full h-52 bg-gray-200 rounded-t-3xl"
                            role="img"
                            aria-label="No image available"
                          />
                        )}
                        <div className="p-6 w-full">
                          <h3
                            className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors text-center"
                            style={{
                              textShadow: "0 1px 8px rgba(255,255,255,0.7)",
                            }}
                          >
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3 justify-center">
                            {project.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/70 text-gray-700 text-xs rounded-full shadow-sm border border-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 capitalize font-medium text-center">
                            {domain
                              .replace("3d", "3D Animation")
                              .replace("web", "Web")
                              .replace("security", "Security")
                              .replace("video", "Video Editing")
                              .replace("mobile", "Mobile")}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
