"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IProjectInput {
  title: string;
  client: string;
  service: string;
  budget: string;
  startDate: string;
  endDate: string;
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

  const onSubmit: SubmitHandler<IProjectInput> = async (data) => {
    const promise = fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Client</label>
          <input
            {...register("client", { required: "Client is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.client && (
            <p className="text-red-500 text-sm mt-1">{errors.client.message}</p>
          )}
        </div>
        {/* Add other fields (service, budget, dates) similarly */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
