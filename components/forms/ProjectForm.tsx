"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GlassFormWrapper } from "../GlassFormWrapper";
import { useState } from "react";

interface IProjectInput {
  title: string;
  client: string;
  service: string;
  budget: string;
  startDate: string;
  endDate: string;
  media: FileList;
}

interface ProjectFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const ProjectForm = ({ onSuccess, onClose }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProjectInput>();
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const handleFileUpload = async (files: FileList) => {
    const uploadedUrls = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
          uploadedUrls.push(data.secureUrl);
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error("Upload error:", error);
      }
    }
    setMediaUrls(uploadedUrls);
  };

  const onSubmit: SubmitHandler<IProjectInput> = async (data) => {
    const projectData = { ...data, mediaUrls };
    const promise = fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    toast.promise(promise, {
      loading: "Creating project...",
      success: "Project created successfully!",
      error: "Failed to create project.",
    });

    try {
      const response = await promise;
      if (response.ok) {
        onSuccess();
      }
    } catch (e) {
      // error handled by toast
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <GlassFormWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 dark:bg-black/30 p-8 rounded-2xl shadow-xl w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>

          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-gray-200">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 shadow transition-all duration-200"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-200">Media</label>
            <input
              type="file"
              multiple
              {...register("media")}
              onChange={(e) => handleFileUpload(e.target.files!)}
              className="w-full p-3 bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 shadow transition-all duration-200"
            />
          </div>

          {/* Add other fields (client, service, budget, dates) similarly */}

          <div className="flex gap-4 mt-6 justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform text-base focus:outline-none focus:ring-2 focus:ring-red-500/70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </GlassFormWrapper>
    </div>
  );
};

export default ProjectForm;
