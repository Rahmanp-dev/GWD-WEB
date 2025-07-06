"use client";

import ProjectForm from "@/components/forms/ProjectForm";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

// Define IProject type locally
export interface IProject {
  _id: string;
  title: string;
  slug: string;
  domain: string;
  description: string;
  images: string[];
  videoUrl?: string;
  tags: string[];
  date: string;
  featured: boolean;
  status: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  revisions?: any[];
  client?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProjectCard = ({ project }: { project: IProject }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-6 rounded-lg shadow-md relative focus:outline-none focus:ring-2 focus:ring-pink-300"
    tabIndex={0}
    role="listitem"
    aria-label={`Project card: ${project.title}`}
  >
    <h3 className="font-bold text-lg flex items-center gap-2">
      {project.title}
      {project.featured && (
        <span
          className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md animate-pulse"
          aria-label="Featured project"
        >
          Featured
        </span>
      )}
    </h3>
    <p className="text-sm text-gray-500">{project.client}</p>
    <div className="mt-4 pt-4 border-t">
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
        {project.status}
      </span>
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const {
    data: projects,
    error,
    mutate,
  } = useSWR<IProject[]>("/api/admin/projects", fetcher);

  if (error) return <div>Failed to load projects.</div>;
  if (!projects) return <div>Loading...</div>;

  const filtered = showFeaturedOnly
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Add Project</span>
        </button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <label
          htmlFor="show-featured"
          className="flex items-center gap-2 cursor-pointer select-none"
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
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Projects grid"
      >
        <AnimatePresence>
          {filtered.map((project) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <ProjectForm
            onClose={() => setIsFormOpen(false)}
            onSuccess={() => {
              mutate();
              setIsFormOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
