import { GlassCardServer } from "@/components/ui/GlassCardServer";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const { domain, slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/portfolio/${domain}/${slug}`
  );
  if (!res.ok) return notFound();
  const project = await res.json();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 flex flex-col items-center">
      <GlassCardServer className="p-8 w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          {project.featured && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md animate-pulse"
              aria-label="Featured project"
            >
              Featured
            </span>
          )}
        </div>
        <div className="text-gray-500 mb-4">
          {new Date(project.date).toLocaleDateString()} • {project.domain}
        </div>
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            className="w-full rounded-lg mb-6"
            controls
            muted
            loop
            preload="metadata"
            poster={project.images?.[0]}
            onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            aria-label={project.title + " video preview"}
          />
        ) : project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title + " preview"}
            className="w-full rounded-lg mb-6 object-cover"
          />
        ) : null}
        <div
          className="prose prose-lg max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        {project.images?.length > 1 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.images.slice(1).map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={project.title + " gallery image " + (i + 1)}
                className="rounded-lg object-cover w-full h-48"
              />
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="/#service-form"
            className="glass-panel px-8 py-3 rounded-full text-lg font-bold text-black bg-gradient-to-r from-red-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform border border-white/30 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-pink-300"
            aria-label="Inquire about this project"
            style={{
              textShadow: "0 2px 8px rgba(255,255,255,0.7), 0 1px 0 #fff",
            }}
          >
            Inquire about this project
          </a>
        </div>
      </GlassCardServer>
    </main>
  );
}
