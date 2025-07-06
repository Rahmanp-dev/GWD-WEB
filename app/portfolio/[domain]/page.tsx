import { GlassCardServer } from "@/components/ui/GlassCardServer";
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
  date?: string;
}

async function getProjects(domain: string): Promise<ProjectType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/portfolio?domain=${domain}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function DomainPortfolioPage({
  params,
}: {
  params: { domain: string };
}) {
  const projects: ProjectType[] = await getProjects(params.domain);

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {params.domain} Portfolio
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        role="list"
      >
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/portfolio/${params.domain}/${project.slug}`}
            className="group focus:outline-none focus:ring-4 focus:ring-pink-300"
            aria-label={`View project: ${project.title}`}
            role="listitem"
            tabIndex={0}
          >
            <GlassCardServer className="max-w-md w-full mx-auto p-0 cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl relative flex flex-col items-center">
              {/* Featured badge */}
              {project.featured && (
                <span
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md animate-pulse z-10"
                  aria-label="Featured project"
                >
                  Featured
                </span>
              )}
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  className="w-full h-48 object-cover rounded-t-lg"
                  muted
                  loop
                  preload="metadata"
                  poster={project.images?.[0]}
                  onMouseOver={(e) =>
                    (e.currentTarget as HTMLVideoElement).play()
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget as HTMLVideoElement).pause()
                  }
                  aria-label={project.title + " video preview"}
                  style={{ maxHeight: "12rem" }}
                />
              ) : project.images?.[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title + " preview"}
                  className="w-full h-48 object-cover rounded-t-lg"
                  style={{ maxHeight: "12rem" }}
                />
              ) : (
                <div
                  className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center"
                  role="img"
                  aria-label="No image available"
                />
              )}
              <div className="p-4 w-full">
                <h2 className="text-xl font-semibold mb-1 text-center">
                  {project.title}
                </h2>
                <div className="text-gray-500 text-sm mb-2 text-center">
                  {project.date
                    ? new Date(project.date).toLocaleDateString()
                    : ""}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCardServer>
          </Link>
        ))}
      </div>
    </main>
  );
}
